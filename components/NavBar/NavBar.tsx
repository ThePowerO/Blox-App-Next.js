import Link from "next/link"
import Links from "./navLinks/Links";
import LanguageSelector from "./LanguageSelector/LanguageSelector";
import ProfileSelector from "./ProfileSelector/ProfileSelector";
import { Menu } from 'lucide-react';
import { ThemeModeToggle } from "./ThemeModeToggle";
import MobileNavBar from "./MobileNavBar";

const NavBar = ({ locale }: { locale: string }) => {

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
          title: 'Your Combos',
          path: '/your-combos',
        },
      ];

      //fixed top-0 left-0 right-0 z-[10] w-full flex justify-center bg-[#212529] shadow-v2
      //w-[1000px] flex items-center justify-between text-white h-[60px]
      //flex items-center gap-[20px] justify-between
  return (
    <div className="fixed top-0 w-full z-[999] bg-[#212529]">
      <nav className={`md:max-w-[1000px] md:m-auto flex justify-between items-center p-2`}>
        <Link href={`/${locale}`} className="hidden text-white md:block">Logo</Link>
        <MobileNavBar locale={locale} />
        <div className="text-white hidden md:block">
          <Links locale={locale} />
        </div>
        <div className="flex">
          <LanguageSelector item={links[0]} locale={locale} />
          <ThemeModeToggle />
          <ProfileSelector locale={locale} />
        </div>
      </nav>
    </div>
  )
}

export default NavBar;
