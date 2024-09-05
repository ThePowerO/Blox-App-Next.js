import ForgotPassword from '@/components/ForgotPassword/ForgotPassword'
import React from 'react'
import { unstable_setRequestLocale } from "next-intl/server";

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default function page({ params }: paramsProps) {

  return (
    <ForgotPassword />
  )
}
