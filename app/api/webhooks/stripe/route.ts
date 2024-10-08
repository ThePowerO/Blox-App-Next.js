import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { add } from "date-fns";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export const POST = async (req: NextRequest) => {
  const sig = req.headers.get("Stripe-Signature");

  let event;

  try {
    const payload = await req.text();

    event = stripe.webhooks.constructEvent(payload, sig as string, endpointSecret);

  } catch (err) {
    return NextResponse.json({ status: "failed", err });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
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

      console.log("priceId (product): ", session.line_items?.data[0].price?.id);

      if (priceId === "price_1PZcT4BvVijJQ1WrylJ6DThC" || // English
        priceId === "price_1PiLSCBvVijJQ1Wr1k4CY4on" || // 日本語
        priceId === "price_1PpD7IBvVijJQ1Wr2IDalWho" || // 中文
        priceId === "price_1PpDKlBvVijJQ1Wr7EtIfljm" || // português
        priceId === "price_1PiLdxBvVijJQ1Wromqo7mX8" || // 한국어
        priceId === "price_1PiLtcBvVijJQ1Wr8B3n8wBo" || // Deutsch ?
        priceId === "price_1PiM37BvVijJQ1WrD94xTLSB" || // Français
        priceId === "price_1PiM7SBvVijJQ1Wro883Ek7B"    // Italiano ?
      ) { // Starter Pack
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
      } else if (priceId === "price_1PaNzMBvVijJQ1Wr6dLNC1Dm" || 
        priceId === "price_1PiLVlBvVijJQ1WrOe6JXatz" ||
        priceId === "price_1PpDEgBvVijJQ1WrkneCkBVD" || // 中文
        priceId === "price_1PiKflBvVijJQ1WrnNrruWRk" || // português
        priceId === "price_1PiLivBvVijJQ1WrUKQb3yi8" ||
        priceId === "price_1PiLvSBvVijJQ1WrmMpD2Jcn" ||
        priceId === "price_1PiM4OBvVijJQ1WrHNPbrNit" ||
        priceId === "price_1PiM8nBvVijJQ1WrOun6inDp"
      ) { // Pro Pack
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
      } else if (priceId === "price_1PaOJnBvVijJQ1WrXqLRbQBK" || 
        priceId === "price_1PiLYwBvVijJQ1WrGynnsBGU" ||
        priceId === "price_1PiLKdBvVijJQ1WrqcaGe8zj" || // 中文
        priceId === "price_1PpDWqBvVijJQ1WrptSUNj9c" || // português
        priceId === "price_1PiLnDBvVijJQ1WrmhXBykEn" ||
        priceId === "price_1PiLzfBvVijJQ1WrR3wrcvxn" ||
        priceId === "price_1PiM6VBvVijJQ1WrOFk4COFx" ||
        priceId === "price_1PiMAhBvVijJQ1Wrf4kvFI9w"
      ) { // Plus Pack
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
      }
    }

    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id
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

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ received: true });
};