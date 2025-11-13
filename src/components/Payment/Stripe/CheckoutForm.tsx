/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { paymentData } from "./StripeCheckout";
import { useMakeStripePaymentForPlanMutation, useMakeStripePaymentMutation, useSaveStripePaymentMutation } from "@/redux/api/payment/payment.api";
import { toast } from "sonner";
import { useGetSingleSubscriptionQuery } from "@/redux/api/publicePage/reviews.api";

const CheckoutForm = ({ paymentData }: { paymentData: paymentData }) => {
  console.log("paymentData from CheckoutForm", paymentData)
  const { data: subs } = useGetSingleSubscriptionQuery(paymentData?.id)
  console.log("subs", subs?.data?.stripePriceId)
  const stripePriceId = subs?.data?.stripePriceId;
  const [showPopup, setShowPopup] = useState(false);
  const [onboardingUrl, setOnboardingUrl] = useState<string | null>(null);
  console.log("paymentData", paymentData)
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savePayment] = useSaveStripePaymentMutation()
  const [makePayment] = useMakeStripePaymentMutation()
  const [subscriptionPayment] = useMakeStripePaymentForPlanMutation()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) return;

    // 🔥 Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement
    });

    if (error) {
      setError(error.message || "Failed to create payment method");
      return;
    }

    const payload = {
      paymentMethodId: paymentMethod.id
    }
    const res = await savePayment(payload)
    if (res?.data) {
      if (paymentData?.isSubscription) {
        // Handle subscription payment
        const pay = {
          priceId: stripePriceId,
          methodId: paymentMethod.id
        }
        const payment = await subscriptionPayment(pay)
        if (payment.error) {
          let errorMessage = "An error occurred";
          if (payment.error && 'data' in payment.error && (payment.error as any).data?.message) {
            errorMessage = (payment.error as any).data.message;
          } else if (payment.error && 'message' in payment.error && typeof (payment.error as any).message === "string") {
            errorMessage = (payment.error as any).message;
          }
          toast.error(errorMessage);
        } else {
          toast.success('Payment successful!')
        }
      } else {
        const pay = {
          orderId: paymentData.id,
          paymentMethodId: paymentMethod.id
        }
        const payment = await makePayment(pay)
        if (payment.error) {
          let errorMessage = "An error occurred";
          if (payment.error && 'data' in payment.error && (payment.error as any).data?.message) {
            errorMessage = (payment.error as any).data.message;
          } else if (payment.error && 'message' in payment.error && typeof (payment.error as any).message === "string") {
            errorMessage = (payment.error as any).message;
          }
          toast.error(errorMessage);
        } else {
          toast.success('Payment successful!')
        }
      }
    }
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "black",
        iconColor: "#FFC300",
        "::placeholder": {
          color: "#888",
        },
      },
      invalid: {
        color: "#ff4d4f",
      },
    },
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl  shadow-lg"
      >
        {error && (
          <div className="text-red-500 text-sm bg-white/70 px-3 rounded-lg">
            {error}
          </div>
        )}

        <label className="block text-sm mb-1">Card Number</label>
        <div className="p-3 border border-gray-700 rounded-lg ">
          <CardNumberElement options={elementOptions} />
        </div>

        <label className="block text-sm mb-1">Expiry Date</label>
        <div className="p-3 border border-gray-700 rounded-lg ">
          <CardExpiryElement options={elementOptions} />
        </div>

        <label className="block text-sm mb-1">CVC</label>
        <div className="p-3 border border-gray-700 rounded-lg ">
          <CardCvcElement options={elementOptions} />
        </div>

        <button
          type="submit"
          disabled={!stripe || loading}
          className={`w-full py-3 px-4 rounded-xl font-medium text-black ${loading ? "bg-gray-500" : "bg-[#FFC300] hover:bg-[#e6b000]"
            }`}
        >
          {loading ? "Processing..." : `Pay`}
        </button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg text-center">
            <h2 className="text-lg font-semibold text-red-600 mb-4">
              Stripe account is not ready to receive payouts
            </h2>
            <p className="mb-6">
              Please complete onboarding before receiving payments.
            </p>
            {onboardingUrl && (
              <a
                href={onboardingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Complete Onboarding
              </a>
            )}
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 inline-block bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
