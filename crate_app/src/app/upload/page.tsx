import { auth } from "@/app/auth";
import DragAndDropUpload from "../lib/ui/upload/dragAndDrop";

export default async function Page(){
    const session = await auth()
    if(!session) return <div className="m-auto">Not authenticated</div>

    return(
        <div>
            <DragAndDropUpload />
        </div>
    )
}