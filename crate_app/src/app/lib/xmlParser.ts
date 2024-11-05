import {XMLParser, XMLBuilder, XMLValidator} from "fast-xml-parser";
import { promises as fs} from "fs";


export async function loadXMLFile(path: String) {
    const xmlFile = await  fs.readFile(process.cwd() + '/rekordbox_collection.xml');
    const options = {
        ignoreAttributes: ['BitRate','Comments','Composer', 'DiscNumber', 'Genre', 'Grouping', 'Label', 'Mix', 'Remixer', 'TrackNumber', 'Year'],
        attributeNamePrefix : "_",
    };

    const parser = new XMLParser(options);
    
   

    const jObj = await parser.parse(xmlFile);

    // approximate size of xmlFile >> 
    // const jsonStr = JSON.stringify(jObj);
    // console.log(Buffer.byteLength(jsonStr, 'utf-8'));
    
    // console.log(jObj.DJ_PLAYLISTS.PLAYLISTS);
    // for(let i= 0; i<15; i++){
    //     console.log(jObj.DJ_PLAYLISTS.COLLECTION.TRACK[2000+i]);
    // }

    return jObj;
}


