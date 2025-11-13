/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllPostersOffersQuery } from '@/redux/api/user/myorder.api';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from 'react';
import Pagination from '@/components/shared/common/Pagination';
import DateMaker from '@/utils/DateMaker';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/shared/Loader';

const OffersCard = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetAllPostersOffersQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) },
    ]);

    if (isLoading) {
        return <Loader></Loader>;
    }

    const pendingData = data?.data?.data;
    const metaData = data?.data?.meta;

    return (
        <div>
            {pendingData?.length ? (
                <div className='grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5 mb-5'>
                    {pendingData.map((item: any, index: any) => (
                        <Card key={index} className="w-full py-0 pb-2 bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                            {/* Property Image */}
                            <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden">
                                <Image
                                    src={item?.post?.thumbnail}
                                    width={1000}
                                    height={1000}
                                    alt={item?.post?.jobTitle || t('postOffers.job')}
                                    className="w-full h-full object-cover rounded-t-2xl"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="px-2 sm:px-3 py-2 sm:py-3">
                                {/* Title and Price */}
                                <div className="flex items-start justify-between mb-1.5 sm:mb-2.5">
                                    <h2 className="text-xs sm:text-sm md:text-base font-semibold text-gray-900 line-clamp-1">
                                        {item?.post?.jobTitle}
                                    </h2>
                                    <div className="text-right">
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">{t('postOffers.price')}</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">€{item?.post?.price}</p>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-1 sm:space-y-1.5 mb-2 sm:mb-3">
                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600 line-clamp-1">{item?.post?.area} , {item?.post?.city}</span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            {t('postOffers.date')} : {DateMaker(item?.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            {t('postOffers.time')} : {item?.post?.time}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex">
                                    {item?.progressStatus === 'CONFIRMED' ? (
                                        <Button className="flex-1 w-full border border-[#319E60] hover:text-white hover:bg-[#319E60] text-white bg-[#319E60] cursor-pointer rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                                            {t('postOffers.trackProgress')}
                                        </Button>
                                    ) : (
                                        <Link href={`/dashboard/user/my-order/pending-order/${item?.postId}`} className="w-full">
                                            <Button className="flex-1 border border-[#319E60] hover:text-white hover:bg-[#115e32] bg-inherit cursor-pointer text-[#319E60] rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                                                {t('postOffers.viewOffers')}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div><h1>{t('postOffers.noOfferJobYet')}</h1></div>
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

export default OffersCard;
