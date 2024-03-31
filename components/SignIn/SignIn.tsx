'use client';

import Link from 'next/link'
import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { useLocale } from '@/LocaleContext';
import { FcGoogle } from "react-icons/fc";
import RobloxImg from "@/public/Roblox.png";
import DiscordImg from "@/public/Icons/Discord.png";
import { signIn, useSession, signOut } from 'next-auth/react';
import { z } from 'zod';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Loader2 } from 'lucide-react';

const SignIn = () => {
  
  const t2 = useTranslations("AuthErrorMessages");
  
  const FormSchema = z.object({
    name: z
      .string()
      .min(1, `${t2("EmailMinimum")}`)
      .email(`${t2("InvalidEmail")}`),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, `${t2("PasswordMinimum")}`)	,
  })
  
  type InputType = z.infer<typeof FormSchema>

  const t = useTranslations("SignInPage");
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  })

  const { locale } = useLocale();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const togglePass = () => setIsVisiblePass(prev => !prev);

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      name: data.name,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error)
      return;
    }
    router.push("/");
  }

  const LoginWithGoogle = () => {
    signIn("google", { callbackUrl: `/${locale}/` })
  }

  const LoginWithDIscord = () => {
    signIn("discord", { callbackUrl: `/${locale}/` })
  }

  return (
    <div className='p-2 grid grid-cols-1 place-items-center mt-[55px]'>
      <div className=' bg-stone-50 dark:bg-zinc-800 p-5 w-full tiny:max-w-[400px] sm:max-w-[400px] md:max-w-[400px] border-t-4 border-[#3d95ec] rounded-lg shadow-lg'>
        <div className='flex flex-col gap-[10px]'>
          <h1>{t("h1")}</h1>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[10px]'>
            <Input {...register("name")} className='dark:border-1 dark:border-stone-100' type='email' placeholder='Email' />
            {!!errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
            <div className='relative'>
              <Input {...register("password")} type={isVisiblePass ? "text" : "password"} className='dark:border-1 dark:border-stone-100' placeholder='Password' />
              <span
                onClick={togglePass}
                className='absolute justify-end right-3 top-1/2 -translate-y-1/2
                text-2xl cursor-pointer'
              >
                {isVisiblePass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
            {!!errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            <div>
              <Link href={`/${locale}/forgot-password`}>
                <span className="text-sm underline text-[#3d95ec]">Forgot Password</span>
              </Link>
            </div>
            <Button disabled={isSubmitting} className='bg-[#3d95ec] text-white hover:bg-[#386da1]' type='submit'>
              {isSubmitting? <Loader2 className="w-6 h-6 animate-spin" />: `${t("button")}`}
            </Button>

            <Separator className='bg-gray-300 my-[10px] dark:bg-white' />

            <div className='flex flex-col gap-[5px] w-full'>
              <Button
                onClick={LoginWithGoogle}
                className='flex gap-[5px] text-black hover:text-black dark:bg-[#fff]
                border border-input dark:hover:bg-stone-200 transition-all'
                variant="outline"
              >
                <FcGoogle className='text-2xl' />
                {t("withgoogle")}
              </Button>
              <Button
                onClick={LoginWithDIscord}
                className='flex gap-[5px] text-white hover:bg-[#2c396e] transition-all
                border border-[#42599f] bg-[#42599f]'
              >
                <Image width={25} height={25} src={DiscordImg} alt="" className="invert cursor-pointer ml-[5px]" />
                {t("withdiscord")}
              </Button>
            </div>
          </form>
          <div>
            <Link className="text-sm mt-3 text-right" href={`/${locale}/sign-up`}>
              {t("text")} <span className="underline text-[#3d95ec]">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn;
