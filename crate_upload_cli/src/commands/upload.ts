import { Command } from "commander";
import { openLoginWebsite, setupLoginServer } from "../login"
import { UserInfoGoogle } from "../definitions";
import prisma  from "../prisma"
import EventEmitter from "events";





export default function uploadCommand(program: Command){

    let userInfo: UserInfoGoogle;
    let dbUserID: string;

    const uploadCommandEmitter = new EventEmitter();

    uploadCommandEmitter.on('userLoggedIn', async (user: UserInfoGoogle) => {
        console.log("Emitted user logged in...");
        userInfo = user;

        // make db call to get user id
        const dbUserData = await prisma.user.findUnique({
            where: {
                email: userInfo.email,
            }
        })
        console.log("db user data: ", dbUserData);

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
