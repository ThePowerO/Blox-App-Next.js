import { User } from "@prisma/client";
import NavBarContent from "./NavBarContent";

const NavBarLayout = ({ locale, user }: { locale: string, user: User | null }) => {
  

  return (
    <NavBarContent locale={locale} user={user as User} />
  );
};

export default NavBarLayout;
