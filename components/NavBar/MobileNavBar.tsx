'use client';

import { Menu, Package2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { useLocale } from '@/LocaleContext';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import MobileActiveLink from './navLinks/ActiveLink/MobileActiveLink';

export default function MobileNavBar({locale}: {locale: string}) {
    const links = [
        {
            title: 'About',
            path: '/about',
        },
        {
            title: 'Users',
            path: '/users',
        },
        {
            title: 'Combos',
            path: '/combos',
        },
        {
            title: 'Create Combo',
            path: '/create-combo',
        },
        {
            title: 'Your Combos',
            path: '/your-combos',
        },
        {
            title: 'Community',
            path: '/'
        },
        {
            title: 'Sign In',
            path: '/sign-in'
        },
        {
            title: 'Sign Up',
            path: '/sign-up'
        }
      ];


  return (
    <Sheet>
        <SheetTrigger asChild>
            <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-white md:hidden"
            >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent className='z-[1000]' side="left">
            <nav className="grid gap-6 text-lg font-medium">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                >
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                {links.map(link => (
                    <MobileActiveLink key={link.title} item={link} locale={locale} />
                ))}
            </nav>
        </SheetContent>
    </Sheet>
  )
}
