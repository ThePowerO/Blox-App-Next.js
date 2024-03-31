'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, button } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ResetPassword } from "@/lib/actions/authActions";
import { z } from "zod"
import { MdKey } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

interface Props {
    jwtUserId: string
}

const FormSchema = z
.object({
    password: 
        z.string()
        .min(1, 'Password is required')
        .max(30, 'Password is too long'),
    confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ['confirmPassword'],
})

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props ) => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<InputType>({
        resolver: zodResolver(FormSchema)
    })

    const [isVisiblePass, setIsVisiblePass] = useState(false);
    const togglePass = () => setIsVisiblePass(prev => !prev);

    const ResetPasswordSubmit: SubmitHandler<InputType> = async (data) => {
        try {
            const result = await ResetPassword(jwtUserId, data.password);
            if (result === "success") {
                toast.success("Password reset successfully");
            }
            reset();
        } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
        }
    }

  return (
    <div className="bg-[#1F2028] h-screen">
        <div className='grid place-items-center'>
            <div className='p-5 bg-[#2d3136] shadow-lg rounded-lg border-t-4 border-[#3d95ec] mt-[40px]'>
                <h1 className="text-xl text-white font-bold my-4">Reset Password</h1>
                <form onSubmit={handleSubmit(ResetPasswordSubmit)} className="flex flex-col gap-3 w-[400px]">
                    <Input
                        errorMessage={errors.password?.message}
                        {...register('password')}
                        type={isVisiblePass ? "text" : "password"}
                        className='text-white border border-white rounded-lg'
                        startContent={<MdKey className="cursor-pointer w-[24px] h-[24px] mr-[5px]" />}
                        endContent={isVisiblePass ? <IoEyeOff className="cursor-pointer w-[24px] h-[24px]"
                        onClick={togglePass} /> : <IoEye className="cursor-pointer w-[24px] h-[24px]" onClick={togglePass} />}
                        placeholder='New Password'
                    />
                    <Input
                        errorMessage={errors.confirmPassword?.message}
                        {...register('confirmPassword')}
                        type={isVisiblePass ? "text" : "password"}
                        className='text-white border border-white rounded-lg'
                        startContent={<MdKey className="cursor-pointer w-[24px] h-[24px] mr-[5px]" />}
                        placeholder='Confirm New Password'
                    />
                    <Button
                        disabled={isSubmitting}
                        isLoading={isSubmitting}
                        type="submit"
                        className="bg-[#3d95ec] gap-[10px] hover:bg-[#51a8ff] transition-all font-bold cursor-pointer px-6 py-2">
                        {isSubmitting ? <Loader2 className="size-6 animate-spin" />: "Reset Password"}
                    </Button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPasswordForm
