import { Command } from "commander";
import { openLoginWebsite, setupLoginServer } from "../lib/login"
import { UserInfoGoogle } from "../definitions";
import EventEmitter from "events";



const uploadCommandEmitter = new EventEmitter();

export default function uploadCommand(program: Command){


    
    program.command("upload")
        .action(async () => {
            console.log("CRATE_SURF CLI: ");
    
            await openLoginWebsite();
            await setupLoginServer(uploadCommandEmitter); 

            //wait on login to have happened 
            const userInfo: UserInfoGoogle  = await new Promise((resolve, reject) => {
                uploadCommandEmitter.once('loginSuccess', (data: UserInfoGoogle) => {
                    resolve(data);
                });
                uploadCommandEmitter.once('loginFailed', (error) => {
                    reject(error);
                });
            })

            console.log("User Info: ", userInfo);

            //v1: 
            //// xml to json the rekordbox file
            //// Go through each track:
            //// 1. Fetch and format track
            //// 2. API call upload to blob storage
            //// 3. API call upload to Postgres DB
            //// Once finished all tracks: API call upload Playlists

            //v2: will be another command to update library

            
        })
        .description("Upload files securely using CRATE_SURF CLI");
        
}
