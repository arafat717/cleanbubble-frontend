"use client"
import { FileText } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import JobPosterReview from './Report/JobPosterReview';
import ContractorReview from './Report/ContractorReview';
import JobPosterReport from './Report/JobPosterReport';
import ContractorReport from './Report/ContractorReport';

const ReviewReportTranslated = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState<"poster" | "contractor" | 'job' | 'report'>("poster");

    return (
        <div className='px-2 md:px-10'>
            <div className="flex items-center gap-3 mb-8">
                <div className="rounded-lg">
                    <FileText className="w-[54px] h-[54px] text-foreground" />
                </div>
                <h1 className="text-[40px] font-[500] text-[#17171A]">{t('reviewReport.header')}</h1>
            </div>

            <div className="flex gap-6 border-b border-gray-200">
                <h1
                    className={`cursor-pointer pb-2 ${active === "poster"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("poster")}
                >
                    {t('reviewReport.jobPosterReviews')}
                </h1>
                <h1
                    className={`cursor-pointer pb-2 ${active === "contractor"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("contractor")}
                >
                    {t('reviewReport.contractorReviews')}
                </h1>
                <h1
                    className={`cursor-pointer pb-2 ${active === "job"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("job")}
                >
                    {t('reviewReport.jobReports')}
                </h1>
                <h1
                    className={`cursor-pointer pb-2 ${active === "report"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("report")}
                >
                    {t('reviewReport.contractorReports')}
                </h1>
            </div>

            <div className="mt-10">
                {active === "poster" && <JobPosterReview />}
                {active === "contractor" && <ContractorReview />}
                {active === "job" && <JobPosterReport />}
                {active === "report" && <ContractorReport />}
            </div>
        </div>
    );
};

export default ReviewReportTranslated;
