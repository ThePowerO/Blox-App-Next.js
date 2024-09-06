import CreateComboLayout from "@/components/CreateCombo/CreateComboLayout";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";

export default async function CreatecomboPage() {
  const session = await getServerSession(authOptions);
  const currentUser = session?.user;
  const locale = await getLocale();

  if (!currentUser) {
    redirect(`/${locale}/sign-in`);
  }

  const [user, userComboCount] = await Promise.all([
    prisma.user.findUnique({
      where: { id: session.user.id },
      select: { proPack: true, starterPack: true, isPlusPack: true },
    }),
    prisma.comboCountLimit.findUnique({
      where: { userId: session.user.id },
    }),
  ]);

  if (!user) {
    return <p>User not found</p>;
  }

  const UserMaxComboCountReached = userComboCount?.count;

  return (
    <CreateComboLayout
      user={user}
      UserMaxComboCountReached={(UserMaxComboCountReached as number) || 0}
    />
  );
}
