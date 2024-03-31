import ResetPasswordForm from "@/components/ForgotPassword/ResetPasswordForm/ResetPasswordForm"
import "@/app/reset-password/[jwt]/resetpassform.modules.css";
import { verifyJwt } from "@/lib/jwt";

interface Props {
    params: {
      jwt: string
    }
}

export default function ResetPasswordPage({ params }: Props) {

  const payload = verifyJwt(params.jwt);
  if (!payload) return (
    <div className="bg-[#1F2028] h-screen flex justify-center items-center">
      <div className="">
        <p className="text-red-500 text-2xl">The Url is not valid. Send Again.</p>
      </div>
    </div>
  )
  return (
    <ResetPasswordForm jwtUserId={params.jwt} />
  )
}
