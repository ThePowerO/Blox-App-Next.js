import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { add } from "date-fns";

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

      console.log("priceId (product): ", session.line_items?.data[0].price?.id);

      if (priceId === "price_1PZcT4BvVijJQ1WrylJ6DThC" || 
        priceId === "price_1PiLSCBvVijJQ1Wr1k4CY4on" ||
        priceId === "price_1PpD7IBvVijJQ1Wr2IDalWho" || // 中文
        priceId === "price_1PpDKlBvVijJQ1Wr7EtIfljm" || // português
        priceId === "price_1PiLdxBvVijJQ1Wromqo7mX8" ||
        priceId === "price_1PiLtcBvVijJQ1Wr8B3n8wBo" ||
        priceId === "price_1PiM37BvVijJQ1WrD94xTLSB" ||
        priceId === "price_1PiM7SBvVijJQ1Wro883Ek7B"
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
