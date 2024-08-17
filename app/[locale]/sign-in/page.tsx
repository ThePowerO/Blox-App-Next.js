import SignIn from '@/components/SignIn/SignIn'
import React from 'react'
import { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Sign In",
}


type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export default function Signup({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <SignIn />
  )
}
