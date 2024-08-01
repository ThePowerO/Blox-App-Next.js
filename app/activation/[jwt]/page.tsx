 import { activateUser } from "@/lib/actions/authActions"
import "@/app/activation/[jwt]/jwt.modules.css"
import Link from "next/link";


interface Props {
    params: {
        jwt: string
    }
}

export default async function Activation({ params }: Props) {

  const result = await activateUser(params.jwt);

  return (
    <>
    <div className="bg-[#1F2028] h-screen flex justify-center items-center">
      <div>
        {
          result === "userNotExist"? (<p className="text-red-500 text-2xl">User does not exist</p>):
          result === "alreadyActivated"? (<p className="text-yellow-500 text-2xl">User already activated</p>):
          result === "success"? (
            <div className="text-center">
              <p className="text-green-700 text-2xl">User activated</p>
              <p className="text-white text-medium">You can now close this window and go back to sign in page</p>
            </div>
            ):
          (<p className="text-red-500 text-2xl">Something unknown went wrong</p>)
        }
      </div>
    </div>
    </>
  )
}
