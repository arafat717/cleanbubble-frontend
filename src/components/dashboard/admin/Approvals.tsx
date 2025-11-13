"use client"

import { BadgeCheck } from "lucide-react"
import { useState } from "react"
import PosterRequest from "./PosterRequest"
import ContractorRequest from "./ContractorRequest"
import JobRequest from "./JobRequest"
import { useTranslation } from "react-i18next"

export default function ApprovalsPage() {
    const [active, setActive] = useState("poster")
    const { t } = useTranslation()

    return (
        <div className="min-h-screen">
            <div className="px-10 max-w-6xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg shadow-sm">
                            <BadgeCheck className="h-[54px] w-[54px]" />
                        </div>
                        <h1 className="text-[40px] font-[500px] text-[#17171A]">
                            {t("approvalsPage.title")}
                        </h1>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 border-b border-gray-200">
                    <h1
                        className={`cursor-pointer pb-2 ${active === "poster"
                                ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                                : "text-gray-600"
                            }`}
                        onClick={() => setActive("poster")}
                    >
                        {t("approvalsPage.tabs.poster")}
                    </h1>

                    <h1
                        className={`cursor-pointer pb-2 ${active === "contractor"
                                ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                                : "text-gray-600"
                            }`}
                        onClick={() => setActive("contractor")}
                    >
                        {t("approvalsPage.tabs.contractor")}
                    </h1>

                    <h1
                        className={`cursor-pointer pb-2 ${active === "job"
                                ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                                : "text-gray-600"
                            }`}
                        onClick={() => setActive("job")}
                    >
                        {t("approvalsPage.tabs.job")}
                    </h1>
                </div>

                {/* Content */}
                {active === "poster" && (
                    <div className="mt-10">
                        <PosterRequest />
                    </div>
                )}
                {active === "contractor" && (
                    <div className="mt-10">
                        <ContractorRequest />
                    </div>
                )}
                {active === "job" && (
                    <div className="mt-10">
                        <JobRequest />
                    </div>
                )}
            </div>
        </div>
    )
}
