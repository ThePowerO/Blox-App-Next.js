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
    accepted: z
      .literal(true, { errorMap: () => ({ message: `${t2("AcceptTerms")}` }) }),
  })
  
  type InputType = z.infer<typeof FormSchema>

  const { locale } = useLocale();

  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const togglePass = () => setIsVisiblePass(prev => !prev);
  const { register, handleSubmit, reset, control, formState: { errors, isSubmitting } } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { accepted,  ...user } = data;
    try {
      const result = await registerUser(user)       
      toast.success('User created. Check your Email Box to activate your account')
      router.push(`/${locale}/sign-in`);
    } catch (error) {
      const emailExists = await checkEmailExists(user.email);
      if (emailExists) {
        toast.error('User already exists');
      } else {
      toast.error('Error creating user')
      }
      console.log(error)
    }

  }

  const customStyles = {
    checkboxWrapper: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '16px', // Largura da caixa simulada
      height: '16px', // Altura da caixa simulada
      border: '1px solid #ccc', // Borda da caixa simulada
      borderRadius: '4px', // Raio da borda para criar cantos arredondados
    },
  };
  
  return (
    <div className='p-2  grid grid-cols-1 place-items-center mt-[55px]'>
      <div className='bg-stone-50 dark:bg-zinc-800 p-5 w-full tiny:max-w-[400px] sm:max-w-[400px] md:max-w-[400px] border-t-4 border-[#3d95ec] rounded-lg shadow-lg'>
        <div className='flex flex-col gap-[15px]'>
          <h1>{t("h1")}</h1>

          <form onSubmit={handleSubmit(saveUser)} className='flex flex-col gap-[10px]'>
            <Input {...register("email")} className='dark:border-1 dark:border-stone-100' type='email' placeholder='Email' />
            {!!errors.name && <p className='text-red-500 text-sm'>{errors.email?.message}</p>}
            <Input {...register("name")} className='dark:border-1 dark:border-stone-100' type='text' placeholder='Username' />
            {!!errors.email && <p className='text-red-500 text-sm'>{errors.name?.message}</p>}
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
            <div className='relative'>
            <div className='absolute left-[9px] top-[12px] bg-[#3d95ec] dark:bg-white' style={customStyles.checkboxWrapper}></div>
              <Controller  control={control} name="accepted" render={({ field }) =>
                <Checkbox className="" checked={field.value} onChange={field.onChange} onBlur={field.onBlur} id="terms" >
                  <label
                  htmlFor="terms"
                  className="text-sm ml-[5px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {t("pTerms")}
                    <Link href={`/`} className="text-[#3d95ec] underline">{t("LinkToTerms")}</Link>
                  </label>
                </Checkbox>
              } />
            </div>
            {!!errors.accepted && (<p className='text-red-500 text-sm'>{errors.accepted.message}</p>)}
            <Button disabled={isSubmitting} className='bg-[#3d95ec] text-white hover:bg-[#5994cf]' type='submit'>
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