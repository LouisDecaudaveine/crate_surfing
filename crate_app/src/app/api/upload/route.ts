import { NextResponse } from "next/server";
import path from "path";
import {writeFile, unlink} from "fs/promises";
import { loadXMLFile } from "@/app/lib/xmlParser";
import { uploadCollection, uploadAllPlaylists } from "@/app/lib/data";

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
        // await uploadCollection(rekordboxJson.DJ_PLAYLISTS.COLLECTION.TRACK);
        // await uploadAllPlaylists(rekordboxJson.DJ_PLAYLISTS.PLAYLISTS.NODE, "");
        await unlink(filePath)
        return NextResponse.json({Message: "Success", status: 201});
    } catch(err) {
        console.log("error occured", err);
        return NextResponse.json({Message: "Failed", status: 500 });
    }
}