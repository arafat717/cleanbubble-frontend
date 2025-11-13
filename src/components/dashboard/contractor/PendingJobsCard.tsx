/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetAllAcceptedPostQuery } from "@/redux/api/user/myorder.api";
import Pagination from "@/components/shared/common/Pagination";
import DateMaker from "@/utils/DateMaker";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const PendingJobsCard = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllAcceptedPostQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) },
    ]);

    if (isLoading) return <Loader></Loader>;

    const pendingData = data?.data?.data;
    const metaData = data?.data?.meta;

    console.log(pendingData)

    return (
        <div>
            {pendingData?.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    {pendingData.map((item: any, index: any) => (
                        <Card
                            key={index}
                            className="w-full py-0 pb-1 bg-white rounded-2xl overflow-hidden shadow-md"
                        >
                            {/* Property Image */}
                            <div className="relative h-[120px] sm:h-[150px] md:h-[200px] overflow-hidden">
                                <Image
                                    src={item?.photos[0]}
                                    width={600}
                                    height={400}
                                    alt={item?.post?.jobTitle || "Job Image"}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                                {/* Title and Price */}
                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                    <h2 className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900">
                                        {item?.post?.jobTitle}
                                    </h2>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
                                            {t("pendingJobsCard.price")}
                                        </p>
                                        <p className="text-xs sm:text-sm md:text-xl font-bold text-gray-900">
                                            €{item?.post?.offeredPrice
                                            }
                                        </p>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-sm text-gray-600">
                                            {item?.post?.area}, {item?.post?.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-sm text-gray-600">
                                            {t("pendingJobsCard.date")}: {DateMaker(item?.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-sm text-gray-600">
                                            {t("pendingJobsCard.time")}: {item?.post?.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex w-full">
                                    <Link
                                        href={`/dashboard/user/my-order/progress-order/${item?.id}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-[#319E60] text-white hover:bg-[#25814d] rounded-full py-1.5 sm:py-2 text-[10px] sm:text-sm font-medium">
                                            {t("pendingJobsCard.updateProgress")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>{t("pendingJobsCard.noPendingJob")}</div>
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

export default PendingJobsCard;
