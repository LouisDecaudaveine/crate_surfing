'use client'

import Link from "next/link";
import { SidebarPlaylist } from "../../definitions";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ClosedFolder, OpenFolder, RightArrow } from "../svgComponents";


const FolderItem = ({node,closeSideBar} : {node : SidebarPlaylist; closeSideBar: ()=>void}) => {
    const [isOpen, setIsOpen] = useState(false);
    

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    return (
        <div>
            <button className="flex items-center gap-1" onClick={handleClick}>
                {isOpen ? <OpenFolder className="w-[1rem] h-[1rem]"/> : <ClosedFolder className="w-[1rem] h-[1rem]"/> }
                <p>{node.name}</p>
            </button>
            <div className={`${!isOpen ? "hidden" : ""}  border-l-2 border-slate-700 pl-1 ml-1`} >
                {node.node.map((n) => (n.type === 0 ? <FolderItem node={n} key={n.playlist_id} closeSideBar={closeSideBar}/> : <PlaylistItem node={n} key={n.playlist_id} closeSideBar={closeSideBar}/> ))}
            </div>
        </div>
    )
}


const PlaylistItem = ({node, closeSideBar} : {node : SidebarPlaylist; closeSideBar: ()=>void}) => {
    const currentPath = usePathname();
    const linkPath = `/library/${node.playlist_id}`;

    return (
        <div className={`${currentPath === linkPath ? "bg-green-900" : ""} pl-1`} >
            <Link href={`/library/${node.playlist_id}`} onClick={closeSideBar}> 
                <p>{node.name} </p>
            </Link>
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
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const currentPath = usePathname();
    

    return (
        <div className={`${isOpen?"h-[100vh] max-h-[100vh] overflow-y-visible ":"min-h-[3rem] flex flex-col justify-center"} `}>
            <div className="ml-3 block md:hidden">
                {/*MOBILE SIDEBAR BUTTON*/}
                {
                    isOpen ? 
                    <button  className="absolute top-7 right-7 font-bold text-2xl border-2 bg-green-600 border-green-700 rounded w-8 h-8 flex items-center justify-center" onClick={()=>setIsOpen(false)}> X </button> : 
                    <button className="flex items-center justify-center font-bold gap-2" onClick={()=>setIsOpen(true)}>
                        <p className="text-2xl">PLAYLISTS</p>  
                        <RightArrow className="w-[1.5rem] h-[1.5rem]"/> 
                    </button> 
                }
                
            </div>
            <div className={`${isOpen?"":"hidden"} md:block py-8 md:py-0 md:pb-6`}>
                <h3 className="text-2xl font-bold ml-1"> PLAYLISTS: </h3>
                <Link className={`${currentPath === "/library" ? "bg-green-900" : ""} pl-1 block w-full`} onClick={() => setIsOpen(false)} href={"/library/"}>Collection</Link>
                {playlistData?.node.map(
                    (n) => (n.type === 0 ? <FolderItem key={n.playlist_id} node={n} closeSideBar={()=>setIsOpen(false)}/> : <PlaylistItem node={n} key={n.playlist_id} closeSideBar={()=>setIsOpen(false)}/>)
                )}
            </div>
        </div>
    )
}

