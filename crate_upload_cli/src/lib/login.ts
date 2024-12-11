import { exec } from "child_process";
import http from 'http';
import url from 'url';
import {Token, UserInfoGoogle} from '../definitions'
import EventEmitter from "events";




const successfullCloseTab = 
`
    <html>
        <body>
            <h1>Login Successful!</h1>
            <p>You can close this and return to the application.</p>
        </body>
    </html>
`

export async function openLoginWebsite(){
    const RESPONSE_TYPE = "code";
    const REDIRECT = `http://localhost:${process.env.PORT}/callback`;
    const SCOPE = [
        encodeURIComponent("https://www.googleapis.com/auth/userinfo.profile"),
        encodeURIComponent("https://www.googleapis.com/auth/userinfo.email")
    ].join(" ");
    const oAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
    
    const platform = process.platform;

    let command : string;
    if (platform === 'win32'){
        command = `start "" "${oAuthUrl}"`
    } else if(platform == 'darwin'){
        command = `open ${oAuthUrl}`
    } else{
        command = `xdg-open ${oAuthUrl}`
    }

    await exec(command, (error) => {
        if(error) console.error('Failed to open login page: ', error);
        else console.log("Login page opened on your browser...");
    })

}

export async function setupLoginServer(uploadCommandEmitter: EventEmitter) {
    const server = http.createServer(async (req,res) => {
        const parsedUrl = url.parse(req.url || '', true)
        if(parsedUrl.pathname === "/callback"){
            const query = parsedUrl.query;
            const {code, error} = query;

            if(error){
                console.error("Login error:", error);
                res.writeHead(400, {'content-type': 'text/plain'});
                res.end("Login failed. Please try again");
            }
            else if(code){
                try{
                   
                    //big issues happening here and i really dont get why
                    const tokenResponse = await fetch('https://oauth2.googleapis.com/token',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            client_id: process.env.CLIENT_ID as string,
                            client_secret: process.env.CLIENT_SECRET as string,
                            redirect_uri: `http://localhost:${process.env.PORT}/callback`,
                            grant_type: 'authorization_code' as string,
                            code: code as string,
                        }),
                    });

                    
                    const tokens = await tokenResponse.json() as Token;
                    
                    const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
                        headers:{
                            'Authorization': `Bearer ${tokens.access_token}`
                        }
                    })

                    const userInfo = await userInfoResponse.json() as UserInfoGoogle;

                    //send data back up to main
                    uploadCommandEmitter.emit('loginSuccess', userInfo);
                    res.writeHead(200, {"content-type": "text/html"});
                    res.end(successfullCloseTab);
                    
                    server.close(() => {
                        console.log("server killed");
                    })
                }catch (error) {

                    uploadCommandEmitter.emit("loginFailed", error)
                    res.writeHead(500, {'content-type': 'text/plain'});
                    res.end(`Token exchange failed: ${error}`);
                }
                
            }

              
            
        } else {
            res.writeHead(404, {"content-type": "text/plain"});
            res.end("Not Found");
        }
    })

    server.on('end', () => {
        server.close();
        console.log("server killed");
    })

    server.listen(process.env.PORT, ()=>{
        console.log(`Listening for login callback on http://localhost:${process.env.PORT}/callback`)
    })
}