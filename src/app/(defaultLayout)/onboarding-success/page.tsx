import Link from "next/link";
import React from "react";

const StripeSuccessPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
                <h1 className="text-2xl font-bold text-green-600 mb-4">
                    🎉 Stripe Account Created!
                </h1>
                <p className="text-gray-600 mb-6">
                    Your Stripe account has been created successfully.
                </p>
                <Link
                    href="/"
                    className="inline-block px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default StripeSuccessPage;
