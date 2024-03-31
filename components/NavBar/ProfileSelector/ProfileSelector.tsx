'use client';

import NoAvatar from "@/public/Icons/noavatar.png"
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfileSelector = ({ locale }: { locale: string }) => {

    const { data: session } = useSession();

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

        // Remove o event listener quando o componente é desmontado
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
                openMenu && (
                    <div ref={menuRef} className="z-[50] text-white bg-[#212529] p-4 w-[140px] shadow-lg absolute -left-[95px] top-[50px] rounded-lg">
                        <ul>
                           {session && session.user ? (
                               <>
                                {Menus.map((menu) => (
                                    <Link href={`/${locale}${menu.path}`} className="flex rounded-lg cursor-pointer p-[5px] hover:bg-gray-600" key={menu.title}>{menu.title}</Link>
                                ))}
                                <button onClick={handleSignOut} className="flex rounded-lg cursor-pointer p-[5px] hover:bg-gray-600">Sign Out</button>
                                <p>{session.user.name}</p>
                               </>
                           ) : (
                                <div className="">
                                    <Link href={`/${locale}/sign-in`} className="flex rounded-lg cursor-pointer p-[5px] hover:bg-gray-600 transition-all">Sign In</Link>
                                </div>
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
