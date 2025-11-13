/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const SubscriptionDetails = ({ courseData }: { courseData: any }) => {
    console.log("courseData:", courseData)
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="px-6 py-6 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-900">Billing Details</h1>
                </div>

                {/* Subscription Title */}
                <div className="px-6 py-4">
                    <h2 className="text-base font-medium text-gray-700">Contractors Subscription</h2>
                </div>

                {/* Payment Details Section */}
                <div className="px-6 py-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-4">Payment Details</h3>

                    <div className="space-y-3">
                        {/* Course Price */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Price</span>
                            <span className="text-sm font-medium text-gray-700">€{courseData?.price}</span>
                        </div>
                        {/* Discount */}
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">
                                Discount <span className="text-xs text-gray-500">(promo)</span>
                            </span>
                            <span className="text-sm font-medium text-gray-700">€0</span>
                        </div>
                    </div>
                </div>

                {/* Total Payment Section */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">total payment</span>

                        <span className="text-base font-semibold text-gray-900">€{courseData?.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubscriptionDetails;