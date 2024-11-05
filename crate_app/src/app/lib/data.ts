import {sql} from '@vercel/postgres';
import prisma from '@/app/lib/prisma'
import { JobjPlaylist, JobjTrack, Track, RawParsedTrack } from './definitions';
import { loadXMLFile } from './xmlParser';
import { isAbsolute } from 'path';


export async function getCollection() {
    try{
        console.log("Fetching Collection data...");
        const data = await prisma.track.findMany({
            orderBy: {
                date_added: 'desc',
            }
        })
        return data;
    }
    catch(err){
        console.log(err);
    }
}

// insert into TRACK (id, track_title, artist, album, tags, bpm, music_key, date_added, blob_id) values("id", "track_title", "artist", "album", "tags", 132, "music_key", "date_added", "blob_id")


export async function uploadTrack(trackObj: JobjTrack) {
    try{

    }catch(err){

    }
}

export async function uploadCollection(trackList: RawParsedTrack[] ){
    try{
        const BATCH_SIZE = 500;

        for(let i=0; i<trackList.length; i+= BATCH_SIZE){
            const batch = trackList.slice(i,i+BATCH_SIZE);

            const values = batch.map((track) => ({
                track_id: (+track._TrackID),
                name: track._Name,
                artist: track._Artist,
                album: track._Album,
                kind: track._Kind,
                size: (+track._Size),
                total_time: (+track._TotalTime),
                average_bpm: (+track._AverageBpm),
                date_added: new Date(track._DateAdded),
                sample_rate: (+track._SampleRate),
                play_count: (+track._PlayCount),
                rating: (+track._Rating),
                location: track._Location,
                tonality: track._Tonality,
            }));

            await prisma.track.createMany({
                data: values,
                skipDuplicates: true,
            })
            
        }



        
    }catch(err){
        console.log("transfer to db failed: ", err);
    }
}
