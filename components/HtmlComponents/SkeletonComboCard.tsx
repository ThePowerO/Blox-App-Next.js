import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function SkeletonComboCard() {
  return (
    <div>
      <div className='flex w-[400px] border-[1px] border-slate-300'>
        <div className='grid gap-2 grid-cols-2 p-4 border-r border-slate-300 cursor-pointer hover:bg-slate-900 transition-all'>
            <div className='border-[1px] border-slate-300'>
                <Skeleton className='w-[35px] h-[35px]' />
            </div>
            <div className='border-[1px] border-slate-300'>
                <Skeleton className='w-[35px] h-[35px]' />
            </div>
            <div className='border-[1px] border-slate-300'>
                <Skeleton className='w-[35px] h-[35px]' />
            </div>
            <div className='border-[1px] border-slate-300'>
                <Skeleton className='w-[35px] h-[35px]' />
            </div>
        </div>
        <div className='flex flex-col w-full justify-between p-3 text-sm'>
            <Skeleton />
        </div>
      </div>
    </div>
  )
}
