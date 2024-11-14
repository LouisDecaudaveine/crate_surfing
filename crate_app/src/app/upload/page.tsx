import { auth } from "@/app/auth";
import DragAndDropUpload from "../lib/ui/upload/dragAndDrop";
import {isUserCollectionEmpty} from "@/app/lib/data"
export default async function Page(){
    const session = await auth()
    if(!session) return <div className="m-auto">Not authenticated</div>

    const userID = session.user?.id ? session.user.id : ""
    
    const isCollectionEmpty = await isUserCollectionEmpty(userID)

    return(
        <div>
            {
                isCollectionEmpty ? 
                    <DragAndDropUpload /> 
                : 
                    <div className="flex flex-col justify-center items-center">
                        <h3>{"Can't Update your Collection"}</h3>
                        <h2>Feature Coming Soon</h2>
                    </div>
            }
            
        </div>
    )
}