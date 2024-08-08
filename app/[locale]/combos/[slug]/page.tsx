import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ComboBySlug from "@/components/SinglePageCombo/ComboBySlug";
import CommentSection from "@/components/SinglePageCombo/CommentSection";
import { getSlugCombo } from "@/lib/actions/comboActions";
import { Combo } from "@/lib/types";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
import prisma from "@/lib/prisma";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

async function fetchData(slug: string) {
  const combo: Combo | null = await getSlugCombo(slug);

  return { combo };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { combo } = await fetchData(params.slug);

  return {
    title: `${combo?.combotitle}`,
  };
}

export default async function page({ params }: Props) {
  const slug = params.slug;
  const combo: Combo | null = await getSlugCombo(slug);
  const session = await getServerSession(authOptions);
  const userSession = session?.user;
  const userId = userSession?.id;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <>
      {userSession ? (
        <main>
          <ComboBySlug currentUser={userSession} combo={combo as Combo} />

          <CommentSection
            user={user as User}
            userId={userId as string}
            combo={combo as Combo}
          />
        </main>
      ) : (
        <main>
          <ComboBySlug currentUser={userSession} combo={combo as Combo} />

          <CommentSection
            user={{} as User}
            userId={userId as string}
            combo={combo as Combo}
          />
        </main>
      )}
    </>
  );
}
