'use client'

import React from 'react'
import { MoreVertical, Trash2, Pencil  } from 'lucide-react'
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { deleteCombo } from '@/lib/actions/comboActions' 
import Link from 'next/link'
import { useLocale } from '@/LocaleContext'

export default function MoreVerticalBtn({ comboId, comboSlug, pathName }: { pathName: string, comboSlug: string, comboId: string } ) {

  const { locale } = useLocale()

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
            <div className='hover:bg-slate-400 p-1 rounded-full transition-all'>
              <MoreVertical width={18} height={18} />
            </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <div className='p-1'>
            <Button className='w-full flex gap-1' variant="outline">
              <Pencil width={18} height={18} />
              <Link href={`/${locale}/combos/${comboSlug}`} >View Combo</Link>
            </Button>
            <DropdownMenuSeparator />
              <form action={deleteCombo} >
                  <input type="hidden" name='comboId' value={comboId} />
                  <input type="hidden" name='pathName' value={pathName} />
                <Button className='w-full flex gap-1' variant="destructive">
                  <Trash2 width={18} height={18} />
                  Delete Combo
                </Button>
              </form>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}