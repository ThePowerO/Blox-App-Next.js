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

export default function Signup({ params }: paramsProps) {
  return <SignUp />;
}