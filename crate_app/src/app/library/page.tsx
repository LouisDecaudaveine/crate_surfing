import { Suspense } from 'react';
import { TracklistSkeleton} from '@/app/lib/ui/skeletons';
import Tracklist from '../lib/ui/library/tracklist';
import { auth } from '../auth';
import { isUserCollectionEmpty } from "@/app/lib/data";
import Link from 'next/link';


export default async function Page(){
    //fetch database 
    //if empty redirect to upload page
    //if not display the stuff

    const session = await auth()
    if(!session) return <div className="m-auto">Not authenticated</div>
    const userId = session.user?.id

    if(userId && await isUserCollectionEmpty(userId)) {
        return (
            <div className="m-auto text-center"> 
                <p> Collection is empty</p>
                <p> Upload yours{" "} <Link className="underline text-teal-600" href="/upload">Here</Link></p>
            </div>
        )
    }

    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist />
        </Suspense>
    )
}