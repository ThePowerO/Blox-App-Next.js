

//import { sendMail } from '@/lib/mail'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import CommunityCombos from '@/components/CommunityCombos/CommunityCombos';
import CombosDisplayFallback from '@/components/YourCombos/CombosDisplayFallback';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Combos"
}

export default async function Combos () {

  return (
    <Suspense fallback={<CombosDisplayFallback />}>
      <CommunityCombos />
    </Suspense>
  )
}
