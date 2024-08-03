import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { add } from "date-fns";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const POST = async (req: Request) => {
  const body = (await req.json()) as Stripe.Event;

  switch (body.type) {
    case "checkout.session.completed": {
      const session = await stripe.checkout.sessions.retrieve(
        body.data.object.id,
        {
          expand: ["line_items"],
        }
      );
      const user = await prisma.user.findFirst({
        where: {
          id: session.metadata?.userId as string,
        },
      });
      if (!user) {
        break;
      }
      const priceId = session?.line_items?.data[0].price?.id;

      if (priceId === "price_1PZcT4BvVijJQ1WrylJ6DThC") {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            highlights:
              user.starterPack === 0
                ? user.highlights + 5
                : user.highlights + 3,
            starterPack: user.starterPack + 1,
          },
        });
      } else if (priceId === "price_1PaNzMBvVijJQ1Wr6dLNC1Dm") {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            highlights:
              user.proPack === 0 ? user.highlights + 10 : user.highlights + 8,
            proPack: user.proPack + 1,
          },
        });
      } else if (priceId === "price_1PaOJnBvVijJQ1WrXqLRbQBK") {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            highlights: user.highlights + 15,
            isPlusPack: true,
            stripeCustomerId: session.customer as string,
            proPack: user.proPack + 1,
            plusPackWeeklyTime: add(new Date(), { days: 7 }),
          },
        });
      } else {
        console.log("priceId didn't match to any of the Products");
        break;
      }
    }

    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        body.data.object.id
      );

      const user = await prisma.user.findFirst({
        where: {
          stripeCustomerId: subscription.customer as string,
        },
      });

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          isPlusPack: false,
        },
      });

      break;
    }
  }
};
