import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { getLocale } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function ManageSubscriptionBtn() {
  const locale = await getLocale();
  return (
    <form>
      <Button
        formAction={async () => {
          "use server";
          const session = await getServerSession(authOptions);
          if (!session) {
            return;
          }

          const user = await prisma.user.findUnique({
            where: {
              id: session.user.id,
            },
          });

          if (!user) {
            return;
          }

          const stripeCustomerId = user.stripeCustomerId;

          if (!stripeCustomerId) {
            throw new Error("No Stripe Customer Id");
          }

          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: stripeCustomerId,
            return_url: `http://localhost:3000/${locale}/profile/${user.id}`,
          });

          if (!stripeSession.url) {
            throw new Error("No Stripe Session URL");
          }
          redirect(stripeSession.url);
        }}
        className="w-fit"
      >
        Manage Subscription
      </Button>
    </form>
  );
}
