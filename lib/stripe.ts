import Stripe from "stripe";
import 'dotenv/config';

const stripeApiKey = process.env.STRIPE_API_SECRET_KEY || 'default_key';

export const stripe = new Stripe(stripeApiKey, {
  apiVersion: "2024-06-20",
  typescript: true,
});
