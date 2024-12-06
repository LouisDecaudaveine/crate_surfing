import { Command } from "commander";
import { openLoginWebsite, setupLoginServer } from "../login"
import { UserInfoGoogle } from "../definitions";
import EventEmitter from "events";





export default function uploadCommand(program: Command){

    let userInfo: UserInfoGoogle;
    let dbUserID: string;

    const uploadCommandEmitter = new EventEmitter();

    uploadCommandEmitter.on('userLoggedIn', (user: UserInfoGoogle) => {
        console.log("Emitted user logged in");
        userInfo = user;

        // make db call to get user id
    });

    uploadCommandEmitter.on('startUpload', () => {
        // get file directory 

    });

     


    
        
    program.command("upload")
        .action(async () => {
            console.log("CRATE_SURF CLI: ");
    
            await openLoginWebsite();
    
            await setupLoginServer(uploadCommandEmitter); 

            
        })
        .description("Upload files securely using CRATE_SURF CLI");
        
}
