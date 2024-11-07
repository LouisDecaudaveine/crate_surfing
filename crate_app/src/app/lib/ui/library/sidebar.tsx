'use client'

// import { playlistsData } from "../../playlistTestData";
import { getSidebarPlaylists } from "../../data";
import { Folder, Playlist, SidebarPlaylist } from "../../definitions";
import { useState } from "react";

const folderItem = (node : SidebarPlaylist, key: number) => {
    const [isOpen, setIsOpen] = useState(false);
    

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    return (
        <div key={key}>
            <button onClick={handleClick}>{node.name}</button>
            <div className={`${!isOpen ? "hidden" : ""} pl-2 border-l-2 border-slate-700`} >
                {node.node.map((n,index) => (n.type === 0 ? folderItem(n,index) : playlistItem(n,index)))}
            </div>
        </div>
    )
}

const playlistItem = (node : SidebarPlaylist, key: number) => {
    return (
        <div key={key}>
            {node.name}
        </div>
    )
}


export default function Sidebar(
    {playlistData}: {
        playlistData : {
            type: number;
            name: string;
            playlist_id: string;
            node: SidebarPlaylist[];
        } | undefined
    } 
) {
    return (
        <div>
            
            <h3 className="text-2xl font-bold"> PLAYLISTS: </h3>
            Collection
            {playlistData?.node.map(
                (n, index) => (n.type === 0 ? folderItem(n,index) : playlistItem(n,index))
            )}
        </div>
    )
}

