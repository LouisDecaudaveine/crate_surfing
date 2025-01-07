import React, { Suspense } from "react";
import Tracklist from "@/app/lib/ui/library/tracklist";
import { TracklistSkeleton } from "@/app/lib/ui/skeletons";
import { auth } from '@/auth';
import { error } from 'console';





export default async function Page(props: {params: Promise<{id: string}>}) {

    const session = await auth()
    if(!session) return <div className="m-auto">Not authenticated</div>
    const userId = session.user?.id;
    if(!userId) throw error("user ID missing");
    //get list from playlist db with id
    const id = (await props.params).id;



    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist playlistID={id} userID={userId}/>
        </Suspense>
    )
}