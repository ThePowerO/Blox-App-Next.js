import {
  MessageCircleMore,
  Pencil,
  TrendingUp,
  Trophy,
  User,
} from "lucide-react";
import React from "react";
import { ComboSkeletonFallback } from "../YourCombos/CombosDisplayFallback";
import UserMainContent from "./UserMainContent";
import ProflieCombos from "./ProflieCombos";
import Link from "next/link";
import ProfileSideBar from "./ProfileSideBar";

type Props = {
  ParamsUserId: string;
};

export default function SingleProfilePage({ ParamsUserId }: Props) {
  return (
    <main className="flex">
      <section className="hidden md:block w-[200px] p-3 pt-8 border-r-2">
        <ProfileSideBar isUsersPage={false} ParamsUserId={ParamsUserId} />
      </section>
      <section className="w-full flex flex-col divide-y divide-gray-400 gap-8 p-5 sm:p-10 sm:pr-5 lg:pr-0">
        <UserMainContent ParamsUserId={ParamsUserId} />
        <ProflieCombos ParamsUserId={ParamsUserId} />
      </section>
    </main>
  );
}
