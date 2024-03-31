'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MobileActiveLink = ({ item, locale }: { item: { title: string; path: string }; locale: string }) => {
  const pathname = usePathname();

  return (
    <div className=''>
      <Link
        href={`/${locale}${item.path}`}
        className={`${pathname === `/${locale}${item.path}` ? 'text-sm text-black p-2 pr-12 rounded-full bg-cyan-100' : 'border-b-1 text-sm border-slate-300'}`}
      >
        {item.title}
    </Link>
    </div>
  );
};

export default MobileActiveLink;