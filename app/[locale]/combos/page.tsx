//import { sendMail } from '@/lib/mail'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import CommunityCombos from '@/components/CommunityCombos/CommunityCombos';
import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Combos"
}

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default async function Combos({ params }: paramsProps) {
  
  return (
    <Suspense fallback={<CombosDisplayFallback />}>
      <CommunityCombos />
    </Suspense>
  )
}
