import PageHeader from '../lib/ui/pageHeader';
import { Suspense } from 'react';
import { TracklistSkeleton, SidebarSkeleton} from '@/app/lib/ui/skeletons';
import Tracklist from '../lib/ui/library/tracklist';
import Sidebar from '../lib/ui/library/sidebar';
import { loadXMLFile } from '../lib/xmlParser';

export default function Page(){
    //fetch database 
    //if empty redirect to upload page
    //if not display the stuff

    // loadXMLFile();

    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist />
        </Suspense>
    )
}