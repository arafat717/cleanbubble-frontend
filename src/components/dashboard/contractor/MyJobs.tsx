'use client'

import { useState } from "react";
import PendingJobsCard from "./PendingJobsCard";
import CompletedJobsCard from "./CompletedJobsCard";
import PendingOffers from "./PendingOffers";
import { useTranslation } from "react-i18next";

const MyJobs = () => {
    const [active, setActive] = useState<"all" | "pending" | 'offer'>('offer');
    const { t } = useTranslation();

    return (
        <div className="px-1 sm:px-4 md:px-10 py-5">
            {/* Tabs */}
            <div className="flex gap-4 sm:gap-6 border-b border-gray-200 overflow-x-auto scrollbar-hide">
                <h1
                    className={`flex-shrink-0 cursor-pointer pb-2 ${active === "offer"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("offer")}
                >
                    {t("myJobs.allOffers")}
                </h1>
                <h1
                    className={`flex-shrink-0 cursor-pointer pb-2 ${active === "all"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("all")}
                >
                    {t("myJobs.pendingJobs")}
                </h1>
                <h1
                    className={`flex-shrink-0 cursor-pointer pb-2 ${active === "pending"
                        ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                        : "text-gray-600"
                        }`}
                    onClick={() => setActive("pending")}
                >
                    {t("myJobs.completedJobs")}
                </h1>
            </div>

            {/* Content */}
            <div className="mt-6 sm:mt-8 md:mt-10">
                {active === "offer" && <PendingOffers />}
                {active === "all" && <PendingJobsCard />}
                {active === "pending" && <CompletedJobsCard />}
            </div>
        </div>
    );
};

export default MyJobs;
