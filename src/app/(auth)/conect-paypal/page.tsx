"use client";

import { useCreatePaypalAccountMutation } from "@/redux/api/payment/payment.api";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormValues = {
    email: string;
};

const EmailForm = () => {
    const router = useRouter()
    const [createPaypalAccount] = useCreatePaypalAccountMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const payload = {
            paypalEmail: data?.email
        }
        const res = await createPaypalAccount(payload)
        if (res?.data) {
            toast.success('PayPal account connected successfully')
            reset();
            router.push('/')
        } else {
            const errorMessage =
                (res.error as { data?: { message?: string } })?.data?.message ||
                (res.error as { message?: string })?.message
            toast.error(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
            >
                <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
                    Enter Your Paypal Email
                </h2>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })}
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full cursor-pointer bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default EmailForm;
