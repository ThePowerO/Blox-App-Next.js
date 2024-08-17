import { User } from "@prisma/client";
import NavBarContent from "./NavBarContent";

const NavBarLayout = ({ locale }: { locale: string }) => {
  

  return (
    <NavBarContent locale={locale} />
  );
};

export default NavBarLayout;
