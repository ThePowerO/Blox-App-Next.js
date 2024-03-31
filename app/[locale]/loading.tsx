import Image from 'next/image'
import React from 'react'
import LoadSpin from '@/public/Icons/loading.svg'

export default function loading() {
  return (
    <div className='flex justify-center mt-[30px]'>
      <Image width={50} height={50} src={LoadSpin} alt="loading" />
    </div>
  )
}
