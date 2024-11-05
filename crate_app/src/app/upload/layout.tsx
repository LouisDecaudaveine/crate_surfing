import PageHeader from "../lib/ui/pageHeader"

export default function Layout({ children }: { children: React.ReactNode }) {
    return(
        <div className='flex flex-col h-screen'>
            <PageHeader pageName='upload'/>
            <div className="flex-grow flex flex-col justify-center">
                {children}
            </div>
        </div>
    )
}