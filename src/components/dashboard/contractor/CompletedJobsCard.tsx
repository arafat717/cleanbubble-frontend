/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Pagination from "@/components/shared/common/Pagination";
import { useGetAllCompletedPostQuery } from "@/redux/api/user/myorder.api";
import DateMaker from "@/utils/DateMaker";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const CompletedJobsCard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();

    const { data, isLoading } = useGetAllCompletedPostQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) }
    ]);

    if (isLoading) return <Loader></Loader>;

    const completedData = data?.data?.data;
    const metaData = data?.data?.meta;

    return (
        <div>
            {completedData?.length ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    {completedData.map((item: any, index: any) => (
                        <Card
                            key={index}
                            className="w-full py-0 pb-1 bg-white rounded-2xl overflow-hidden shadow-md"
                        >
                            {/* Job Image */}
                            <div className="relative h-[160px] sm:h-[220px] overflow-hidden">
                                <Image
                                    src={item?.photos[0]}
                                    width={1000}
                                    height={1000}
                                    alt={item?.post?.jobTitle}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                            </div>

                            {/* Content */}
                            <div className="px-3 sm:px-5 py-3 sm:py-4">
                                {/* Title + Price */}
                                <div className="flex items-start justify-between mb-2 sm:mb-4">
                                    <h2 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                                        {item?.post?.jobTitle}
                                    </h2>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-1">
                                            {t("jobs.price")}
                                        </p>
                                        <p className="text-sm sm:text-xl font-bold text-gray-900">
                                            €{item?.post?.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Job Info */}
                                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-5">
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-600 truncate">
                                            {item?.post?.area}, {item?.post?.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {t("jobs.date")}: {DateMaker(item?.estimatedDate)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-xs sm:text-sm text-gray-600">
                                            {t("jobs.time")}: {item?.estimatedTime}
                                        </span>
                                    </div>
                                </div>

                                {/* Action */}
                                <Link
                                    href={`/dashboard/contractor/my-jobs/give-review/${item?.id}`}
                                    className="w-full"
                                >
                                    <Button className="w-full bg-[#319E60] hover:bg-[#115e32] cursor-pointer text-white rounded-full py-2 sm:py-3 text-xs sm:text-base font-medium flex items-center justify-center">
                                        {t("jobs.giveReview")}
                                    </Button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>{t("jobs.noCompletedJobs")}</div>
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

export default CompletedJobsCard;
