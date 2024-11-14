import {getCollection ,getPlaylist } from "@/app/lib/data";

// const fetchDataWithDelay = async () => {
//     await new Promise((resolve) => setTimeout(resolve, 5000)); // 3-second delay
//     return "Fetched Data!";
// };
  


export default async function Tracklist({playlistID,userID} : {playlistID?: string, userID: string }){

    // const timewaister = await fetchDataWithDelay().then((a) => a);
    const data = playlistID ? await getPlaylist(playlistID, userID) : await getCollection(userID);
    const name = data?.name;
    const tracks = data?.tracks;

    return(
        <div className="flex flex-grow bg-white p-4  flex-col overflow-hidden">
            <h3 className="text-2xl min-h-[2rem] font-bold mb-1.5 pl-2 truncate"> {`${name}:`} </h3>
            <div className="hidden xl:grid grid-cols-10 gap-4 text-sm font-semibold bg-gray-100 text-gray-700 border-b border-gray-300 p-1 m-1">
                <div className="col-span-3 border-r-2">Track Title</div>
                <div className="xl:col-span-2 col-span-3 border-r-2">Artist</div>
                <div className="xl:col-span-2 col-span-3 border-r-2">Album</div>
                <div className="col-span-1 border-r-2 ">BPM</div>
                <div className="col-span-1 border-r-2 hidden xl:block">Key</div>
                <div className="col-span-1 hidden xl:block">Date Added</div>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar max-h-[80vh]">
                {tracks?.map(track => 
                <div key={track.track_id} className="grid grid-cols-3 xl:grid-cols-10 xl:gap-4 text-sm text-gray-800 border-b border-gray-200 p-2 hover:bg-gray-50">
                    <div title={track.name?track.name:""} className="order-1 col-span-2 xl:col-span-3 truncate">{track.name}</div>
                    <div title={track.artist?track.artist:""} className="order-3 xl:order-2 col-span-2 truncate">{track.artist}</div>
                    <div title={track.album?track.album:""} className="order-5 xl:order-3 col-span-2 truncate">{track.album}</div>
                    <div className="order-2 xl:order-4 truncate">{track.average_bpm}</div>
                    <div  className="order-4 xl:order-5 truncate  xl:block">{track.tonality}</div>
                    <div title={track.name?track.name:""} className="order-6 truncate  xl:block">{`${track.date_added?.getDate()}/${track.date_added?.getMonth()}/${track.date_added?.getFullYear()}`}</div>
                </div>)}
            </div>
        </div>
    )

  
}

