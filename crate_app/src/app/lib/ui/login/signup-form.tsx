// "use client"

// import { signup } from "@/app/actions/auth";
// // import { useActionState, useFormStatus } from "react-dom";
// import { useActionState } from "react";
 
// export function SignupForm() {
//   const [state, formAction, isPending] = useActionState(signup, undefined)

//   return (
//     <form action={signup}>
//       <div>
//         <label htmlFor="name">Name</label>
//         <input id="name" name="name" placeholder="Name" />
//       </div>
//       {state?.errors?.name && <p>{state.errors.name}</p>}
//       <div>
//         <label htmlFor="email">Email</label>
//         <input id="email" name="email" type="email" placeholder="Email" />
//       </div>
//       {state?.errors?.email && <p>{state.errors.email}</p>}
//       <div>
//         <label htmlFor="password">Password</label>
//         <input id="password" name="password" type="password" />
//       </div>
//       {state?.errors?.password && (
//         <div>
//           <p>Password must:</p>
//           <ul>
//             {state.errors.password.map((error) => (
//               <li key={error}>- {error}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <button  disabled={isPending} type="submit">
//         Sign Up
//       </button>
//     </form>
//   )
// }
