/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import { IoBagHandleOutline } from "react-icons/io5"
import Link from "next/link"
import { useParams } from "next/navigation"
import Loader from "@/components/shared/Loader"
import { useGetSingleOrderQuery } from "@/redux/api/user/myorder.api"

const CompletePayment = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const id = useParams().completeId;
    console.log(id)
    const { data, isLoading } = useGetSingleOrderQuery(id);

    if (isLoading) {
        return <Loader></Loader>
    }

    console.log(data?.data)
    const jobData = data?.data;


    return (
        <>
            <div className="flex items-center space-x-2 px-10">
                <IoBagHandleOutline className="w-[54px] h-[54px]"></IoBagHandleOutline>
                <h1 className="text-[#17171A] text-[40px] font-[500px]">My Posted Jobs</h1>
            </div>
            <div className="max-w-7xl p-6 bg-background py-10 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:items-center mb-5">
                    {/* Left Column - Images */}
                    <div className="space-y-4">
                        {/* Main Image with Play Button */}
                        <h1 className="text-[#17171A] font-[500px] text-[36px]">Proves </h1>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                            {!isPlaying ? (
                                <>
                                    {/* Thumbnail */}
                                    <Image
                                        src={jobData?.photos[0]}
                                        alt="Video thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Play button */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Button
                                            size="lg"
                                            onClick={() => setIsPlaying(true)}
                                            className="rounded-full w-16 h-16 cursor-pointer bg-white/90 hover:bg-white text-primary shadow-lg"
                                        >
                                            <Play className="w-6 h-6 ml-1 cursor-pointer" fill="currentColor" />
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <video
                                    controls
                                    autoPlay
                                    className="w-full h-full object-cover"
                                >
                                    <source src={jobData?.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                        </div>

                        {/* Thumbnail Grid */}
                        <div className="grid grid-cols-4 gap-2">
                            {jobData?.photos.map((thumb: any, index: any) => (
                                <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
                                    <Image
                                        src={thumb}
                                        alt={`Interior view ${index + 1}`}
                                        width={100}
                                        height={100}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-[#222] font-semibold text-[48px]" >
                            {jobData?.post?.jobTitle}

                        </div>
                    </div>

                    {/* Right Column - Service Details */}
                    <div className="space-y-6">

                    </div>
                </div>
                {/* Price Section */}
                <div className="pt-4">
                    <div
                        className="bg-white shadow-sm rounded-xl p-4 flex justify-between items-center"
                    >
                        {/* Left Content */}
                        <div>
                            <p className="text-[#515157] text-[16px] font-[400px]">Contractor accepted your offer,please make payment to get the service:</p>
                            <p className="font-[600px] text-[18px] text-[#17171A]">{jobData?.post?.jobTitle} - {jobData?.post?.area} , {jobData?.post?.city}</p>
                            <p className="text-gray-500 text-sm mt-1">
                                <span className="text-[16px] font-[500px] text-[#797880]">Your Price:</span> <span className="text-[16px] font-[500px] text-[#17171A]">€{jobData?.post?.offeredPrice}</span><br />
                            </p>
                        </div>

                        {/* Right Actions */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex gap-2 mt-10">
                                <Link href={`/pay/${id}`}><button className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium">
                                    Make Payment
                                </button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}


export default CompletePayment;
