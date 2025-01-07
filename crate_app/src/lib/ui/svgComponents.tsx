import Image from "next/image";

export const ClosedFolder = ({className} : {className:string}) => (
    <div className={` ${className}`}>
        <Image 
            src="/folder_closed.svg" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} alt="folder svg"
        />
    </div>
)

export const OpenFolder =  ({className} : {className:string}) => (
    <div className={` ${className}`}>
        <Image 
            src="/folder_open.svg" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} alt="folder svg"
        />
    </div>
)


export const RightArrow =  ({className} : {className:string}) => (
    <div className={` ${className}`}>
        <Image 
            src="/arrow_right.svg" 
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} alt="folder svg"
        />
    </div>
)