import Link from "next/link";

export default function PageHeader({pageName} : {pageName : string;}){
    return (
        <div className="w-full bg-blue-500">
            <h2 className="p-4 font-bold text-3xl xl:text-4xl"> <Link href="/">CRATE.MP3</Link><span className='text-slate-100'>/{pageName}</span></h2>
        </div>
    )
}