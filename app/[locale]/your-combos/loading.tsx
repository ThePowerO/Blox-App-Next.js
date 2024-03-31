import ComboFilter from '@/components/HtmlComponents/ComboFilter'
import SkeletonComboCard from '@/components/HtmlComponents/SkeletonComboCard'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function loading() {
  return (
    <div>
      <h3 className="mb-4 font-semibold text-white">Your Combos:</h3>
      <ComboFilter />
      <div className='grid grid-cols-2 gap-[15px] items-center mx-[40px]'>
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
        <SkeletonComboCard />
      </div>
    </div>
  )
}
