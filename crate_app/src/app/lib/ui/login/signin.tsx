import { signIn, signOut } from "@/app/auth"
 
export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn();
      }}
    >
      <button className="bg-green-500 text-gray-50 p-2 rounded-lg absolute m-4" type="submit">Sign In</button>
    </form>
  )
} 


export function SignOutButton() {
  return(
    <form action={async()=>{
        "use server"
        await signOut()
    }}>
      <button className="bg-green-500 text-gray-50 p-2 rounded-lg absolute m-4" type="submit">Sign Out</button>
    </form>
  )
}
