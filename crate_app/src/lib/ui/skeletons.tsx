export function SidebarSkeleton() {
    return (
        <div>
            Loading Playlists ...
        </div>
    )
}

export function TracklistSkeleton() {

    const pendingTracks = [];
    for(let i = 0; i < 40; i++){
        pendingTracks.push(
            <div 
            className="grid grid-cols-8 gap-4 text-sm text-gray-800 border-b border-gray-200 p-2 hover:bg-gray-50" 
            key={i} >
                <div className="col-span-2 rounded-lg truncate bg-slate-200 h-[1rem] animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
                <div className="col-span-1 rounded-lg truncate bg-slate-200 animate-pulse"></div>
            </div>
        )
    }

    return (
        <div className="flex-grow bg-white p-4 flex flex-col overflow-hidden">
            <div className="rounded-xl bg-slate-200 h-[3rem] w-[10rem] animate-pulse mb-1.5 pl-2"></div>
            <div className="grid grid-cols-8 gap-4 text-sm font-semibold bg-gray-100 text-gray-700 border-b border-gray-300 p-1 m-1">
                <div className="col-span-2 border-r-2">Track Title</div>
                <div className="col-span-1 border-r-2">Artist</div>
                <div className="col-span-1 border-r-2">Album</div>
                <div className="col-span-1 border-r-2">Tags</div>
                <div className="col-span-1 border-r-2">BPM</div>
                <div className="col-span-1 border-r-2">Key</div>
                <div className="col-span-1">Date Added</div>
            </div>
            <div className="flex-grow overflow-hidden">
                {pendingTracks}
            </div>
        </div>
    )
}