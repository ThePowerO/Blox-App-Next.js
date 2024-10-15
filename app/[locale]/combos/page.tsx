//import { sendMail } from '@/lib/mail'
import CommunityCombos from '@/components/CommunityCombos/CommunityCombos';
import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback';
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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function Combos({ params }: paramsProps) {
  unstable_setRequestLocale(params.locale);

  return (
    <CommunityCombos />
  )
}
