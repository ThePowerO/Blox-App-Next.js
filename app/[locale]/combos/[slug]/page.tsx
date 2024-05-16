import ComboBySlug from '@/components/SinglePageCombo/ComboBySlug'
import CommentSection from '@/components/SinglePageCombo/CommentSection'
import { getSlugCombo } from '@/lib/actions/comboActions' 
import { Combo } from '@/lib/types'
import React from 'react'

type Props = {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {

  const slug = params.slug
  const combo: Combo | null = await getSlugCombo(slug)

  return (
    <main>
      <ComboBySlug combo={combo as Combo} />

      <CommentSection combo={combo as Combo} />
    </main>
  )
}
