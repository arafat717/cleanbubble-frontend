/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePaypalWebhookMutation } from "@/redux/api/payment/payment.api";

const SubscriptionSuccessPage = () => {
    const [createPaypalSuccess] = usePaypalWebhookMutation();
    const searchParams = useSearchParams();
    const paypalPlanId = searchParams.get("paypalPlanId");
    const subscription_id = searchParams.get("subscription_id");
    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    console.log("Status: ", status)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!paypalPlanId || !subscription_id) {
            setStatus("failed");
            return;
        }

        const verifySubscription = async () => {
            try {
                const res = await createPaypalSuccess({
                    event_type: "BILLING.SUBSCRIPTION.ACTIVATED",
                    resource: { id: subscription_id, plan_id: paypalPlanId },
                });
                console.log(res?.data)
                if (res?.data?.success) {
                    setStatus("success");
                } else {
                    const message =
                        (res.error && "data" in res.error && (res.error as any).data?.message) ||
                        (res.error && "message" in res.error && (res.error as any).message) ||
                        "An unknown error occurred.";
                    setErrorMessage(message);
                    setStatus("failed");
                }
            } catch (err) {
                console.error(err);
                setStatus("failed");
            }
        };

        verifySubscription();
    }, [paypalPlanId, subscription_id, createPaypalSuccess]);

    if (status === "loading")
        return <div className="flex items-center justify-center h-screen text-xl">Verifying your subscription...</div>;

    if (status === "success")
        return (
            <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <CheckCircle2 className="text-green-500 w-20 h-20 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Subscription Activated Successfully 🎉</h1>
                <p className="text-gray-600 mb-6">Thank you! Your subscription is now active.</p>
                <div className="bg-gray-100 rounded-xl p-6 w-full max-w-md text-left mb-6">
                    <p><strong>Subscription ID:</strong> {subscription_id}</p>
                    <p><strong>Status:</strong> Active</p>
                    <p><strong>Plan:</strong> Premium Plan</p>
                </div>
                <div className="flex gap-5">
                    <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={() => (window.location.href = "/dashboard")}>
                        Go to Dashboard
                    </Button>
                    <Link href="/">
                        <Button className="bg-green-500 hover:bg-green-600 text-white">Back to Home</Button>
                    </Link>
                </div>
            </div>
        );

    if (status === "failed")
        return (
            <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <XCircle className="text-red-500 w-20 h-20 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Subscription Failed ❌</h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, we couldn’t verify your subscription. Please try again or contact support.
                </p>
                {errorMessage && <p className="text-red-500 mb-6">{errorMessage}</p>}
                <div className="flex gap-5">
                    <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={() => window.location.reload()}>
                        Retry Verification
                    </Button>
                    <Button className="bg-gray-500 hover:bg-gray-600 text-white" onClick={() => (window.location.href = "/")}>
                        Back to Home
                    </Button>
                </div>
            </div>
        );

    return null;
};

export default SubscriptionSuccessPage;
