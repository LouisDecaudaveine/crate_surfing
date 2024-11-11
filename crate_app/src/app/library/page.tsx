import { Suspense } from 'react';
import { TracklistSkeleton} from '@/app/lib/ui/skeletons';
import Tracklist from '../lib/ui/library/tracklist';


export default function Page(){
    //fetch database 
    //if empty redirect to upload page
    //if not display the stuff

    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist />
        </Suspense>
    )
}