import React from 'react';
import ActiveLink from './ActiveLink/ActiveLink';
import { IoLanguageSharp } from 'react-icons/io5';
import { useTranslations } from 'next-intl';

const Links = ({ locale }: { locale: string }) => {
  const t = useTranslations('NavBar');
  const t2 = useTranslations('CreateComboPage');
  const links = [
    {
      title: `${t('Users')}`,
      path: '/users',
    },
    {
      title: `${t('Combos')}`,
      path: '/combos',
    },
    {
      title: `${t('YourCombos')}`,
      path: '/your-combos',
    },
    {
      title: `${t2('CreateCombo')}`,
      path: "/create-combo",
    },
  ];

  return (
    <div className=''>
      <div className='flex gap-[10px]'>
        {links.map(link => (
          <ActiveLink key={link.title} item={link} locale={locale} />
        ))}
      </div>
    </div>
  );
};

export default Links;