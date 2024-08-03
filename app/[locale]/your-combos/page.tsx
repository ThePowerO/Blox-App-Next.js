import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback'
import YourCombos from '@/components/YourCombos/YourCombos'
import React, { Suspense } from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Your Combos",
}

export default function page() {
  return (
    <Suspense fallback={<CombosDisplayFallback />}>
      <YourCombos />
    </Suspense>
  )
}
