import NavBarContent from "./NavBarContent";

const NavBarLayout = ({ locale, userHighlights }: { locale: string, userHighlights: number }) => {
  

  return (
    <NavBarContent locale={locale} userHighlights={userHighlights} />
  );
};

export default NavBarLayout;
