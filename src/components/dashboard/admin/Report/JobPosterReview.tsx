/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { useApproveReviewMutation, useGetAllCustomerPendingReviewsQuery, useRejectReviewMutation } from '@/redux/api/publicePage/reviews.api';
import { toast } from 'sonner';
import Pagination from '@/components/shared/common/Pagination';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/shared/Loader';

const JobPosterReview = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useGetAllCustomerPendingReviewsQuery([
        { name: "limit", value: 10 },
        { name: "page", value: String(currentPage) }
    ]);

    const [approveReview] = useApproveReviewMutation();
    const [rejectReview] = useRejectReviewMutation();

    if (isLoading) return <Loader></Loader>;

    const customerReviews = data?.data?.data;
    const metaData = data?.data?.meta;

    const handleApprove = async (id: any) => {
        const res = await approveReview(id);
        if (res?.data) toast.success(t('jobPosterReview.approveSuccess'));
        else toast.error(t('jobPosterReview.error'));
    };

    const handleReject = async (id: any) => {
        const res = await rejectReview(id);
        if (res?.data) toast.success(t('jobPosterReview.rejectSuccess'));
        else toast.error(t('jobPosterReview.error'));
    };

    const renderStars = (rating: any) =>
        Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
            />
        ));

    return (
        <div className="max-w-6xl space-y-4">
            {customerReviews?.length ? (
                customerReviews.map((user: any) => (
                    <Card key={user.id} className="p-6 bg-white shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={user?.reviewer?.profileImage} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                        {user.initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="flex items-start space-x-2 flex-1">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-[500] text-[20px] text-[#17171A] mb-1">
                                        {user?.reviewer?.fullName}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-[400] text-[#17171A]">{t('jobPosterReview.rating')}</span>
                                        <div className="flex space-x-1">{renderStars(user?.rating)}</div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-[400] text-[#17171A]">
                                            <span>{t('jobPosterReview.review')} : </span>{user.comment}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex space-x-3 ml-6">
                                <Button
                                    onClick={() => handleApprove(user?.id)}
                                    className="bg-[#319E60] cursor-pointer hover:bg-green-700 text-[#FFF] px-[22px] py-5 rounded-[40px] font-[500] text-[18px]"
                                >
                                    {t('jobPosterReview.approve')}
                                </Button>
                                <Button
                                    onClick={() => handleReject(user?.id)}
                                    variant="outline"
                                    className="border-gray-300 text-gray-700 hover:bg-gray-50 px-[22px] py-5 rounded-[40px] font-[500] text-[18px] cursor-pointer"
                                >
                                    {t('jobPosterReview.decline')}
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <div>
                    <h1>{t('jobPosterReview.noPending')}</h1>
                </div>
            )}

            {metaData?.total > 10 && (
                <Pagination
                    currentPage={metaData?.page}
                    totalItem={metaData?.total}
                    limit={10}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default JobPosterReview;
