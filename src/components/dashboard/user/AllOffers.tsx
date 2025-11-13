/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import { useGetAllpostQuery } from "@/redux/api/user/myorder.api";
import Pagination from "@/components/shared/common/Pagination";
import DateMaker from "@/utils/DateMaker";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const AllJobs = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllpostQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) },
    ]);

    if (isLoading) {
        return <Loader></Loader>;
    }

    const alljobsData = data?.data?.data;
    const metaData = data?.data?.meta;

    return (
        <div>
            {alljobsData?.length ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5">
                    {alljobsData?.map((item: any) => (
                        <Card
                            key={item?.id}
                            className="w-full bg-white py-0 pb-1 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Property Image */}
                            <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden">
                                <Image
                                    src={item.photos[0]}
                                    width={1000}
                                    height={1000}
                                    alt={t("myOrderCard.jobImageAlt")}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="px-2 sm:px-3 py-2 sm:py-3">
                                {/* Title and Price */}
                                <div className="flex items-start justify-between mb-1.5 sm:mb-2.5">
                                    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-1">
                                        {item?.jobTitle}
                                    </h2>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
                                            {t("myOrderCard.price")}
                                        </p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                            €{item?.price}
                                        </p>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 line-clamp-1">
                                            {item?.area}, {item?.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            {t("myOrderCard.date")}: {DateMaker(item?.date)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            {t("myOrderCard.time")}: {item?.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex">
                                    <Link
                                        href={`/dashboard/user/my-order/${item?.id}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-[#319E60] hover:bg-[#115e32] text-white rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium flex items-center justify-center">
                                            <CiEdit className="mr-1" /> {t("myOrderCard.edit")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>{t("myOrderCard.noJobs")}</div>
            )}

            {/* Pagination */}
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

export default AllJobs;
