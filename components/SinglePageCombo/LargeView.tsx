import { Combo } from "@/lib/types";
import React from "react";
import FavortiteLikeBtn from "./FavortiteLikeBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { User } from "@prisma/client";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import {
  DifficultyBadge,
  RaceBadge,
  SpecialtyBadge,
  StatsBadge,
} from "../HtmlComponents/ComboBadges";
import { HoverComboAuthor } from "../HtmlComponents/HoverComboAuthor";
import ComboVideo from "../HtmlComponents/ComboVideo";
import { Separator } from "@radix-ui/react-menu";

type Props = {
  combo: Combo;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    createdAt: Date;
    image: string | null;
    favorites: {
      id: string;
      comboId: string;
      userId: string;
      createdAt: Date;
    }[];
    commentLikes: {
      id: string;
      commentId: string;
      userId: string;
      createdAt: Date;
    }[];
  } | null;
};

export default async function LargeView({ combo, user }: Props) {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user as User;
  return (
    <>
      
    </>
  );
}
