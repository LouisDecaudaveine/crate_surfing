// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-cols-3  h-screen">
      <div className="col-span-2 bg-blue-500 m-auto p-4 flex-col ">
        <h1 className="mb-4 font-bold text-7xl"> CRATE.MP3 </h1>
        <div className="mb-4">
          <p> A way to listen to your rekordbox library  </p>
          <p> on any device, anywhere </p>
        </div>
        <Link href="/library" className="font-bold text-7xl">
          →
        </Link>
      </div>
      <div className="bg-green-500 p-4 ">
      </div>
    </div>
  );
}
