'use client';

import Link from 'next/link'
import React from 'react'
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { useState } from 'react';
import { z } from 'zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from '@nextui-org/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkEmailExists, registerUser } from '@/lib/actions/authActions';
import { toast } from 'react-toastify';
import { useLocale } from '@/LocaleContext';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const SignUp = () => {

  const t = useTranslations("SignUpPage");
  const router = useRouter();
  const t2 = useTranslations("AuthErrorMessages");
  const t3 = useTranslations("RegisterMessages");

  const FormSchema = z.object({
    name: z
      .string()
      .min(1, `${t2("UsernameMinimum")}`)
      .max(30, `${t2("UsernameMaximum")}`)
      .regex(new RegExp(/^[a-zA-Z0-9]+$/), `${t2("specialCharacters")}`),	
    email: z
      .string()
      .email(`${t2("InvalidEmail")}`),	
    password: z
      .string()
      .min(1, `${t2("PasswordMinimum")}`)
      .max(30, `${t2("PasswordMaximum")}`),
  })
  
  type InputType = z.infer<typeof FormSchema>

  const { locale } = useLocale();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const togglePass = () => setIsVisiblePass(prev => !prev);
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { ...user } = data;
    try {
      const result = await registerUser(user)       
      toast.success(`${t3("UserCreated")}`);
      router.push(`/${locale}/sign-in`);
    } catch (error) {
      const emailExists = await checkEmailExists(user.email);
      if (emailExists) {
        toast.error(`${t3("UserExists")}`);
      } else {
      toast.error(`${t3("UserErro")}`);
      }
      console.log(error)
    }

  }
  
  return (
    <div className='p-2  grid grid-cols-1 place-items-center mt-[55px]'>
      <div className='bg-stone-50 dark:bg-zinc-800 p-5 w-full tiny:max-w-[400px] sm:max-w-[400px] md:max-w-[400px] border-t-4 border-[#3d95ec] rounded-lg shadow-lg'>
        <div className='flex flex-col gap-[15px]'>
          <h1>{t("h1")}</h1>

          <form onSubmit={handleSubmit(saveUser)} className='flex flex-col gap-[10px]'>
            <Input {...register("email")} className='dark:border-1 dark:border-stone-100' type='email' placeholder='Email' />
            {!!errors.email && <p className='text-red-500 text-sm'>{errors.email?.message}</p>}
            <Input {...register("name")} className='dark:border-1 dark:border-stone-100' type='text' placeholder='Username' />
            {!!errors.name && <p className='text-red-500 text-sm'>{errors.name?.message}</p>}
            <div className='relative'>
              <Input {...register("password")} type={isVisiblePass ? "text" : "password"} className='z-[1] dark:border-1 dark:border-stone-100' placeholder='Password' />
              <span
                onClick={togglePass}
                className='absolute justify-end right-3 top-1/2 -translate-y-1/2
                text-2xl cursor-pointer z-[1]'
              >
                {isVisiblePass ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
            {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
            <Button disabled={isSubmitting} className='bg-[#3d95ec] mt-5 text-white hover:bg-[#5994cf]' type='submit'>
              {isSubmitting? <Loader2 className="w-6 h-6 animate-spin" />: `${t("CreateBtn")}`}
            </Button>
          </form>
          <div>
            <Link className="text-sm mt-3 text-right" href={`/${locale}/sign-in`}>
              {t("TextLinkToSignIn")} <span className="underline text-[#386da1]">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp