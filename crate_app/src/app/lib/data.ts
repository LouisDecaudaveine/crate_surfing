import prisma from '@/app/lib/prisma'
import { RawParsedTrack, RawParsedFolder, SidebarPlaylist } from './definitions';
import { randomUUID } from 'crypto';
import { error } from 'console';


export async function getCollection(userId: string) {
    try{
        console.log("Fetching Collection data...");
        const data = await prisma.track.findMany({
            where:  {
                user_id: userId
            },
            orderBy: {
                date_added: 'desc',
            },
            take: 100,
        })
        return {name: "Collection", tracks: data};
    }
    catch(err){
        console.log(err);
    }
}

export async function getPlaylist(playlistID : string, userId:string) {
    try {
        const playlistWithTracks = await prisma.playlist.findUnique({
          where: { playlist_id: playlistID, user_id: userId },
          select: {
            name: true,
            tracks: {
                include: {
                    track: true, // Fetch full details of each track
                },
                orderBy: {
                    track: {
                        date_added: 'desc',
                    },
                },
            },
            
          }
          
          
        })
    
        // Map the result to get only track details
        const tracks = playlistWithTracks?.tracks.map(pt => pt.track)
    
        return {name: playlistWithTracks?.name, tracks: tracks}
      } catch (error) {
        console.error("Error fetching playlist tracks:", error)
      }   
}

export async function isUserCollectionEmpty(userId: string){
    const firstTrackWithUserId = await prisma.track.findFirst({
        where: {
            user_id: userId,
        }
    });

    if(firstTrackWithUserId) return false;
    return true;
}

export async function uploadCollection(trackList: RawParsedTrack[], userId: string){
    try{
        const BATCH_SIZE = 500;

        for(let i=0; i<trackList.length; i+= BATCH_SIZE){
            const batch = trackList.slice(i,i+BATCH_SIZE);

            const values = batch.map((track) => ({
                track_id: track._TrackID, 
                user_id: userId,
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

function recursiveJsonHelper(
    depth: number, 
    id:  string, 
    data: {
        playlist_id: string; 
        path: string[]; 
        type: number; 
        name: string;
    }[]
){
    
    const filteredNodes = data.filter((container) => 
        container.path[depth] === id && 
        container.path.length >= depth+2);
    const childrenNodes: SidebarPlaylist[] = [];
    const updatedDepth = depth+1;
    for(const node of filteredNodes){
        
        if(node.path.length === depth+2){ 
            const childNode: SidebarPlaylist = {
                type: node.type,
                name: node.name,
                playlist_id: node.playlist_id,
                node: node.type === 0 ? recursiveJsonHelper(updatedDepth, node.playlist_id, filteredNodes) : [], 
            }
            childrenNodes.push(childNode);
        }
        
    }
    return childrenNodes;
}

function playlistQueryToJson(data: {playlist_id: string; path: string; type: number; name: string;}[]){

    const splitPaths = data.map((container) => ({
        playlist_id: container.playlist_id, 
        path: container.path.split("."),
        type: container.type,
        name: container.name,
    }))

    splitPaths.forEach((node)=>{
        node.path.shift();
    });

    

    //find and pop root from splitPaths
    const rootIndex = splitPaths.findIndex(item => item.name === "ROOT");
    if(rootIndex === -1) throw error("ROOT node not found");
    const root = splitPaths.splice(rootIndex,1)[0] ;

    const jsonData = {
        type: root.type,
        name: root.name,
        playlist_id: root.playlist_id,
        node: recursiveJsonHelper(0, root.playlist_id, splitPaths),
    }


    return jsonData;
}

export async function getSidebarPlaylists(userId: string){
    try{
        console.log("Fetching Playlists for sidebar...");
        const rawData = await prisma.playlist.findMany({
            where: {
                user_id: userId,
            },
            select: {
                playlist_id: true,
                path: true,
                type: true,
                name: true,
            },
        });
        return playlistQueryToJson(rawData);
    }catch(err){
        console.log(err);
    }
}


export async function uploadAllPlaylists(playlistFolder: RawParsedFolder, path: string, userId: string) {
    const id = randomUUID();
    const currentPath = `${path}.${id}`;
    // console.log(currentPath, `folder name: ${playlistFolder._Name}`);

    //adding the folder to the db
    await prisma.playlist.create({
      data: {
        playlist_id: id,
        user_id: userId,
        type: Number(playlistFolder._Type),
        count: Number(playlistFolder._Count),
        path: currentPath,
        name: playlistFolder._Name,
        track_ids: [],
      }  
    })
    for(const container of playlistFolder.NODE){
        if(container._Type === "0"){
            uploadAllPlaylists(container, currentPath, userId);
        }
        if(container._Type === "1"){
            const playlistID = randomUUID();
            const trackValues = Array.isArray(container.TRACK) ? 
                container.TRACK.map((track) =>track._Key.toString()) : 
                [container.TRACK?._Key.toString()];

            //adding each playlist to the db
            await prisma.playlist.create({
                data: {
                    playlist_id: playlistID,
                    user_id: userId,
                    type: Number(container._Type),
                    count: Number(container._Entries),
                    path: `${currentPath}.${playlistID}`,
                    name: container._Name.replaceAll(" ", "_"),
                    track_ids: trackValues,
                }
            })

            const trackEntries = trackValues.map(trackId => ({
                playlistId: playlistID,
                trackId: trackId,
            }));
            
            await prisma.playlistTrack.createMany({
                data: trackEntries,
                skipDuplicates: true,
            })
        }
    }
}