/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, DollarSign } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/authApi";
import PaymentDetails from "@/components/home/PaymentDetails";
import { useTrackProgressQuery } from "@/redux/api/admin/repost.api";
import StripeCheckout from "@/components/Payment/Stripe/StripeCheckout";
import { toast } from "sonner";
import { useMakePaypalPaymentMutation } from "@/redux/api/payment/payment.api";

const BillingCheckout = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [makePaypalPyament] = useMakePaypalPaymentMutation()

  const { paymentId } = useParams();
  const { data } = useTrackProgressQuery(paymentId)
  const orderData = data?.data;
  const { data: userdata } = useGetMeQuery('')

  const user = userdata?.data;

  const handlePaypalPay = async () => {
    try {
      const res = await makePaypalPyament({
        orderId: paymentId,
      }).unwrap();
      if (res?.data) {
        window.location.href = res.data?.approvalUrl;
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to proceed");
    }
  };

  return (
    <div className="min-h-full p-6 pt-20">
      <div className="max-w-5xl mx-auto min-h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Billing Details */}
          <PaymentDetails courseData={orderData} />
          {/* Payment Information */}
          <div className="space-y-6">
            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Information</h3>
              {/* Payment Method Selection */}
              <div className="flex space-x-2">
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex items-center space-x-2 ${paymentMethod === "card"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Strip</span>
                </Button>
                <Button
                  variant={paymentMethod === "paypal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPaymentMethod("paypal")}
                  className={`flex items-center space-x-2 ${paymentMethod === "paypal"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                    }`}
                >
                  <DollarSign className="w-4 h-4" />
                  <span>PayPal</span>
                </Button>
              </div>
              {user ? (
                <div className="">
                  {paymentMethod === "card" && (
                    <StripeCheckout
                      paymentData={{
                        id: orderData?.id
                      }}
                    />
                  )}

                  {/* PayPal Option */}
                  {paymentMethod === "paypal" && (
                    <Card className="bg-gray-900 border-gray-700">
                      <CardContent className="p-6 text-center space-y-3">
                        <p className="text-gray-300">
                          You will be redirected to PayPal to complete your
                          payment.
                        </p>
                        <button
                          onClick={handlePaypalPay}
                          className="bg-[#FFC300] px-4 py-2 rounded-lg cursor-pointer"
                        >
                          Proceed
                        </button>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ) : (
                <Link
                  href={"/login"}
                  className="bg-yellow-500/20 rounded-sm text-gray-100 px-3 py-2 cursor-pointer"
                >
                  You have to Login fro purchase
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCheckout;
