
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useHandlePaypalSuccessMutation } from "@/redux/api/payment/payment.api";

const Success = () => {
    const [createPaypalSuccess] = useHandlePaypalSuccessMutation();
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const paymentId = searchParams.get("paymentId");
    const payerId = searchParams.get("PayerID");

    const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [paymentInfo, setPaymentInfo] = useState<any>(null);
    console.log(errorMessage)

    useEffect(() => {
        if (!payerId || !paymentId || !orderId) {
            setStatus("failed");
            return;
        }
        const verifyPayment = async () => {
            try {
                const res = await createPaypalSuccess({
                    orderId,
                    paymentId,
                    payerId,
                });

                const data = res?.data;
                if (data?.success) {
                    setPaymentInfo(data.payment);
                    setStatus("success");
                } else {
                    setErrorMessage(
                        (res.error && 'data' in res.error && (res.error as any).data?.message) ||
                        (res.error && 'message' in res.error && (res.error as any).message) ||
                        "An unknown error occurred."
                    );
                    setStatus("failed");
                }
            } catch (err) {
                console.error(err);
                setStatus("failed");
            }
        };

        verifyPayment();
    }, [orderId, paymentId, payerId, createPaypalSuccess]);

    // === LOADING STATE ===
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Verifying your payment...
            </div>
        );
    }

    // === SUCCESS STATE ===
    if (status === "success") {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <CheckCircle2 className="text-green-500 w-20 h-20 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Payment Successful for payment🎉</h1>
                <p className="text-gray-600 mb-6">
                    Thank you! Your payment has been processed successfully.
                </p>

                <div className="bg-gray-100 rounded-xl p-6 w-full max-w-md text-left mb-6">
                    <p><strong>Order ID:</strong> {paymentInfo?.id || orderId}</p>
                    <p><strong>Amount:</strong> {paymentInfo?.amount || "N/A"}</p>
                    <p><strong>Status:</strong> {paymentInfo?.status || "Approved"}</p>
                </div>

                <div className="flex gap-5">
                    <Button
                        className="bg-green-500 hover:bg-green-500 cursor-pointer text-black"
                        onClick={() => (window.location.href = "/dashboard/user/my-order")}
                    >
                        Go to Dashboard
                    </Button>
                    <Link href={`/dashboard/contractor/my-jobs/give-review/${orderId}`}>
                        <Button className="bg-green-500 hover:bg-green-500 cursor-pointer text-black">
                            Give a Review
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    // === FAILED STATE ===
    if (status === "failed") {
        return (
            <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <XCircle className="text-red-500 w-20 h-20 mb-4" />
                <h1 className="text-3xl font-bold mb-2">Payment Failed ❌</h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment could not be verified. Please try again or contact support.
                </p>
                {errorMessage && (
                    <p className="text-red-500 mb-6">{errorMessage}</p>
                )}
                <div className="flex gap-5">
                    <Button
                        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white"
                        onClick={() => window.location.reload()}
                    >
                        Retry Verification
                    </Button>
                    <Button
                        className="bg-gray-500 hover:bg-gray-600 cursor-pointer text-white"
                        onClick={() => (window.location.href = "/dashboard/user/my-order")}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return null;
};

export default Success;
