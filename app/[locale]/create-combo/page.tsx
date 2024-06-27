import CreateComboLayout from '@/components/CreateCombo/CreateComboLayout'
import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import { User } from '@prisma/client'
import { MAX_COMBO_COUNT } from '@/lib/constants'

export default async function page() {
  const session = await getServerSession(authOptions)
  const currentUser = session?.user as User;

  if (!currentUser) {
    return
  }

  const UserComboCount = await prisma.comboCountLimit.findUnique({
    where: { userId: currentUser?.id },
  });

  const UserMaxComboCountReached = UserComboCount?.count;
  
  return (
    <CreateComboLayout UserMaxComboCountReached={UserMaxComboCountReached as number} />
  )
}
