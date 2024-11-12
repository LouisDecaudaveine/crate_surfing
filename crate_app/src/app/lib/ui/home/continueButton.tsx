import Link from "next/link"
import { Session } from "next-auth"
import { error } from "console";
import { isUserCollectionEmpty } from "@/app/lib/data";

export default async function ContinueButton({session} : {session: Session | null}){

    const userId = session ? session?.user?.id : null;

    if(userId === undefined) throw error("User ID is missing", 400);


    const isCollectionEmpty = userId ? await isUserCollectionEmpty(userId) : null;
    const linkAddress = isCollectionEmpty ? "/upload" : userId ? "/library" : "";// the last one should be to the login page 

    return (
        <>
        {
            userId ?
            <Link href={linkAddress} className="font-bold text-7xl">
                →
            </Link>
            :
            <p className="font-semibold">SIGN IN TO START</p>
        }
        </>
        
    )
}