'use client'

import Link from "next/link";
import { SidebarPlaylist } from "../../definitions";
import { useState } from "react";
import { usePathname } from "next/navigation";


const folderItem = (node : SidebarPlaylist, key: number) => {
    const [isOpen, setIsOpen] = useState(false);
    

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    return (
        <div key={key}>
            <button onClick={handleClick}>{node.name}</button>
            <div className={`${!isOpen ? "hidden" : ""} pl-1 border-l-2 border-slate-700`} >
                {node.node.map((n,index) => (n.type === 0 ? folderItem(n,index) : playlistItem(n,index)))}
            </div>
        </div>
    )
}

const playlistItem = (node : SidebarPlaylist, key: number) => {
    const currentPath = usePathname();
    const linkPath = `/library/${node.playlist_id}`;

    return (
        <div className={`${currentPath === linkPath ? "bg-green-900" : ""} pl-1`}key={key}>
            <Link href={`/library/${node.playlist_id}`} > {node.name} </Link>
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
        } | undefined ; 
    } 
) {
    return (
        <div>
            
            <h3 className="text-2xl font-bold"> PLAYLISTS: </h3>
            <Link href={"/library/"}>Collection</Link>
            {playlistData?.node.map(
                (n, index) => (n.type === 0 ? folderItem(n,index) : playlistItem(n,index))
            )}
        </div>
    )
}

