import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import service1 from "@/assets/home/service1.png";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PendingOrderCard = () => {
    return (
        <div>
            <Card className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-lg">
                {/* Property Image */}
                <div className="relative h-full overflow-hidden -mt-6">
                    <Image
                        src={service1.src}
                        width={1000}
                        height={1000}
                        alt="2 Bedroom Flat - Modern apartment with arched ceilings"
                        className="w-full h-full object-cover rounded-3xl p-2"
                    />
                </div>

                {/* Card Content */}
                <div className="px-4 sm:px-6">
                    {/* Title and Price */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            2 Bedroom Flat
                        </h2>
                        <div className="text-right">
                            <p className="text-xs sm:text-sm text-gray-500 mb-1">Price</p>
                            <p className="text-lg sm:text-2xl font-bold text-gray-900">€80</p>
                        </div>
                    </div>

                    {/* Property Details */}
                    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14A0C1]" />
                            </div>
                            <span className="text-sm sm:text-base text-gray-600">Berlin</span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14A0C1]" />
                            </div>
                            <span className="text-sm sm:text-base text-gray-600">
                                Date : 12 July, 2025
                            </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#14A0C1]" />
                            </div>
                            <span className="text-sm sm:text-base text-gray-600">
                                Time : 2:30 AM
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Link href={`/dashboard/user/my-order/pending-order/${41}`}>
                            <Button className="flex-1 border border-[#319E60] hover:text-white hover:bg-[#115e32] bg-inherit cursor-pointer text-[#319E60] rounded-full py-2 sm:py-3 text-sm sm:text-base font-medium">
                                View Offers
                            </Button>
                        </Link>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default PendingOrderCard;
