// import Image from "next/image";
import { auth } from "@/app/auth";
import { SignInButton, SignOutButton } from "@/app/lib/ui/login/signin";
import ContinueButton from "@/app/lib/ui/home/continueButton";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid grid-cols-3  h-screen">

      <div className="col-span-2 flex items-center justify-center">
        <div className="self-start">
          {session?.user ? <SignOutButton /> : <SignInButton /> }
        </div>
        <div className=" bg-blue-500 m-auto p-4 flex-col w-min">
          <h1 className="mb-4 font-bold text-7xl"> CRATE.MP3 </h1>
          <div className="mb-4">
            <p> A way to listen to your rekordbox library  </p>
            <p> on any device, anywhere </p>
          </div>
          <ContinueButton session={session}/>
        </div>
      </div>
      
      <div className="bg-green-500 p-4 ">
      </div>

    </div>
  );
}
