// import Image from "next/image";
import { auth } from "@/auth";
import { SignInButton, SignOutButton } from "@/lib/ui/login/signin";
import ContinueButton from "@/lib/ui/home/continueButton";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex sm:grid grid-cols-3 justify-center h-screen bg-blue-500 sm:bg-white">

      <div className="col-span-2 flex flex-col items-center justify-center">
        <div className="order-2 sm:order-1 sm:self-start">
          {session?.user ? <SignOutButton /> : <SignInButton /> }
        </div>
        <div className="order-1 bg-blue-500 sm:m-auto p-4 flex items-center sm:items-start flex-col sm:w-min">
          <h1 className="mb-4 font-bold text-5xl sm:text-7xl">CRATE.MP3</h1>
          <div className="mb-4 text-center sm:text-left sm:pl-2">
            <p> A way to listen to your rekordbox library  </p>
            <p> on any device, anywhere </p>
          </div>
          <ContinueButton session={session}/>
        </div>
        
      </div>
      
      <div className="hidden sm:block bg-green-500 p-4 ">
      </div>

    </div>
  );
}
