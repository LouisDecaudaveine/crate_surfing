import { exec } from "child_process";
import http from 'http';
import url from 'url';


const successfullCloseTab = 
`
    <html>
        <body>
            <h1>Login Successful!</h1>
            <p>You can close this and return to the application.</p>
        </body>
    </html>
`

export async function openLoginWebsite(loginURL: string){
    
    const platform = process.platform;

    let command : string;
    if (platform === 'win32'){
        command = `start "" "${loginURL}"`
    } else if(platform == 'darwin'){
        command = `open ${loginURL}`
    } else{
        command = `xdg-open ${loginURL}`
    }

    await exec(command, (error) => {
        if(error) console.error('Failed to open login page: ', error);
        else console.log("Login page opened on your browser...");
    })

}

export async function setupLoginServer() {
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
                    const response = await fetch('https://oauth2.googleapis.com/token',{
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

                    
                    const tokens = await response.json();
                

                    console.log("Login successful! Token: ", tokens);
                    res.writeHead(200, {"content-type": "text/html"});
                    res.end(successfullCloseTab);
                    
                }catch (error) {
                    console.error("Error during token exchange:", error);
                    res.writeHead(500, {'content-type': 'text/plain'});
                    res.end(`Token exchange failed: ${error}`);
                }
                
            }
              
            
        } else {
            res.writeHead(404, {"content-type": "text/plain"});
            res.end("Not Found");
        }
    })

    server.listen(process.env.PORT, ()=>{
        console.log(`Listening for login callback on http://localhost:${process.env.PORT}/callback`)
    })
}