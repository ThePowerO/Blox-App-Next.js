import React from 'react'
import NavBarLayout from './NavBarLayout'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { User } from '@prisma/client';

export default function NavBar({ locale }: { locale: string }) {

  return (
    <NavBarLayout locale={locale} />
  )
}
