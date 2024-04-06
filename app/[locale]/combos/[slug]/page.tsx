import { HoverComboAuthor } from '@/components/HtmlComponents/HoverComboAuthor';
import AddLikeButton, { AddFavoriteButton, RemoveFavoriteButton, RemoveLikeButton } from '@/components/HtmlComponents/SubmitButtons';
import { addComboLike, addFavoriteCombo, getCombo, removeComboLike, removeFavoriteCombo } from '@/lib/actions/comboActions';
import { getServerSession } from 'next-auth';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react'
import prisma from '@/lib/prisma';
import { SendHorizonalIcon } from 'lucide-react';
import Comments from '@/components/HtmlComponents/Comments';
import ComboInformation from '@/components/HtmlComponents/ComboInformation';
import ComboVideo from '@/components/HtmlComponents/ComboVideo';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ComboLike {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
}

interface Favorite {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
}

interface Combo {
  id: string
  combotitle: string
  combodescription: string
  fightingstyle: string
  weapon: string
  fruit: string
  sword: string
  specialty: string
  createdAt: Date
  author: string
  authorImage: string
  authorCreatedAt: Date
  race: string
  mainStats: string
  comboVideo: string
  comboLikes: ComboLike[];
  favorites: Favorite[];
}

interface Props {
  params: {
    slug: string
  }
}

export default async function page({ params }: Props) {
  const session = await getServerSession();
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email!
    },
  })

  const heads = headers()
  const pathname = heads ? heads.get('next-url') : '';

  const { slug } = params;
  const decodedSlug = decodeURIComponent(slug);
  const combo: Combo | null = await getCombo(decodedSlug);

  const likeId = combo?.comboLikes && combo.comboLikes[0]?.id
  const favoriteId = combo?.favorites && combo.favorites[0]?.id

  const isInLikeList = Array.isArray(combo?.comboLikes) && combo.comboLikes.length > 0
  const isInFavoriteList= Array.isArray(combo?.favorites) && combo.favorites.length > 0
  const likes = 71687;

  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(2) + 'm';
    }
  };

  return (
    <div className='p-2 md:p-0'>
      <div className='flex flex-col gap-[10px]'>
        <div className='flex justify-between'>
          <div className='flex w-full items-center gap-2 border rounded-[8px] p-2'>
            <div className='grow'>
              <p className='text-[12px]'>You are viewing the combo <span className='font-bold'>{combo?.combotitle}</span></p>
            </div>
          </div>
        </div>
        <div className=''>
          <div className='flex justify-center gap-2'>
            <Image
              src={combo?.fightingstyle || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.fruit || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.sword || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
            <Image
              src={combo?.weapon || ''}
              className='border rounded-[8px]'
              alt=""
              width={60}
              height={60}
            />
          </div>
          <p className='text-[12px]'>
            {combo?.combotitle} by
            <>
              <HoverComboAuthor
                authorCreatedAt={combo?.authorCreatedAt.toDateString()}
                comboAuthor={combo?.author}
                authorImage={combo?.authorImage}
              />
            </>
          </p>
          {session?.user && session?.user?.email! === user?.email && (
            <div className='flex gap-[5px] items-center mt-[-6px]'>
              {isInFavoriteList ? (
                <form action={removeFavoriteCombo}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='favoriteId' value={favoriteId} />
                  <RemoveFavoriteButton />
                </form>
              ) : (
                <form action={addFavoriteCombo}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='comboId' value={combo?.id} />
                  <AddFavoriteButton />
                </form>
              )}       
              {isInLikeList ? (
                <form className='mt-1' action={removeComboLike}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='likeId' value={likeId} />
                  <RemoveLikeButton />
                </form>
              ) : (
                <form className='mt-1' action={addComboLike}>
                  <input type="hidden" name='pathName' value={pathname || ''} />
                  <input type="hidden" name='comboId' value={combo?.id} />
                  <AddLikeButton />
                </form>
              )}
              <p title={`${combo?.comboLikes.length} likes`} className='text-[12px]'>{formatNumber(likes)}</p>
            </div>
          )}
        </div>
        <div className='flex flex-col gap-[5px]'>
          <p className='grid place-items-center'>Description:</p>
          <ScrollArea className='w-full text-sm border rounded-lg p-1 h-[80px]'>
            {combo?.combodescription}
          </ScrollArea>
        </div>
        <ComboInformation mainStats={combo?.mainStats!} race={combo?.race!} specialty={combo?.specialty!} />
        <div>
          <p>Combo Video:</p>
          <div suppressHydrationWarning>
            <video
              src={combo?.comboVideo}
              className=""
              width="100%"
              height="350px"
              controls
            />
          </div>
        </div>
      </div>
    </div>
  )
}
