'use client'

import { playlistsData } from "../../playlistTestData";
import { Folder, Playlist } from "../../definitions";
import { useState } from "react";

const folderItem = (node : Folder, key: number) => {
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

const playlistItem = (node : Playlist, key: number) => {
    return (
        <div key={key}>
            {node.name}
        </div>
    )
}


export default function Sidebar() {
    return (
        <div>
            
            <h3 className="text-2xl font-bold"> PLAYLISTS: </h3>
            Collection
            {playlistsData.node.map(
                (n, index) => (n.type === 0 ? folderItem(n,index) : playlistItem(n,index))
            )}
        </div>
    )
}