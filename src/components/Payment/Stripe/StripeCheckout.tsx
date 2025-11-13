/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

export type paymentData = {
  id?: string;
  amount?: number;
  type?: "coin" | "course" | "hiring" | "service" | "job";
  jobData?: any;
  isSubscription?: boolean;
};

const StripeCheckout = ({ paymentData }: { paymentData: paymentData }) => {
  if (!stripePromise) {
    return <div>Error: Stripe publishable key is missing.</div>;
  }

  return (
    <div className="p-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};

export default StripeCheckout;
