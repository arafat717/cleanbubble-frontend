/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useGetContractorReportQuery } from '@/redux/api/admin/repost.api';
import Link from 'next/link';
import Pagination from '@/components/shared/common/Pagination';
import { useTranslation } from 'react-i18next';
import Loader from '@/components/shared/Loader';

const ContractorReport = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useGetContractorReportQuery([
        { name: "limit", value: 10 },
        { name: "page", value: String(currentPage) },
    ]);

    if (isLoading) return <Loader></Loader>;

    const users = data?.data?.data;
    const metaData = data?.data?.meta;

    return (
        <div className="max-w-6xl space-y-4">
            {users?.length ? (
                users.map((user: any) => (
                    <Card key={user.id} className="p-6 bg-white shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between gap-6">
                            <div>
                                <Avatar className="w-12 h-12">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                                        {user.initials}
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="flex items-start space-x-2 flex-1">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-[500] text-[20px] text-[#17171A] mb-1">
                                        {user?.reporter?.fullName}
                                    </h3>
                                    <h3 className="font-[500] text-[14px] text-[#17171A] mb-1">
                                        {user?.reported?.fullName}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm font-[400] text-[#17171A]">
                                            <span>{t('contractorReport.review')} : </span>{user?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {user?.reported?.status === "BLOCKED" && (
                                    <h1 className='bg-red-100 border text-[14px] border-red-400 px-2 py-1 rounded-3xl'>
                                        {user?.reported?.status}
                                    </h1>
                                )}
                            </div>

                            <div className="flex space-x-3 ml-6">
                                <Link href={`/dashboard/admin/reviews/Job-poster-report/${user?.id}`}>
                                    <Button
                                        className="border border-[#319E60] text-[#319E60] bg-inherit cursor-pointer hover:bg-[#319E60] hover:text-[#FFF] px-[22px] py-5 rounded-[40px] font-[500] text-[18px]"
                                    >
                                        {t('contractorReport.viewDetails')}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </Card>
                ))
            ) : (
                <div><h1>{t('contractorReport.noData')}</h1></div>
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

export default ContractorReport;
