import Sidebar from "../lib/ui/library/sidebar";
import PageHeader from "../lib/ui/pageHeader";
import { Suspense } from "react";
import { SidebarSkeleton } from "../lib/ui/skeletons";
import {getSidebarPlaylists} from "@/app/lib/data"


export default async function Layout({ children }: { children: React.ReactNode }) {
    const SideBarData = await getSidebarPlaylists();


    return(
        <div className='flex flex-col h-screen'>
            <PageHeader pageName='library'/>

            <div className='flex flex-grow overflow-hidden'>
                {/* playlist sidebar */}
                <div className='w-1/3 bg-green-500 p-4 border-gray-300 overflow-y-auto custom-scrollbar'>
                    <Suspense fallback={<SidebarSkeleton />}>
                        <Sidebar playlistData={SideBarData}/>
                    </Suspense>
                </div>
                {children}
            </div>
        </div>
    )
}


