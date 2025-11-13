/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useCreateStripeAccountMutation } from "@/redux/api/payment/payment.api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ContractorPaymentPage() {
    const router = useRouter()
    const [createStripe] = useCreateStripeAccountMutation()
    const handleCreateStripe = async () => {
        try {
            const res = await createStripe(undefined);
            console.log(res);

            if (res?.data) {
                const onboardingUrl = res.data?.data?.onboardingUrl;

                if (onboardingUrl) {
                    // ✅ Redirect to Stripe onboarding page
                    window.location.href = onboardingUrl;
                } else {
                    toast.error("Onboarding URL not found");
                }
            } else {
                toast.error(
                    (res?.error && 'data' in res.error && (res.error as any).data?.message) ||
                    (res?.error && 'message' in res.error ? (res.error as { message: string }).message : undefined)
                )
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        }
    };

    const handlePaypalConect = () => {
        router.push('/conect-paypal')
    }

    return (
        <div className="max-h-screen">
            {/* Right Side Form */}
            <div className="flex items-center justify-center flex-1">
                <div className="min-h-screen flex items-center justify-center p-4 w-full">
                    <Card className="w-full max-w-md mx-auto">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-center text-green-600 font-medium">
                                Connect Payment Method
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* PayPal Button */}
                            <Button
                                onClick={handlePaypalConect}
                                variant="outline"
                                className="w-full h-12 cursor-pointer justify-between px-4 hover:bg-gray-50 bg-transparent"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">P</span>
                                    </div>
                                    <span className="text-gray-900 font-medium">
                                        Connect PayPal
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Button>

                            {/* Stripe Button */}
                            <Button
                                variant="outline"
                                onClick={handleCreateStripe}
                                className="w-full h-12 cursor-pointer justify-between px-4 hover:bg-gray-50 bg-transparent"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center">
                                        <span className="text-blue-600 font-semibold text-lg">
                                            stripe
                                        </span>
                                    </div>
                                    <span className="text-gray-900 font-medium ml-1">
                                        Connect Stripe
                                    </span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400" />
                            </Button>

                            {/* Skip Option */}
                            <div className="text-center mt-4">
                                <Link href={'/'}><button
                                    className="text-sm cursor-pointer text-gray-500 hover:text-green-600 transition"
                                >
                                    Skip for now →
                                </button></Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>

    );
}
