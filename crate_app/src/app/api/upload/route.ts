import { NextResponse } from "next/server";
import path from "path";
import {writeFile} from "fs/promises";
import { loadXMLFile } from "@/app/lib/xmlParser";
import { uploadCollection } from "@/app/lib/data";

export async function POST(req: Request,res: Response) {
   
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if(!file){
        return NextResponse.json({error: "No file received"}, {status: 400})
    }  

    const buffer = Buffer.from(await file.arrayBuffer())

    const filename = file.name.replaceAll(" ", "_");
    const filePath = path.join(process.cwd(), "public/assets/" + filename);
    console.log(filename);

    try {
        await writeFile(filePath, buffer);
        const rekordboxJson = await loadXMLFile(filePath);

        // for(let i= 0; i<15; i++){
        //     console.log(rekordboxJson.DJ_PLAYLISTS.COLLECTION.TRACK[2000+i]);
        // }
        //1. xml --> json 
        //2. json  --> sql queries
        //3. queries --> db
        //4. delete xml file
        uploadCollection(rekordboxJson.DJ_PLAYLISTS.COLLECTION.TRACK);
        return NextResponse.json({Message: "Success", status: 201});
    } catch(err) {
        console.log("error occured", err);
        return NextResponse.json({Message: "Failed", status: 500 });
    }
}