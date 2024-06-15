import React from 'react'
import prisma from '@/lib/prisma'
import CombosCards from './CombosCards'

export default async function CombosShowcase() {

  const CommunityCombos = await prisma.combo.findMany({
    include: {
      favorites: true,
      likes: true,
    }
  })
  return (
    <CombosCards CommunityCombos={CommunityCombos as any} />
  )
}