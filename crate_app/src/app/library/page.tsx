import PageHeader from '../lib/ui/pageHeader';
import { Suspense } from 'react';
import { TracklistSkeleton, SidebarSkeleton} from '@/app/lib/ui/skeletons';
import Tracklist from '../lib/ui/library/tracklist';

export default function Page(){
    //fetch database 
    //if empty redirect to upload page
    //if not display the stuff

    //TODO: I want to get the page to have no scroll need to sort out the styling for that 
    //      Implement the playlists in such a way that they can be nested and displayed

    return (
        <div className='flex flex-col h-screen'>
            <PageHeader pageName='library'/>
            <div className='flex flex-grow max-h-[100vh]'>
                {/* playlist sidebar */}
                <div className='w-1/4 bg-green-500 p-4 border-gray-300'>
                    <Suspense fallback={<SidebarSkeleton />}>
                        Playlist Sidebar
                    </Suspense>
                </div>
                {/* track list */}
                <div className='w-3/4 bg-slate-100 p-4'>
                    <Suspense fallback={<TracklistSkeleton />}>
                        <Tracklist />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}