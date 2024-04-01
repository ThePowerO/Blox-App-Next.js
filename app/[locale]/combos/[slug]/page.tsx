import { AvatarDemo } from '@/components/HtmlComponents/AvatarDemo';
import { getCombo } from '@/lib/actions/comboActions';
import { getServerSession } from 'next-auth';
import React from 'react'

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {
  const session = await getServerSession();

  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const combo = await getCombo(decodedSlug);
  console.log(combo)

  return (
    <div className='p-2 md:p-0'>
      <div>
        <div className='flex justify-between'>
          <h1 className='text-[24px] font-bold'>
            {combo?.combotitle}
          </h1>
          <div className='flex w-[300px] items-center gap-2 border rounded-[8px] p-2'>
            <AvatarDemo userImg={session?.user.image} userNickName={session?.user.name} />
            <div className='grow'>
              <p className='text-[16px] font-bold'>@{session?.user.name}</p>
              <p className='text-[12px]'>You are viewing the combo {combo?.combotitle}</p>
            </div>
          </div>
        </div>
        {/*
        <div className='flex items-center justify-between gap-2 border rounded-[8px] p-2'>
          <div className='avatar rounded-full min-h-12 min-w-12 bg-emerald-500 text-white font-[700] flex items-center justify-center'>
              <p>SD</p>
          </div>
          <div className='grow'>
            <p className='text-[16px] font-bold'>UserName</p>
            <p className='text-[12px] text-truncate-500'>UserName@gmail.com</p>
          </div>
        </div>
        */}
      </div>
    </div>
  )
}
