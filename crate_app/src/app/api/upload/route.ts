import { NextResponse } from "next/server";
import path from "path";
import { auth } from "@/auth"
import {writeFile, unlink} from "fs/promises";
import { loadXMLFile } from "@/lib/xmlParser";
import { uploadCollection, uploadAllPlaylists, doesUserExist } from "@/lib/data";

export async function  POST(request: Request){
    const session = await auth();
    const userId = session?.user?.id ? session?.user?.id : "";
    const userExists = await doesUserExist(userId)

    if(!userExists){
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    

    if(!file){
        return NextResponse.json({error: "No file received"}, {status: 400})
    }  

    const buffer = Buffer.from(await file.arrayBuffer())

    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/assets/" + filename);
    console.log(filePath);

    try {
        if(userId){
            await writeFile(filePath, buffer);
            const rekordboxJson = await loadXMLFile(filePath);
            await uploadCollection(rekordboxJson.DJ_PLAYLISTS.COLLECTION.TRACK, userId);
            await uploadAllPlaylists(rekordboxJson.DJ_PLAYLISTS.PLAYLISTS.NODE, "", userId);
            await unlink(filePath)
            return NextResponse.json({Message: "Success", status: 201});
            }
        return NextResponse.json({Message: "Failed", status: 400})
    } catch(err) {
        console.log("error occured", err);
        return NextResponse.json({Message: "Failed", status: 500 });
    }
 
}