import {sql} from '@vercel/postgres';
import { Track } from './definitions';

export async function getCollection() {
    try{
        console.log("Fetching Collection data...");
        const data = (await sql<Track>`SELECT * FROM track LIMIT(100)`).rows;
        return data;
    }
    catch(err){
        console.log(err);
    }
}
