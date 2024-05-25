 import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ComboBySlug from '@/components/SinglePageCombo/ComboBySlug' 
import CommentSection from '@/components/SinglePageCombo/CommentSection'
import { getSlugCombo } from '@/lib/actions/comboActions' 
import { Combo } from '@/lib/types'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {

  const slug = params.slug
  const combo: Combo | null = await getSlugCombo(slug)
  const session = await getServerSession(authOptions)
  const user = session?.user as User
  const userId = user.id
  console.log(userId)

  return (
    <main>
      <ComboBySlug combo={combo as Combo} />

      <CommentSection userId={userId} combo={combo as Combo} />
    </main>
  )
}
