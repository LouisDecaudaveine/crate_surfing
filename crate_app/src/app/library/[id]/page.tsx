import { Suspense } from "react";
import Tracklist from "@/app/lib/ui/library/tracklist";
import { TracklistSkeleton } from "@/app/lib/ui/skeletons";


export default async function Page(props: {params: Promise<{id: string}>}) {

    //get list from playlist db with id

    const id = (await props.params).id;

    return (
        <Suspense fallback={<TracklistSkeleton />}>
            <Tracklist playlistID={id}/>
        </Suspense>
    )
}