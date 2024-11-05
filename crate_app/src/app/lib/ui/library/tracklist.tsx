import { getCollection } from "../../data"

export default async function Tracklist(){
    const data = await getCollection();

    return(
        <div className="flex-grow bg-white p-4 flex flex-col overflow-hidden">
            <div className="grid grid-cols-7 gap-4 text-sm font-semibold bg-gray-100 text-gray-700 border-b border-gray-300 p-1 m-1">
                <div className="col-span-2 border-r-2">Track Title</div>
                <div className="col-span-1 border-r-2">Artist</div>
                <div className="col-span-1 border-r-2">Album</div>
                <div className="col-span-1 border-r-2">BPM</div>
                <div className="col-span-1 border-r-2">Key</div>
                <div className="col-span-1">Date Added</div>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar">
                {data?.map(track => 
                <div key={track.track_id} className="grid grid-cols-7 gap-4 text-sm text-gray-800 border-b border-gray-200 p-2 hover:bg-gray-50">
                    <div className="col-span-2 truncate">{track.name}</div>
                    <div className="col-span-1 truncate">{track.artist}</div>
                    <div className="col-span-1 truncate">{track.album}</div>
                    <div className="col-span-1 truncate">{track.average_bpm}</div>
                    <div className="col-span-1 truncate">{track.tonality}</div>
                    <div className="col-span-1">{`${track.date_added?.getDate()}/${track.date_added?.getMonth()}/${track.date_added?.getFullYear()}`}</div>
                </div>)}
            </div>
        </div>
    )
}