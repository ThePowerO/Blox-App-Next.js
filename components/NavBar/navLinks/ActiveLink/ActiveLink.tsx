'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const ActiveLink = ({ item, locale }: { item: { title: string; path: string }; locale: string }) => {
  const pathname = usePathname();

  return (
    <div className=''>
      <Link
        href={`/${locale}${item.path}`}
        className={`nav-link ${pathname === `/${locale}${item.path}` ? 'text-cyan-300' : ''}`}
      >
        {item.title}
      </Link>
    </div>
  );
};

export default ActiveLink;