/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

/* eslint-disable react/no-unescaped-entities */
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Star, CheckCircle, Clock, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useGetAllCompletedOrderQuery, useGetReviewsQuery, useGetSingleUserQuery } from "@/redux/api/publicePage/homepage.api"
import { formatTime } from "@/utils/FormatTime"
import Loader from "@/components/shared/Loader"
import { Badge } from "@/components/ui/badge";
import { T } from "@/utils/translations"



const ContractorProfile = () => {
    const id = useParams().profileId;
    const { data, isLoading } = useGetSingleUserQuery(id)
    const { data: project } = useGetAllCompletedOrderQuery(id)
    const { data: review } = useGetReviewsQuery(id)
    const reviewss = review?.data?.data;
    const contractorData = data?.data;
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <>
            {/* details */}
            <div className="w-full max-w-7xl mx-auto py-10">
                <div className="w-full max-w-7xl mx-auto py-10">
                    <div className="p-6 ">
                        {/* Header */}
                        <div className="text-start mb-10">
                            <h1 className="text-2xl md:text-[40px] font-[500] text-[#222222] mb-2">
                                <T>Contractor Profile</T>
                            </h1>
                        </div>

                        {/* Profile Section */}
                        <div className="flex items-start gap-2 md:gap-4 mb-6">
                            <Avatar className="w-12 h-12 md:w-16 md:h-16 bg-pink-500">
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

                            <div className="grid grid-cols-2 gap-2 justify-between w-full">
                                <div>
                                    <div className="flex items-center md:gap-2 mb-1">
                                        <h2 className="text-[14px] md:text-[24px] font-[500] text-foreground">
                                            {contractorData?.Company?.[0]?.companyName}
                                        </h2>
                                        <CheckCircle className="md:w-5 md:h-5 w-3 h-3 text-primary" />
                                    </div>
                                    <p className="text-[#747474] text-[12px] md:text-[16px] mb-3">
                                        {contractorData?.userName}
                                    </p>
                                </div>
                                <div>
                                    <Link href={`/post-job/give-order/${id}`}>
                                        <Button className="bg-[#319E60] cursor-pointer hover:bg-[#1f5f3b] px-6 md:px-12 py-4 rounded-[450px]">
                                            <T>Give an Order</T>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 max-w-3xl">
                            <p className="text-[18px] font-[400] text-[#747474] leading-relaxed">
                                <T>{contractorData?.Company?.[0]?.bio}</T>
                            </p>
                        </div>

                        {/* Rating and Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                            <div className="flex items-center gap-1">
                                {[...Array(contractorData?.avgRating || 0)].map((_, idx) => (
                                    <Star
                                        key={idx}
                                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="bg-yellow-100 text-yellow-800 border-yellow-200"
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    <T>Matchmeet</T>
                                </Badge>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-green-800 border-green-200"
                                >
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    <T>{contractorData?.totalCompletedJobs}</T> <T>jobs completed</T>
                                </Badge>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="mb-6">
                            <h3 className="text-[18px] font-[500] text-[#17171A] mb-3">Services</h3>
                            <div className="flex gap-3 flex-wrap">
                                {contractorData?.Company?.[0]?.services?.map((service: any) => (
                                    <Badge
                                        key={service}
                                        className="bg-purple-100 text-purple-800 border-purple-200 px-3 py-1"
                                    >
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        <T>{service}</T>
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="text-[24px] font-[500] text-[#17171A] mb-3">
                                <T>Availability</T>
                            </h3>
                            <div className="flex items-center gap-2 text-foreground">
                                <Clock className="w-4 h-4" />
                                <span className="text-[20px] font-[600] text-[#17171A]">
                                    <T>Sunday to Thursday</T>{" "}
                                    <T>{formatTime(contractorData?.Company?.[0]?.availableStartTime)}</T> <T>to</T>{" "}
                                    <T>{formatTime(contractorData?.Company?.[0]?.availableEndTime)}</T>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* card  */}
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-[30px] font-[500px] text-[#222] mb-8"><T>Completed Projects</T></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {project?.data?.data?.map((project: any) => (
                        <Card
                            key={project.id}
                            className="overflow-hidden border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-200"
                        >
                            {/* Image */}
                            <div className="relative">
                                <Image
                                    src={project.photos[0] || "/placeholder.svg"}
                                    width={1000}
                                    height={600}
                                    alt={project.post.jobTitle}
                                    className="w-full h-[180px] object-cover"
                                />

                                {/* Rating Stars (optional, remove if not in data) */}
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-md px-4 py-3 border">
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${i < (project.rating || 0)
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-300"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Card Body */}
                            <CardContent className="pt-4 pb-4 px-4">
                                {/* Title & Price */}
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-[700px] text-[20px] text-[#17171A]">
                                        <T>{project.post.jobTitle}</T>
                                    </h3>
                                    <div className="text-right">
                                        <p className="text-[12px] font-[500px] text-[#9E9DA3]"><T>Price</T></p>
                                        <p className="text-[32px] font-[700px] text-[#17171A]">€<T>{project.post.price}</T></p>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <MapPin className="w-4 h-4 text-cyan-600" />
                                    <span><T>{project.post.street}</T>,<T>{project.post.area}</T>, <T>{project.post.city}</T></span>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3] mb-2">
                                    <Calendar className="w-4 h-4 text-cyan-600" />
                                    <span>
                                        <T>Date</T>: <T>{new Date(project.estimatedDate).toLocaleDateString("en-GB")}</T>
                                    </span>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2 text-sm text-[#9E9DA3]">
                                    <Clock className="w-4 h-4 text-cyan-600" />
                                    <span><T>Time</T>: <T>{project.estimatedTime}</T></span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </div>
            {/* reviews */}
            <div className="max-w-7xl mx-auto my-10">
                <h2 className="text-[40px] font-[500px] text-center mb-8 text-[#222] border-t border-b py-5">Reviews</h2>

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
                                                <h3 className="text-[24px] font-[500] text-[#222]">
                                                    <T>{review.name || "Anonymous"}</T>
                                                </h3>
                                            </div>
                                        </div>

                                        <p className="text-[#222] text-[20px] font-[500] mb-3 max-w-3xl">
                                            "<T>{review.comment}</T>"
                                        </p>

                                        <div className="flex items-center gap-1">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end gap-3">
                                        <span className="text-[14px] font-[500] text-[#222]"><T>{formattedDate}</T></span>
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
    )
}

export default ContractorProfile;