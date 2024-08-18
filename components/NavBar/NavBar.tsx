import React from 'react'
import NavBarLayout from './NavBarLayout'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export default async function NavBar({ locale }: { locale: string }) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user

  if (!currentUser) {
    return <NavBarLayout locale={locale} user={null} />
  }

  const user = await prisma.user.findUnique({
    where: {
      id: currentUser.id
    }
  })

  return (
    <NavBarLayout locale={locale} user={user as User} />
  )
}
