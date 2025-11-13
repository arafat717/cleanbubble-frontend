/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetAllContractorOffersQuery } from "@/redux/api/user/myorder.api";
import Pagination from "@/components/shared/common/Pagination";
import DateMaker from "@/utils/DateMaker";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const PendingOffers = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllContractorOffersQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) },
    ]);

    const handleClick = (id: string) => {
        window.location.href = (`/dashboard/contractor/my-jobs/view-my-offers/${id}`);
    };


    if (isLoading) return <Loader></Loader>;

    const pendingData = data?.data?.data;
    const metaData = data?.data?.meta;

    return (
        <div>
            {pendingData?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
                    {pendingData.map((item: any, index: any) => (
                        <Card key={index} className="w-full py-0 pb-1 bg-white rounded-2xl overflow-hidden shadow-md">
                            {/* Property Image */}
                            <div className="relative h-[140px] sm:h-[180px] md:h-[220px] overflow-hidden -mt-3">
                                <Image
                                    src={item?.post?.thumbnail}
                                    width={1000}
                                    height={1000}
                                    alt={item?.post?.jobTitle || "Job Image"}
                                    className="w-full h-full object-cover rounded-2xl p-1"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="px-3 sm:px-4 py-2">
                                {/* Title and Price */}
                                <div className="flex items-start justify-between mb-1 sm:mb-2">
                                    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900">
                                        {item?.post?.jobTitle}
                                    </h2>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">{t("pendingOffers.price")}</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">€{item?.post?.price}</p>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-1 sm:space-y-2 mb-2 sm:mb-3">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-600">
                                            {item?.post?.area} , {item?.post?.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-600">
                                            {t("pendingOffers.date")}: {DateMaker(item?.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs text-gray-600">
                                            {t("pendingOffers.time")}: {item?.post?.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-1 sm:gap-2 w-full">
                                    <Button onClick={() => handleClick(item?.postId)} className="flex-1 w-full border border-[#319E60] hover:text-white hover:bg-[#115e32] bg-inherit cursor-pointer text-[#319E60] rounded-full py-1 sm:py-2 text-[10px] sm:text-sm md:text-base font-medium">
                                        {t("pendingOffers.viewOffers")}
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="text-center py-6">{t("pendingOffers.noPendingJobs")}</div>
            )}
            {metaData?.total > 8 && (
                <Pagination
                    currentPage={metaData?.page}
                    totalItem={metaData?.total}
                    limit={8}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default PendingOffers;
