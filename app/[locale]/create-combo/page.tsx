import CreateComboLayout from '@/components/CreateCombo/CreateComboLayout'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { redirect } from 'next/navigation'
import { getLocale } from 'next-intl/server'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Create Combo",
}

export default async function page() {
  const session = await getServerSession(authOptions)
  const currentUser = session?.user;
  const locale = await getLocale();

  if (!currentUser) {
    redirect(`/${locale}/sign-in`);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser?.id,
    },
    select: {
      proPack: true,
      starterPack: true,
      isPlusPack: true,
    }
  });

  if (!user) {
    return <p>User not found</p>
  }

  const UserComboCount = await prisma.comboCountLimit.findUnique({
    where: { userId: currentUser?.id },
  });

  const UserMaxComboCountReached = UserComboCount?.count;
  
  return (
    <CreateComboLayout user={user} UserMaxComboCountReached={UserMaxComboCountReached as number || 0} />
  )
}
