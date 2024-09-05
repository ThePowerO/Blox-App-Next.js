import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback'
import YourCombos from '@/components/YourCombos/YourCombos'
import React, { Suspense } from 'react'
import { Metadata } from 'next';
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: "Your Combos",
}

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default function page({ params }: paramsProps) {
  return (
    <Suspense fallback={<CombosDisplayFallback />}>
      <YourCombos />
    </Suspense>
  )
}
