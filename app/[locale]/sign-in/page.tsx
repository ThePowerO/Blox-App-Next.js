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

export default function Signup({ params }: paramsProps) {
  return (
    <SignIn />
  )
}
