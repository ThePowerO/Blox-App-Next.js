import SignUp from '@/components/SignUp/SignUp';
import React from 'react';
import { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Sign Up",
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

  return <SignUp />;
}