/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Cancel = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [status, setStatus] = useState<"loading" | "cancelled" | "failed">("loading");

    useEffect(() => {
        if (!orderId) {
            setStatus("failed");
            return;
        }

        // Fake timeout to mimic verification (you can skip this if unnecessary)
        setTimeout(() => {
            setStatus("cancelled");
        }, 1000);
    }, [orderId]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Checking your payment status...
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
            <XCircle className="text-red-500 w-20 h-20 mb-4" />

            <h1 className="text-3xl font-bold mb-2 text-red-600">
                Payment Cancelled
            </h1>

            <p className="text-gray-600 mb-6 max-w-md">
                Your payment was cancelled. Don’t worry, no money was deducted from your
                account. You can try again or return to your dashboard.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 w-full max-w-md text-left mb-6">
                <p>
                    <strong>Order ID:</strong> {orderId || "N/A"}
                </p>
                <p>
                    <strong>Status:</strong> Cancelled
                </p>
            </div>

            <div className="flex gap-4">
                <Button
                    variant="outline"
                    onClick={() => (window.location.href = "/dashboard/user/my-order")}
                >
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default Cancel;
