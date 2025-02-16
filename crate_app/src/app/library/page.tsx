import { Suspense } from 'react';
import { TracklistSkeleton} from '@/lib/ui/skeletons';
import Tracklist from '@/lib/ui/library/tracklist';
import { auth } from '@/auth';
import { isUserCollectionEmpty } from "@/lib/data";
import Link from 'next/link';
import { error } from 'console';


export default async function Page(){
    //fetch database 
    //if empty redirect to upload page
    //if not display the stuff

    const session = await auth()
    if(!session) return <div className="m-auto">Not authenticated</div>
    const userId = session.user?.id;

    if(userId && await isUserCollectionEmpty(userId)) {
        return (
            <div className="m-auto text-center"> 
                <p> Collection is empty</p>
                <p> Upload yours{" "} <Link className="underline text-teal-600" href="/upload">Here</Link></p>
            </div>
        )
    }
    if(!userId) throw error("user ID missing");

    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist userID={userId}/>
        </Suspense>
    )
}