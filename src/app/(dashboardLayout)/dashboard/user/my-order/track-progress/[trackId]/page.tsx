'use client'
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTrackProgressQuery } from '@/redux/api/admin/repost.api';
import Loader from '@/components/shared/Loader';
import Link from 'next/link';
import { FaCheck } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

const TrackProgress = () => {
    const id = useParams().trackId;
    const { t } = useTranslation();
    const { data, isLoading } = useTrackProgressQuery(id);

    if (isLoading) {
        return <Loader />;
    }

    const orderData = data?.data;

    // Progress steps configuration
    const progressSteps = [
        { key: 'CONFIRMED', label: t('trackProgressReview.orderConfirmed') },
        { key: 'IN_PROCESS', label: t('trackProgressReview.inProcess') },
        { key: 'EMPLOYEE_ASSIGNED', label: t('trackProgressReview.employeeAssigned') },
        { key: 'ARRIVED', label: t('trackProgressReview.arrived') },
        { key: 'COMPLETED', label: t('trackProgressReview.completed') }
    ];

    // Get current step index
    const getCurrentStepIndex = (status: any) => progressSteps.findIndex(step => step.key === status);
    const currentStepIndex = getCurrentStepIndex(orderData?.progressStatus);

    // Format date
    const formatDate = (dateString: any) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().slice(-2);
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-white">
                {/* Header */}
                <div className="flex items-center px-4 py-4 border-b border-gray-100">
                    <Link href={`/dashboard/user/my-order`}>
                        <ArrowLeft className="w-6 h-6 text-gray-700 mr-3 cursor-pointer" />
                    </Link>
                    <h1 className="text-lg font-medium text-gray-900">
                        {t('trackProgressReview.trackProgress')}
                    </h1>
                </div>

                {/* Content */}
                <div className="px-4 py-6">
                    {/* Job Title */}
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                        {orderData?.post?.jobTitle}
                    </h2>

                    {/* Job Details */}
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">{t('trackProgressReview.estimatedDate')}:</span>
                            <span className="text-gray-600">{formatDate(orderData?.estimatedDate)}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">{t('trackProgressReview.estimatedTime')}:</span>
                            <span className="text-gray-600">{orderData?.estimatedTime}</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <span className="font-medium text-gray-700 w-32">{t('trackProgressReview.contractor')}:</span>
                            <span className="text-gray-600">{orderData?.contractor?.fullName}</span>
                        </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mb-8">
                        <h3 className="text-base font-medium text-gray-900 mb-6">{t('trackProgressReview.trackProgress')}</h3>

                        {/* Progress Steps */}
                        <div className="relative">
                            {/* Progress Line */}
                            <div className="absolute top-5 left-5 w-full h-0.5 bg-gray-200">
                                <div
                                    className="h-full bg-green-500 transition-all duration-500"
                                    style={{
                                        width: currentStepIndex >= 0
                                            ? `${(currentStepIndex / (progressSteps.length - 1)) * 100}%`
                                            : '0%'
                                    }}
                                />
                            </div>

                            {/* Steps */}
                            <div className="flex justify-between items-start relative">
                                {progressSteps.map((step, index) => {
                                    const isCompleted = index <= currentStepIndex;
                                    return (
                                        <div key={step.key} className="flex flex-col items-center">
                                            {/* Circle */}
                                            <div className={`
                                                w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300
                                                ${isCompleted
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-white border-2 border-gray-200 text-gray-400'
                                                }
                                            `}>
                                                {isCompleted ? <FaCheck className="w-5 h-5" fill="currentColor" /> : <span className="text-sm font-medium">{index + 1}</span>}
                                            </div>

                                            {/* Label */}
                                            <div className="text-center mt-3 max-w-16">
                                                <span className={`text-xs leading-tight font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {step.label}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    {orderData?.progressStatus === 'COMPLETED' && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center">
                                <FaCheck className="w-5 h-5 text-green-600 mr-2" />
                                <span className="text-green-800 font-medium">{t('trackProgressReview.serviceCompleted')}</span>
                            </div>
                            <p className="text-green-700 text-sm mt-1">
                                {t('trackProgressReview.yourServiceCompleted', { jobTitle: orderData.post.jobTitle.toLowerCase(), contractor: orderData.contractor.fullName })}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TrackProgress;
