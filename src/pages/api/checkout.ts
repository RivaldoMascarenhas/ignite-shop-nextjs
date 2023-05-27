import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const priceId = "price_1N8oLQD9YIF8vactadX7d1NI";
  const successUrl = `${process.env.NEXT_URL}/sucess`;
  const cancel_url = `${process.env.NEXT_URL}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancel_url,
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });
  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
