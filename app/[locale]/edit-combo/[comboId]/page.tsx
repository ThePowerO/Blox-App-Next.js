import ComboEditLayout from '@/components/EditCombo/ComboEditLayout'
import { getComboById } from '@/lib/actions/editComboActions'
import { Combo } from '@prisma/client'
import React from 'react'

type Params = {
  comboId: string
}

export default async function page({ params }: { params: Params }) {
  const comboId = params.comboId
  const combo = await getComboById(comboId)

  return (
    <div>
      <ComboEditLayout combo={combo as unknown as Combo} />
    </div>
  )
}
