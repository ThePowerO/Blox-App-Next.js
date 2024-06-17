






//import { sendMail } from '@/lib/mail'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import CommunityCombos from '@/components/CommunityCombos/CommunityCombos';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Combos () {

  return (
    <CommunityCombos />
  )
}
