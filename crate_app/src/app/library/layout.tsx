

import Sidebar from "../lib/ui/library/sidebar";
import PageHeader from "../lib/ui/pageHeader";
import { Suspense } from "react";
import { SidebarSkeleton } from "../lib/ui/skeletons";
import {getSidebarPlaylists, isUserCollectionEmpty} from "@/app/lib/data"
import { auth } from "@/app/auth";



export default async function Layout({ children }: { children: React.ReactNode }) {

    
    const session = await auth();
    const userId = session?.user?.id;

    const SideBarData = (userId && !(await isUserCollectionEmpty(userId)))? await getSidebarPlaylists(userId) : undefined;

    return(
        <div className='flex flex-col h-screen'>
            <PageHeader pageName='library'/>

            <div className='grid grid-cols-[280px_minmax(0,1fr)] flex-grow overflow-hidden'>
                {/* playlist sidebar */}
                <div className='max-w-[280px] bg-green-500 p-4 border-gray-300 overflow-y-auto custom-scrollbar'>
                    {session &&
                    <Suspense fallback={<SidebarSkeleton />}>
                        <Sidebar playlistData={SideBarData}  />
                    </Suspense> 
                    }
                </div>
                {children}
            </div>
        </div>
    )
}



