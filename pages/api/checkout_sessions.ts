// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { ProductsData } from '../../types/types';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('handler of checkout-sessions....');

  if (req.method === "POST") {
    const items: ProductsData[] = req.body.items;
    console.log('POST - ', items.length,'-', items);
    // This is the shape in which stripe expects the data to be
    const transformedItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.picture[0]],
        },
        unit_amount: item.price * 100,
      },
      quantity: 1,
    }));

    try {
      // Create Checkout Sessions from body params
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        // shipping_address_collection: {
        //   allowed_countries: ["US", "CA", "GB"],
        // },
        line_items: transformedItems,
        payment_intent_data: {},
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/checkout`,
        metadata: {
            images: JSON.stringify(items.map((item) => item.picture[0])),
        },

      };
      
      console.log('entrcheckoutSession params create - ', params);
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      console.log('CHECKOUT SESSION ID?????? ---- ', checkoutSession);

      res.status(200).json(checkoutSession);

    } catch (err) {
      console.error("Internal server error", err);
      const errorMessage =
        err instanceof Error ? err.message : "Internal server error";
      res.status(500).json({ statusCode: 500, message: errorMessage });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}