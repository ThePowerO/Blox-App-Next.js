import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback'
import YourCombos from '@/components/YourCombos/YourCombos'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<CombosDisplayFallback />}>
      <YourCombos />
    </Suspense>
  )
}
