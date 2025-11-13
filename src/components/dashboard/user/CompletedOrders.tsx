/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Calendar, Clock, MapPin, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useDeletePostMutation, useGetAllCompletedPostQuery } from '@/redux/api/user/myorder.api';
import Pagination from '@/components/shared/common/Pagination';
import DateMaker from '@/utils/DateMaker';
import { RepostModal } from '@/components/shared/RepostModal';
import { toast } from 'sonner';
import Loader from '@/components/shared/Loader';

const CompletedOrders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [deleteOrder] = useDeletePostMutation();
    const { data, isLoading } = useGetAllCompletedPostQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) }
    ]);

    if (isLoading) {
        return <Loader></Loader>;
    }

    const completedData = data?.data?.data;
    const metaData = data?.data?.meta;

    const handleDelete = async (id: string) => {
        const res = await deleteOrder(id);
        if (res?.data) {
            toast.success('Order deleted successfully!');
        } else {
            toast.error("Something went wrong!");
        }
    };

    return (
        <div>
            {completedData?.length ? (
                <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5 mb-5">
                    {completedData.map((item: any) => (
                        <Card
                            key={item?.id}
                            className="w-full bg-white py-0 pb-1 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Property Image */}
                            <div className="relative h-28 sm:h-36 md:h-44 overflow-hidden">
                                <Image
                                    src={item?.photos[0]}
                                    width={1000}
                                    height={1000}
                                    alt={item?.post?.jobTitle || "Job Image"}
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
                                        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">Price</p>
                                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-900">
                                            €{item?.post?.offeredPrice}
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
                                            {item?.post?.area}, {item?.post?.city}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            Date: {DateMaker(item?.estimatedDate)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1 sm:gap-1.5">
                                        <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-green-100 rounded-full flex items-center justify-center">
                                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#14A0C1]" />
                                        </div>
                                        <span className="text-[10px] sm:text-xs md:text-sm text-gray-600">
                                            Time: {item?.estimatedTime}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {item?.paymentStatus === 'PAID' ? (
                                    <div className="flex justify-between items-center gap-2 sm:gap-3">
                                        <div className="flex-1">
                                            <RepostModal id={item?.post?.id} />
                                        </div>
                                        <button
                                            onClick={() => handleDelete(item?.id)}
                                            className="group border border-green-600 p-2 sm:p-3 rounded-full hover:bg-[#319E60] hover:text-white cursor-pointer"
                                        >
                                            <Trash2 className="text-green-600 group-hover:text-white" />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <Link href={`/dashboard/user/my-order/complete-order/${item?.id}`} className='w-full'>
                                            <Button className="flex-1 w-full border bg-[#319E60] hover:bg-[#115e32] cursor-pointer text-white rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-medium">
                                                Make Payment
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div>NO COMPLETED JOB POST YET</div>
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

export default CompletedOrders;
