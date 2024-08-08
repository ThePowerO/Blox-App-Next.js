"use client";

import NoAvatar from "@/public/Icons/noavatar.png";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, SquareUser, CogIcon, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useTranslations } from "next-intl";

const ProfileSelector = ({
  locale,
  user,
}: {
  locale: string;
  user: User;
}) => {
  const t = useTranslations("NavBar");
  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Adiciona o event listener somente no lado do cliente
      window.addEventListener("click", handleWindowClick);
    }

    // Remove o event listener quando o componente Ã© desmontado
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("click", handleWindowClick);
      }
    };
  }, []);

  const handleWindowClick = (e: MouseEvent) => {
    if (
      menuRef.current &&
      imgRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !imgRef.current.contains(e.target as Node)
    ) {
      setOpenMenu(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}/sign-in` });
  };

  const router = useRouter();

  return (
    <div className="justify-center">
      <div className="relative">
        <button
          ref={imgRef}
          className="size-fit"
          onClick={() => setOpenMenu((prev) => !prev)}
        >
          <Image
            alt=""
            src={user?.image || NoAvatar}
            width={40}
            height={40}
            className="w-[40px] h-[40px] rounded-full border-[2px] hover:border-gray-500 border-cyan-300 cursor-pointer"
          />
        </button>
        {openMenu && ( //w 140 l -95 className="z-[50] text-white bg-[#212529] p-4 w-[140px] shadow-lg absolute -left-[95px] top-[50px] rounded-lg"
          <div
            ref={menuRef}
            className={`text-white bg-[#212529] p-2 absolute ${
              currentUser && currentUser.id ? "-left-[105px]" : "-left-[85px]"
            } top-[50px] rounded-lg`}
          >
            <ul>
              {currentUser && currentUser.id ? (
                <>
                  <li>
                    <Button
                      variant={"ghost"}
                      className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <Award color="yellow" size={18} />
                      <span>{user?.highlights}</span>
                    </Button>
                  </li>
                  <li className="w-full">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/${locale}/profile/${user.id}`)}
                      className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <SquareUser size={18} />
                      {user?.name}
                    </Button>
                  </li>
                  <li className="w-full">
                    <Button
                      variant="ghost"
                      onClick={() => router.push(`/${locale}/create-combo`)}
                      className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                    >
                      <CogIcon size={18} />
                      Settings
                    </Button>
                  </li>
                  <li className="w-full">
                    <Button
                      onClick={handleSignOut}
                      variant="destructive"
                      className="w-full flex items-center gap-2 hover:text-white text-white"
                    >
                      <LogOut size={18} />
                      {t("SignOut")}
                    </Button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link href={`/${locale}/sign-in`}>
                      <Button
                        onClick={() => setOpenMenu(false)}
                        variant="ghost"
                        className="w-full flex items-center gap-2 hover:bg-blue-700 text-white hover:text-white"
                      >
                        <LogOut />
                        {t("SignIn")}
                      </Button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSelector;
