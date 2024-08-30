import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ComboEditLayout from '@/components/EditCombo/ComboEditLayout'
import { getComboById } from '@/lib/actions/editComboActions'
import { Combo } from '@/lib/types'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'
import { unstable_setRequestLocale } from "next-intl/server";

type Params = {
  comboId: string
  locale: string
}


const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];
 
export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}


export default async function page({ params }: { params: Params }) {
  unstable_setRequestLocale(params.locale);
  
  const comboId = params.comboId
  const combo = await getComboById(comboId) as Combo | null
  const session = await getServerSession(authOptions)
  const currentUser = session?.user

  if (!combo || !session || combo.user.id !== session.user.id || !currentUser?.id) {
    // Handle unauthorized access or non-existent combo
    return { notFound: true }; // Return a 404 if the user is not authorized
  }

  return (
    <main>
      <ComboEditLayout combo={combo as Combo | null} />
    </main>
  )
}
