'use client';

import NoAvatar from "@/public/Icons/noavatar.png"
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, SquareUser, CogIcon } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

const ProfileSelector = ({ locale }: { locale: string }) => {

  const { data: session } = useSession();
  const currentUser = session?.user as User;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Adiciona o event listener somente no lado do cliente
      window.addEventListener("click", handleWindowClick);
    }

    // Remove o event listener quando o componente Ã© desmontado
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("click", handleWindowClick);
      }
    };
  }, []);

  const handleWindowClick = (e: MouseEvent) => {
    if (menuRef.current && imgRef.current && !menuRef.current.contains(e.target as Node) && !imgRef.current.contains(e.target as Node)) {
      setOpenMenu(false);
    }
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: `/${locale}/sign-in` });
  };

  const router = useRouter();

  const Menus = [
    {
      title: "Profile",
      path: "/profile"
    },
    {
      title: "Settings",
      path: "/settings"
    },
  ]

  return (
    <div className="justify-center">
      <div className="relative">
        <Image
          alt=""
          ref={imgRef}
          src={session?.user?.image || NoAvatar}
          width={40}
          height={40}
          onClick={() => setOpenMenu((prev) => !prev)}
          className="w-[40px] h-[40px] rounded-full border-[2px] hover:border-gray-500 border-cyan-300 cursor-pointer"
        />
        {
          openMenu && ( //w 140 l -95 className="z-[50] text-white bg-[#212529] p-4 w-[140px] shadow-lg absolute -left-[95px] top-[50px] rounded-lg"
            <div ref={menuRef} className={`text-white bg-[#212529] p-2 absolute ${currentUser && currentUser.id ? "-left-[105px]" : "-left-[85px]"} top-[50px] rounded-lg`}>
              <ul>
                {currentUser && currentUser.id ? (
                  <>
                    <li className="w-full">
                      <Link href={`/`}>
                        <Button
                          variant="ghost"
                          className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <SquareUser size={18} />
                          {currentUser.name}
                        </Button>
                      </Link>
                    </li>
                    <li className="w-full">
                      <Link href={`/${locale}/create-combo`}>
                        <Button
                          variant="ghost"
                          className="w-full flex items-center justify-start gap-2 dark:hover:bg-gray-500 dark:text-white"
                        >
                          <CogIcon size={18} />
                          Settings
                        </Button>
                      </Link>
                    </li>
                    <li className="w-full">
                      <Button
                        onClick={handleSignOut}
                        variant="destructive"
                        className="w-full flex items-center gap-2 hover:text-white text-white"
                      >
                        <LogOut size={18} />
                        Sign Out
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
                          Sign In
                        </Button>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProfileSelector;