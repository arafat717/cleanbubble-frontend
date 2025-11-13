'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CiLocationOn } from "react-icons/ci"
import { IoBagOutline } from "react-icons/io5"
import Link from "next/link"
import { useGetTopRatedContractorQuery } from "@/redux/api/publicePage/homepage.api"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper/modules"
import { useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import Loader from "../shared/Loader"
import { T } from "@/utils/translations"
import { useTranslation } from "react-i18next"

export function ContractorsSection() {
    const { data, isLoading } = useGetTopRatedContractorQuery({})
    const swiperRef = useRef<any>(null)
    const { t } = useTranslation();

    if (isLoading) {
        return <Loader></Loader>
    }

    const topContractor = data?.data


    return (
        <div className="max-w-7xl mx-auto px-4 py-16">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12 px-4">
                <span className="inline-block bg-cyan-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-medium mb-2 md:mb-3 tracking-wide uppercase">
                    {t("contractors.topContractorsNearYou")}
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                    {t("contractors.trustedCleaningExperts")}
                </h2>
            </div>


            {/* Swiper Container */}
            <div className="relative">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination]}
                    spaceBetween={24}
                    slidesPerView={1}
                    loop={true}
                    speed={600}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    navigation={{
                        prevEl: ".swiper-button-prev-custom",
                        nextEl: ".swiper-button-next-custom",
                    }}
                    className="contractor-swiper"
                >
                    {topContractor?.map((contractor: any) => (
                        <SwiperSlide key={contractor.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-gray-400">
                            <div className="h-full flex flex-col bg-white rounded-lg shadow-lg overflow-hidden border-none">
                                {/* Logo Section */}
                                <div className="h-48 w-full flex items-center justify-center bg-indigo-900 overflow-hidden border-none">
                                    <div className="bg-white rounded-lg  flex items-center justify-center p-2">
                                        <Image
                                            src={contractor.Company[0]?.companyPhoto || "/placeholder.png"}
                                            alt={contractor.Company[0]?.companyName || "Company Logo"}
                                            width={1000}
                                            height={1000}
                                            className="object-contain rounded-lg"
                                        />
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="flex-1 flex flex-col p-4">
                                    {/* Company Name */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="font-semibold text-gray-900 text-sm">
                                            <T>{contractor.Company[0]?.companyName || contractor.fullName}</T>
                                        </h3>
                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center gap-1 mb-2">
                                        <CiLocationOn className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">
                                            <T>{contractor.Company[0]?.serviceAreas.join(", ")}</T>
                                        </span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-2">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < contractor.avgRating
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Jobs Completed */}
                                    <div className="flex items-center gap-1 mb-3">
                                        <IoBagOutline className="w-4 h-4 text-gray-600" />
                                        <span className="text-sm text-gray-600">
                                            <T>{contractor.totalCompletedJobs}</T> <T>jobs completed</T>
                                        </span>
                                    </div>

                                    {/* Services */}
                                    <div className="text-sm text-gray-600 mb-4 line-clamp-2">
                                        <T>{contractor.Company[0]?.serviceAreas.join(" • ")}</T>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-auto flex justify-center items-center gap-2">
                                        <Link href={`/post-job/view-profile/${contractor.id}`} className="flex-1">
                                            <Button
                                                size="sm"
                                                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white text-xs"
                                            >
                                                <T>View Profile</T>
                                            </Button>
                                        </Link>
                                        <Link href={`/post-job/give-order/${contractor?.id}`}> <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex-1 mt-1 border-green-600 cursor-pointer text-green-600 hover:bg-green-50 text-xs bg-transparent"
                                        >
                                            <T>Give Order</T>
                                        </Button></Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation & Pagination at bottom center */}
                <div className="flex flex-col items-center justify-center mt-8 gap-4">
                    <div className="swiper-pagination-custom flex gap-2"></div>
                    <div className="flex gap-4">
                        <button className="swiper-button-prev-custom cursor-pointer w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center shadow-sm">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="swiper-button-next-custom cursor-pointer w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-100 flex items-center justify-center shadow-sm">
                            <ChevronRight className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
