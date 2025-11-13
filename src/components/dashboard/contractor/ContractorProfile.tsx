"use client"

import Loader from "@/components/shared/Loader";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetSingleUserQuery } from "@/redux/api/admin/approve.api";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useGetAllCompletedOrderQuery, useGetReviewsQuery } from "@/redux/api/publicePage/homepage.api";
import { formatTime } from "@/utils/FormatTime";
import { Calendar, CheckCircle, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */

const ContractorProfileSettings = () => {
    const { t } = useTranslation();
    const { data } = useGetMeQuery('');
    const id = data?.data?.id;

    const { data: getMe, isLoading } = useGetSingleUserQuery(id);
    const { data: project } = useGetAllCompletedOrderQuery(id);
    const { data: review } = useGetReviewsQuery(id);

    if (isLoading) return <Loader />;

    const reviewss = review?.data?.data;
    const contractorData = getMe?.data;

    return (
        <>
            {/* Profile Details */}
            <div className="w-full max-w-7xl mx-auto py-10">
                <div className="p-6">
                    {/* Header */}
                    <div className="text-start mb-10">
                        <h1 className="text-[40px] font-[500] text-[#222222] mb-2">
                            {t("contractorProfile.title")}
                        </h1>
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-start gap-4 mb-6">
                        <Avatar className="w-16 h-16 bg-pink-500">
                            {contractorData?.Company?.[0]?.companyPhoto ? (
                                <Image
                                    src={contractorData.Company[0].companyPhoto}
                                    alt={contractorData.Company[0].companyName}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <AvatarFallback className="bg-pink-500 text-white text-xl font-semibold">
                                    {contractorData?.fullName?.[0]}
                                </AvatarFallback>
                            )}
                        </Avatar>

                        <div className="grid grid-cols-2 justify-between w-full">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-[24px] font-[500] text-foreground">
                                        {contractorData?.Company?.[0]?.companyName}
                                    </h2>
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                </div>
                                <p className="text-[#747474] text-[16px] mb-3">
                                    {contractorData?.userName}
                                </p>
                            </div>
                            <div>
                                <Link href={'/dashboard/contractor/editProfile'}>
                                    <Button className="bg-[#319E60] cursor-pointer hover:bg-[#1f5f3b]  px-12 py-4 rounded-[450px]">
                                        {t("contractorProfile.editProfile")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-6 max-w-3xl">
                        <p className="text-[18px] font-[400] text-[#747474] leading-relaxed">
                            {contractorData?.Company?.[0]?.bio}
                        </p>
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center gap-6 mb-6">
                        <div className="flex items-center gap-1">
                            {[...Array(contractorData?.avgRating || 0)].map((_, idx) => (
                                <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t("contractorProfile.matchmeet")}
                            </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {contractorData?.totalCompletedJobs} {t("contractorProfile.jobsCompleted")}
                            </Badge>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="mb-6">
                        <h3 className="text-[18px] font-[500] text-[#17171A] mb-3">{t("contractorProfile.services")}</h3>
                        <div className="flex gap-3 flex-wrap">
                            {contractorData?.Company?.[0]?.services?.map((service: any) => (
                                <Badge key={service} className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    {service}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Availability */}
                    <div>
                        <h3 className="text-[24px] font-[500] text-[#17171A] mb-3">{t("contractorProfile.availability")}</h3>
                        <div className="flex items-center gap-2 text-foreground">
                            <Clock className="w-4 h-4" />
                            <span className="text-[20px] font-[600] text-[#17171A]">
                                {t("contractorProfile.availableDays")}{" "}
                                {formatTime(contractorData?.Company?.[0]?.availableStartTime)} {t("contractorProfile.to")}{" "}
                                {formatTime(contractorData?.Company?.[0]?.availableEndTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Completed Projects */}
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-[30px] font-[500px] text-[#222] mb-8">{t("contractorProfile.completedProjects")}</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project?.data?.data?.map((project: any) => (
                        <Card key={project.id} className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="relative">
                                <Image
                                    src={project.photos[0] || "/placeholder.svg"}
                                    width={1000}
                                    height={600}
                                    alt={project.post.jobTitle}
                                    className="w-full h-[180px] object-cover"
                                />
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md px-4 py-3 border">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < (project.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <CardContent className="pt-4 pb-4 px-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-[700px] text-[20px] text-[#17171A]">{project.post.jobTitle}</h3>
                                    <div className="text-right">
                                        <p className="text-[12px] font-[500px] text-[#9E9DA3]">{t("contractorProfile.price")}</p>
                                        <p className="text-[32px] font-[700px] text-[#17171A]">€{project.post.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    <span>{`${project.post.street}, ${project.post.area}, ${project.post.city}`}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <Calendar className="w-4 h-4 text-cyan-600" />
                                    <span>{t("contractorProfile.date")}: {new Date(project.estimatedDate).toLocaleDateString("en-GB")}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3]">
                                    <Clock className="w-4 h-4 text-cyan-600" />
                                    <span>{t("contractorProfile.time")}: {project.estimatedTime}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            <div className="max-w-7xl mx-auto my-10">
                <h2 className="text-[40px] font-[500px] text-center mb-8 text-[#222] border-t border-b py-5">{t("contractorProfile.reviews")}</h2>

                <div className="space-y-6">
                    {reviewss?.map((review: any) => {
                        const formattedDate = new Date(review.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                        });

                        return (
                            <Card key={review.id} className="p-6 bg-white border border-gray-200 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Image
                                                src={review.avatar || "/placeholder.svg"}
                                                alt={`${review.name || "User"} avatar`}
                                                width={60}
                                                height={60}
                                                className="w-[60px] h-[60px] rounded-full object-cover"
                                            />
                                            <div>
                                                <h3 className="text-[24px] font-[500] text-[#222]">{review.name || t("contractorProfile.anonymous")}</h3>
                                            </div>
                                        </div>

                                        <p className="text-[#222] text-[20px] font-[500] mb-3 max-w-3xl">"{review.comment}"</p>

                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <span className="text-[14px] font-[500] text-[#222]">{formattedDate}</span>
                                        <Image
                                            src={review.image || "/placeholder.svg"}
                                            width={160}
                                            height={160}
                                            alt="Product image"
                                            className="w-40 h-40 rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ContractorProfileSettings;
