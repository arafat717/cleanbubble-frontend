"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";

export default function PaymentCheckModal() {
    const { data: user } = useGetMeQuery('');
    const [open, setOpen] = useState(false);
    console.log('user info:', user?.data)
    const router = useRouter()


    const handleModal = () => {
        router.push("/contractor-payment")
        setOpen(false)
    }

    useEffect(() => {
        if (!user) return;
        if (user?.data.role === "ADMIN") return
        // ✅ Show modal only if neither payment method is connected
        const noPaymentConnected =
            !user?.data?.stripeAccountId && !user?.data?.paypalAccountId;

        if (noPaymentConnected) {
            // Show immediately
            setOpen(true);

            // Re-show every 3 minutes
            const interval = setInterval(() => {
                setOpen(true);
            }, 3 * 60 * 1000);

            return () => clearInterval(interval);
        }
    }, [user]);

    // ✅ If user exists and has at least one payment method → hide modal
    if (user && (user?.data?.stripeAccountId || user?.data?.paypalAccountId)) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-center text-green-600">
                        Connect Your Payment Method
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-3">
                    <p className="text-center text-gray-500">
                        You need to connect your payment method to continue using all features.
                    </p>
                    <div className="flex flex-col gap-2">
                        <Button onClick={handleModal} className="w-full cursor-pointer">
                            Connect Now
                        </Button>
                        <Button variant="ghost" onClick={() => setOpen(false)}>
                            Skip for now
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
