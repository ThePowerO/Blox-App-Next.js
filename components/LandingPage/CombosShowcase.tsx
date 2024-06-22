import React from 'react'
import prisma from '@/lib/prisma'
import CombosCards from './CombosCards'
import { Combo } from '@/lib/types';

function shuffleArray(array: any[]) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default async function CombosShowcase() {

  const CommunityCombos = await prisma.combo.findMany({
    include: {
      favorites: true,
      likes: true,
    },
  })

  const shuffledCombos = shuffleArray(CommunityCombos)
  return (
    <CombosCards CommunityCombos={shuffledCombos as any} />
  )
}