import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import TextGradient from "../HtmlComponents/TextGradient";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { IoLogoDiscord } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { LoginGoogleDiscord } from "../HtmlComponents/NoSessionLikeFav";

type currentUser =
  | {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  | undefined;

type PricingPack = {
  currentUser: currentUser;
  packname: string;
  description: string;
  link?: string;
  priceId: string;
  price: string;
  features: string[];
  notIncluded?: string[];
  isSubscription?: boolean;
  hasInfo?: boolean;
  relevant?: boolean;
};

export default function PricingSection({
  currentUser,
  packname,
  description,
  price,
  features,
  notIncluded,
  link,
  hasInfo,
  isSubscription,
  relevant,
  priceId,
}: PricingPack) {
  const t = useTranslations("LandingPage");
  const t2 = useTranslations("SignInPage");

  return (
    <div
      className={`${
        relevant === true
          ? "shadow-xl border-cyan-800 shadow-cyan-500 divide-cyan-900"
          : "border-gray-200 divide-gray-200"
      } divide-y divide-gray-200 rounded-2xl border  shadow-sm mt-7`}
    >
      <div className="p-6 sm:px-8">
        <div className={`mdmax:flex 940px:flex items-center justify-between`}>
          <h2 className="p-2 size-fit bg-cyan-400 rounded-full w-fit text-sm font-medium">
            {packname}
          </h2>
          {relevant && (
            <TextGradient
              text={t("BestOffer")}
              from={`from-amber-600 text-sm`}
              via="via-yellow-300"
              to="to-amber-700"
            />
          )}
        </div>

        <p className="mt-2">{description}</p>

        <p className="mt-2 sm:mt-4">
          <strong className="text-3xl font-bold sm:text-4xl">{price} </strong>
          {isSubscription && (
            <span className="text-sm font-medium">/{t("PerMonth")}</span>
          )}
        </p>

        {currentUser ? (
          <form>
            <button
              formAction={async () => {
                "use server";

                const authSession = await getServerSession(authOptions);
                if (!authSession) {
                  return;
                }

                const session = await stripe.checkout.sessions.create({
                  mode: isSubscription ? "subscription" : "payment",
                  payment_method_types: ["card"],
                  line_items: [
                    {
                      price: priceId,
                      quantity: 1,
                    },
                  ],
                  success_url: "http://localhost:3000/",
                  cancel_url: "http://localhost:3000/",
                  metadata: {
                    userId: authSession.user.id,
                  },
                });

                redirect(
                  (link as string) +
                    "?prefilled_email=" +
                    authSession.user.email
                );
              }}
              className="mt-4 w-full block rounded border border-cyan-300 bg-cyan-300 px-12 py-3
          text-center text-sm font-medium text-white hover:bg-transparent hover:text-cyan-300
          focus:outline-none focus:ring active:text-cyan-300 sm:mt-6"
            >
              {isSubscription ? `${t("SubscribeNow")}` : `${t("BuyPack")}`}
            </button>
          </form>
        ) : (
          <Dialog>
            <DialogTrigger>
              <button
                className="mt-4 w-full block rounded border border-cyan-300 bg-cyan-300 px-12 py-3
                text-center text-sm font-medium text-white hover:bg-transparent hover:text-cyan-300
                focus:outline-none focus:ring active:text-cyan-300 sm:mt-6"
              >
                {isSubscription ? `${t("SubscribeNow")}` : `${t("BuyPack")}`}
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>{t2("h1")}</DialogHeader>
              <LoginGoogleDiscord />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="p-6 sm:px-8">
        <p className="text-lg font-medium sm:text-xl">{t("WhatsIncluded")}</p>

        <ul className="mt-2 space-y-2 sm:mt-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-cyan-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>

              <span className="">{feature}</span>
            </li>
          ))}
          {hasInfo && (
            <li className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-info  text-purple-600"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <span>{t("UnlimitedCombosIsPermament")}</span>
            </li>
          )}
          {notIncluded?.map((feature) => (
            <li key={feature} className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 text-red-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              <span className="text-gray-400">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
