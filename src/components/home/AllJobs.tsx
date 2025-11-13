/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useState, useMemo } from 'react'
import ServiceCard from '../shared/ServiceCard';
import { useAllPostQuery } from '@/redux/api/publicePage/homepage.api';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Pagination from '../shared/common/Pagination';
import { format } from "date-fns";
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';
import Loader from '../shared/Loader';
import { T } from '@/utils/translations';
import { useTranslation } from 'react-i18next';

const AllJobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        location: "",
        category: "",
        date: "",
    });

    // ✅ Fetch jobs WITH filters
    const { data, isLoading, isError } = useAllPostQuery([
        { name: "limit", value: 8 },
        { name: "page", value: String(currentPage) },
        filters.location && { name: "area", value: filters.location },
        filters.category && { name: "cleaningCategory", value: filters.category },
        filters.date && { name: "date", value: filters.date },
    ].filter(Boolean) as any);

    const jobs = data?.data?.data || [];
    const metaData = data?.data?.meta;

    // ✅ Fetch jobs WITHOUT filters (for filter options)
    const { data: allJobsData } = useAllPostQuery([
        { name: "limit", value: 1000 },
    ]);
    const allJobs = allJobsData?.data?.data || [];

    // ✅ Unique filter values
    const uniqueLocations = useMemo(() => {
        const all = allJobs.map((job: any) => job.area || job.city).filter(Boolean);
        return [...new Set(all)];
    }, [allJobs]);

    const uniqueCategories = useMemo(() => {
        const all = allJobs.map((job: any) => job.cleaningCategory).filter(Boolean);
        return [...new Set(all)];
    }, [allJobs]);

    const uniqueDates = useMemo(() => {
        const all = allJobs.map((job: any) => job.date).filter(Boolean);
        const formatted = all.map((d: string) => d.split("T")[0]);
        return [...new Set(formatted)];
    }, [allJobs]);

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <>
            {/* Search Filters */}
            <section className="py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap gap-4 items-center justify-center">
                        <div className="bg-gray-50 flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 border items-stretch sm:items-center justify-center p-4 md:p-8 rounded-2xl w-full sm:w-auto">
                            {/* Location */}
                            <Select
                                value={filters.location}
                                onValueChange={(val) => {
                                    setCurrentPage(1);
                                    setFilters((p) => ({ ...p, location: val }));
                                }}
                            >
                                <SelectTrigger className="w-full sm:w-60 md:w-70 py-5 md:py-7 rounded-2xl">
                                    <SelectValue placeholder={<T>Location</T>} />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueLocations.map((loc) => (
                                        <SelectItem key={loc as string} value={loc as string}>
                                            <T>{loc as string}</T>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Category */}
                            <Select
                                value={filters.category}
                                onValueChange={(val) => {
                                    setCurrentPage(1);
                                    setFilters((p) => ({ ...p, category: val }));
                                }}
                            >
                                <SelectTrigger className="w-full sm:w-60 md:w-70 py-5 md:py-7 rounded-2xl">
                                    <SelectValue placeholder={<T>Category</T>} />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueCategories.map((cat) => (
                                        <SelectItem key={cat as string} value={cat as string}>
                                            <T>{cat as string}</T>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Date */}
                            <Select
                                value={filters.date}
                                onValueChange={(val) => {
                                    setCurrentPage(1);
                                    setFilters((p) => ({ ...p, date: val }));
                                }}
                            >
                                <SelectTrigger className="w-full sm:w-60 md:w-70 py-5 md:py-7 rounded-2xl">
                                    <SelectValue placeholder={<T>Date</T>} />
                                </SelectTrigger>
                                <SelectContent>
                                    {uniqueDates.map((date) => (
                                        <SelectItem key={date as string} value={date as string}>
                                            <T>{format(new Date(date as string), "PPP")}</T>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Clear Filters Button */}
                            {(filters.location || filters.category || filters.date) && (
                                <Button
                                    variant="outline"
                                    className="rounded-2xl w-full sm:w-auto py-5 md:py-6"
                                    onClick={() => {
                                        setFilters({ location: "", category: "", date: "" });
                                        setCurrentPage(1);
                                    }}
                                >
                                    <T>Clear Filters</T>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Jobs */}
            <div className="pb-10 md:pb-20 px-4">
                <div className="mt-5 text-center">
                    <span className="text-base sm:text-xl md:text-2xl bg-[#14A0C1] px-4 sm:px-6 py-1.5 sm:py-2 rounded-3xl font-medium font-roboto inline-block">
                        {t("allJobs.featuredCleaningJobs")}
                    </span>
                    <div className="uppercase text-2xl sm:text-3xl md:text-[44px] font-medium leading-tight md:leading-11 flex justify-center gap-2 md:gap-4 my-4 md:my-6 px-4">
                        <p className="break-words">{t("allJobs.latestCleaningJobs")}</p>
                    </div>
                </div>

                <div className="container mx-auto min-h-[300px] md:min-h-[400px] flex items-center justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            <Loader2 className="h-6 w-6 md:h-8 md:w-8 animate-spin" />
                            <p className="text-sm md:text-base">{t("allJobs.searchingJobs")}</p>
                        </div>
                    ) : isError ? (
                        <p className="text-center text-red-500 text-sm md:text-base px-4">
                            {t("allJobs.somethingWentWrong")}
                        </p>
                    ) : jobs.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-3 md:gap-4 lg:gap-2 w-full">
                            {jobs.map((item: any) => (
                                <ServiceCard key={item?._id} item={item} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mt-20 md:mt-[200px] text-sm md:text-base px-4">
                            {filters.location || filters.category || filters.date
                                ? t("allJobs.noJobsMatchFilters")
                                : t("allJobs.noJobsAvailable")}
                        </p>
                    )}
                </div>

                {metaData?.total > 8 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={metaData?.page}
                            totalItem={metaData?.total}
                            limit={8}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                )}
            </div>
        </>
    )
}

export default AllJobs