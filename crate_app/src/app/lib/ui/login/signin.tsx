import { signIn, signOut } from "@/auth"
 
export function SignInButton() {
  return (
    <form className="w-[7rem]"
      // action={async () => {
      //   "use server"
      //   await signIn();
      // }}
    >
      <button className="bg-green-500 text-gray-50 p-2 rounded-lg absolute m-4" type="submit">Sign In</button>
    </form>
  )
} 


export function SignOutButton() {
  return(
    <form  className="w-[8rem]"
    //   action={async()=>{
    //     "use server"
    //     await signOut()
    // }}
    >
      <button className="bg-green-500 text-gray-50 p-2 rounded-lg absolute m-4" type="submit">Sign Out</button>
    </form>
  )
}
