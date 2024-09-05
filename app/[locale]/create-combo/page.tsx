import CreateComboLayout from '@/components/CreateCombo/CreateComboLayout'
import React, { Suspense } from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Combo",
}

type paramsProps = {
  params: {
    locale: string
  }
}

const locales = ['en', 'de', 'fr', 'it', 'jp', 'kr', 'cn', 'pt'];

export default async function page({ params }: paramsProps) {

  const session = await getServerSession(authOptions)
  const currentUser = session?.user;
  const locale = await getLocale();

  if (!currentUser) {
    redirect(`/${locale}/sign-in`);
  }

  const [user, userComboCount] = await Promise.all([
    prisma.user.findUnique({ 
      where: { id: session.user.id }, 
      select: { proPack: true, starterPack: true, isPlusPack: true } 
    }),
    prisma.comboCountLimit.findUnique({ 
      where: { userId: session.user.id }
    })
  ]);

  if (!user) {
    return <p>User not found</p>
  }

  const UserMaxComboCountReached = userComboCount?.count;
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateComboLayout user={user} UserMaxComboCountReached={UserMaxComboCountReached as number || 0} />
    </Suspense>
  )
}