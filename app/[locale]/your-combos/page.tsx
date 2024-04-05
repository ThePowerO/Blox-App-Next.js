import { getServerSession } from 'next-auth';
import prisma from '@/lib/prisma';
import { ComboCard } from '@/components/HtmlComponents/ComboCard';
import { headers } from "next/headers";
import Link from 'next/link';
import { AlertDestructive } from '@/components/HtmlComponents/ErrorAlert';

const combosType = ["All", "PVP", "PVE", "Grind"];

async function getCombos({
  userId,
}: {
  userId: string
}) {
  const session = await getServerSession()

  const data = await prisma.combo.findMany({
    where: {
      author: session?.user.name!,
    },
    select: {
      id: true,
      combotitle: true,
      combodescription: true,
      fightingstyle: true,
      weapon: true,
      fruit: true,
      sword: true,
      specialty: true,
      createdAt: true,
      slug: true,
      favorites: {
        where: {
          userId: userId ?? undefined,
        }
      },
      comboLikes: {
        where: {
          userId: userId ?? undefined,
        }
      }
    }
  })

  return data;
}

export default async function YourCombos({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const heads = headers()
  const pathname = heads ? heads.get('next-url') : '';
  const session = await getServerSession()
  const combos = await getCombos({userId: session?.user.id!, });

  const selectedComboType = (searchParams.specialty || 'All') as string

  const filteredCombo = combos.filter((combo) => {
    if (selectedComboType === 'ALL') {
      return true;
    } else if (selectedComboType === 'PVP') {
      return combo.specialty === 'PVP';
    } else if (selectedComboType === 'PVE') {
      return combo.specialty === 'PVE';
    } else if (selectedComboType === 'Grind') {
      return combo.specialty === 'Grind';
    } else {
      return true;
    }
  })
  return (
    <>
    <div>
      <h3 className="mb-4 font-semibold">Your Combos:</h3>
      {combos.length > 0 && (
        <ul className="items-center w-full md:flex grid grid-cols-2 text-sm font-medium border rounded-lg bg-gray-900 border-gray-600 text-white mb-[20px]">
          {combosType.map((specialty) => (
            <li key={specialty} className="w-full border-b sm:border-b-0 sm:border-r border-gray-600">
              <div className="flex items-center ps-3">
                  <Link 
                    href={`?${new URLSearchParams({
                      specialty: specialty,
                    })}`}
                    id={`horizontal-list-radio-${specialty}`} 
                    type="radio"
                    className={`w-4 h-4 rounded-lg ${selectedComboType === specialty ? 'bg-blue-600' : 'bg-gray-600'}`} 
                  />
                  <label htmlFor={`horizontal-list-radio-${specialty}`} className="w-full py-3 ms-2 text-sm font-medium text-gray-300">{specialty}</label>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className=''>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-[10px]'>
        {combos.length === 0 ? (
          <AlertDestructive />
        ) : (
          filteredCombo.map((combo) => (
            <ComboCard
              userId={session?.user.id!}
              key={combo.id}
              pathName={pathname as string}
              specialty={combo.specialty}
              comboLikes={combo.comboLikes}
              isInLikeList={Array.isArray(combo.comboLikes) && combo.comboLikes.length > 0}
              isInFavoriteList={Array.isArray(combo.favorites) && combo.favorites.length > 0}
              likeId={combo.comboLikes && combo.comboLikes[0]?.id}
              favoriteId={combo.favorites && combo.favorites[0]?.id}
              comboId={combo.id}
              comboFittingStyle={combo.fightingstyle}
              comboFruit={combo.fruit}
              comboSword={combo.sword}
              comboWeapon={combo.weapon}
              comboTitle={combo.combotitle}
              comboDescription={combo.combodescription}
              comboCreatedAt={combo.createdAt}
              comboSlug={combo.slug}
            />
          ))
        )}
        </div>
      </div>
    </div>
    </>
  )
}