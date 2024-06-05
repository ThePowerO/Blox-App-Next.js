
//import { sendMail } from '@/lib/mail'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import React from 'react'

export default async function Combos () {

  //await sendMail({
  //  to: "helloynduarte@gmail.com",
  //  subject: "Test Tittle",
  //  body: "Test Body"
  //});

  const session = await getServerSession(authOptions);

  const user = session?.user
  //console.log(user)

  return (
    <div>
      Combos Page
    </div>
  )
}
