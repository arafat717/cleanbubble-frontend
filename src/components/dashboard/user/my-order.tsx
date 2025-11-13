"use client";

import { useState } from "react";
import PendingOrders from "./PendingOrders";
import CompletedOrders from "./CompletedOrders";
import OffersCard from "./OrderCard";
import AllJobs from "./AllOffers";
import { useTranslation } from "react-i18next";

const MyOrder = () => {
    const { t } = useTranslation();
    const [active, setActive] = useState<
        "all" | "pending" | "completed" | "offer"
    >("all");

    const tabs: { key: typeof active; label: string }[] = [
        { key: "all", label: t("myOrder.allOrders") },
        { key: "offer", label: t("myOrder.allOffers") },
        { key: "pending", label: t("myOrder.pendingOrders") },
        { key: "completed", label: t("myOrder.completedOrders") },
    ];

    return (
        <div className="px-2 sm:px-4 md:px-5 py-5">
            {/* Tabs */}
            <div className="flex gap-3 sm:gap-6 border-b border-gray-200 overflow-x-auto whitespace-nowrap">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        className={`pb-2 text-sm sm:text-base cursor-pointer ${active === tab.key
                                ? "text-[#319E60] border-b-2 border-[#319E60] font-medium"
                                : "text-gray-600"
                            }`}
                        onClick={() => setActive(tab.key)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="mt-6 sm:mt-10">
                {active === "all" && <AllJobs />}
                {active === "offer" && <OffersCard />}
                {active === "pending" && <PendingOrders />}
                {active === "completed" && <CompletedOrders />}
            </div>
        </div>
    );
};

export default MyOrder;
