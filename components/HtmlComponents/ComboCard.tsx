import { Star, MoreVertical, Heart, } from 'lucide-react';
import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import AddLikeButton, { AddFavoriteButton, RemoveFavoriteButton, RemoveLikeButton } from '../HtmlComponents/SubmitButtons';
import { addComboLike, addFavoriteCombo, removeComboLike, removeFavoriteCombo } from '@/lib/actions/comboActions';
import Image from 'next/image';
import MoreVerticalBtn from './MoreVertical';

interface ComboLike {
  id: string;
  comboId: string;
  userId: string;
  createdAt: Date;
}

interface iAppProps {
  isInLikeList: boolean;
  isInFavoriteList: boolean;
  userId: string;
  likeId: string;
  favoriteId: string;
  comboId: string;
  comboFittingStyle: string;
  comboFruit: string;
  comboSword: string;
  comboWeapon: string;
  comboTitle: string;
  comboDescription: string;
  comboCreatedAt: Date;
  pathName: string;
  specialty: string;
  comboLikes: ComboLike[];
}

export async function ComboCard({
  isInLikeList,
  likeId,
  comboId,
  comboFittingStyle,
  comboFruit,
  comboSword,
  comboWeapon,
  comboTitle,
  comboDescription,
  comboCreatedAt,
  userId,
  comboLikes,
  pathName,
  specialty,
  isInFavoriteList,
  favoriteId,
}: iAppProps) {

  const session = await getServerSession();

  function formatNumber(num: number): string {
    if (num < 1000) {
      return num.toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return (num / 1000000).toFixed(2) + 'm';
    }
  };

  const likes = 71687;

  return (
    <div className='p-1'>
      <div className='flex justify-between w-full border-[1px] border-slate-300'>
        <div className='flex'>
          <div className='grid grid-cols-2 gap-2 p-3 border-r border-[1px] border-slate-300 cursor-pointer hover:bg-slate-900 dark:hover:bg-[#262657] transition-all'>
            <div className="border-[1px] border-slate-300" >
              <Image
                src={comboFittingStyle}
                alt="Electric Claw"
                height={35}
                width={35}
              />
            </div>
            <div className="border-[1px] border-slate-300">
              <Image
                src={comboFruit}
                alt="Electric Claw"
                height={35}
                width={35}
              />
            </div>
            <div className="border-[1px] border-slate-300">
              <Image
                src={comboSword}
                alt="Electric Claw"
                height={35}
                width={35}
              />
            </div>
            <div className="border-[1px] border-slate-300">
              <Image
                src={comboWeapon}
                alt="Electric Claw"
                height={35}
                width={35}
              />
            </div>
          </div>
          <div className='flex p-2 flex-col justify-between'>
            <h2>{comboTitle}</h2>
            <div>
              <p className=''>{comboCreatedAt.toDateString().split(' ').slice(1).join(' ')}</p>
              {specialty ? (
                <p>Specialty: <span className='font-bold'>{specialty}</span></p>
              ) : (<p>Specialty: <span className='font-bold'>None</span></p>)}
            </div>
          </div>
        </div>
        <div className='border-l border-slate-300 p-1'>
          <div className='justify-center'>
            {session?.user && session?.user?.id === userId && (
              <div className='flex flex-col items-center gap-[5px]'>
                {isInFavoriteList ? (
                  <form action={removeFavoriteCombo}>
                    <input type="hidden" name='pathName' value={pathName || ''} />
                    <input type="hidden" name='favoriteId' value={favoriteId} />
                    <RemoveFavoriteButton />
                  </form>
                ) : (
                  <form action={addFavoriteCombo}>
                    <input type="hidden" name='pathName' value={pathName || ''} />
                    <input type="hidden" name='comboId' value={comboId} />
                    <AddFavoriteButton />
                  </form>
                )}       
                {isInLikeList ? (
                  <form className='mt-1' action={removeComboLike}>
                    <input type="hidden" name='pathName' value={pathName || ''} />
                    <input type="hidden" name='likeId' value={likeId} />
                    <RemoveLikeButton />
                  </form>
                ) : (
                  <form className='mt-1' action={addComboLike}>
                    <input type="hidden" name='pathName' value={pathName || ''} />
                    <input type="hidden" name='comboId' value={comboId} />
                    <AddLikeButton />
                  </form>
                )}
                <p title={`${comboLikes.length} likes`} className='text-[12px] mt-[-10px]'>{formatNumber(likes)}</p>
                <MoreVerticalBtn comboTitle={comboTitle} pathName={pathName || ''} comboId={comboId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
