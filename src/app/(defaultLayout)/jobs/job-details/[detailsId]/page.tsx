/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, MapPin, Calendar, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useGetSinglePostQuery, useMakeOfferMutation } from "@/redux/api/publicePage/homepage.api"
import { format } from "date-fns"
import Loader from "@/components/shared/Loader"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useGetSingleUserQuery } from "@/redux/api/admin/approve.api"
import { useGetMeQuery } from "@/redux/api/authApi"
import { T } from "@/utils/translations"

export default function HouseCleaningOffer() {
    const [makeOffer] = useMakeOfferMutation()
    const router = useRouter()
    const id = useParams().detailsId
    const { data: getMe } = useGetSingleUserQuery(id)
    console.log("get user", getMe)
    const { data, isLoading, isError } = useGetSinglePostQuery(id)
    const { data: userData } = useGetMeQuery('')
    const status = userData?.data?.status
    const post = data?.data

    const [isPlaying, setIsPlaying] = useState(false)

    const { control, handleSubmit } = useForm({
        defaultValues: {
            price: post?.price || 80,
        },
    })

    const onSubmit = async (values: { price: number }) => {
        if(!userData) return toast.error("You need to be logged in to send an offer!")
        if (status === 'PENDING')  {
            return toast.error("You need admin approval to send an offer! Waiting for approval.")
        }
        const payload = {
            id,
            data: {
                offerPrice: parseFloat(values.price.toString())
            }
        }
        console.log(payload)
        try {
            const res = await makeOffer(payload)
            console.log(res)
            if (res?.data) {
                toast.success("Your offer is sent!")
                router.push("/dashboard/contractor/my-jobs")
            } else {
                toast.error(
                    (res?.error && 'data' in res.error && (res.error as any).data?.message) ||
                    (res?.error && 'message' in res.error ? (res.error as { message: string }).message : undefined) ||
                    <T>An error occurred</T>
                )
            }
        } catch (err: any) {
            toast.error(err.error?.data?.message)
        }
    }

    if (isLoading) return <Loader />
    if (isError || !post)
        return (
            <div className="min-h-screen flex justify-center items-center text-red-500">
                <T>Something went wrong or data not found.</T>
            </div>
        )

    const thumbnails = post.photos || []

    return (
        <div className="max-w-7xl mx-auto p-6 bg-background py-20">
            <h1 className="text-[40px] font-semibold text-center mb-8 text-[#222]"><T>{post.jobTitle}</T></h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:items-center mb-12">
                {/* Left Column - Images / Video */}
                <div className="space-y-4">
                    <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                        {!isPlaying ? (
                            <>
                                <Image
                                    src={post.thumbnail}
                                    alt={`Video thumbnail`}
                                    fill
                                    className="object-cover"
                                />
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
                            <video controls autoPlay className="w-full h-full object-cover">
                                <source src={post.video} type="video/mp4" />
                                <T>Your browser does not support the video tag.</T>
                            </video>
                        )}
                    </div>

                    {/* Thumbnail Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {thumbnails.map((thumb: any, index: number) => (
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
                </div>

                {/* Right Column - Service Details */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-[50px] font-[600px] text-[#222] mb-4"><T>{post.cleaningCategory}</T></h2>
                        <p className="text-[#747474] font-[400px] text-[20px] leading-relaxed"><T>{post.jobDescription}</T></p>
                    </div>

                    {/* Service Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Address */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]"><T>Full Address</T></span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div><span className="text-[14px] font-[600px] text-[#797880]"><T>Street:</T></span> <span className="text-[14px] font-[600px] text-[#17171A]">{post.street}</span></div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]"><T>Area:</T></span> <span className="text-[14px] font-[600px] text-[#17171A]">{post.area}</span></div>
                                <div><span className="text-[14px] font-[600px] text-[#797880]"><T>City:</T></span> <span className="text-[14px] font-[600px] text-[#17171A]">{post.city}</span></div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]"><T>Date & Time</T></span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div>
                                    <span className="text-[14px] font-[600px] text-[#797880]"><T>Date:</T></span>{" "}
                                    <span className="text-[14px] font-[600px] text-[#17171A]">{format(new Date(post.date), "PPP")}</span>
                                </div>
                                <div>
                                    <span className="text-[14px] font-[600px] text-[#797880]"><T>Time:</T></span>{" "}
                                    <span className="text-[14px] font-[600px] text-[#17171A]">{post.time}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span className="text-[18px] font-[500px] text-[#17171A]"><T>Contact Information</T></span>
                            </div>
                            <div className="text-sm text-muted-foreground space-y-1">
                                <div><span className="text-[14px] font-[600px] text-[#797880]"><T>Name:</T></span> <span className="text-[14px] font-[600px] text-[#17171A]"><T>{post.user.fullName}</T></span></div>
                                <div className="flex items-center gap-1">
                                    <Mail className="w-3 h-3" />
                                    <span className="text-[14px] font-[600px] text-[#17171A]"><T>{post.user.email}</T></span>
                                </div>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="text-[64px] font-[700px] text-[#17171A] mb-6">€<T>{post.price}</T></div>
                    </div>
                </div>
            </div>

            {/* Offer Input with React Hook Form */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="pt-4 space-y-4 max-w-full mx-auto"
            >
                <div className="relative w-full">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[28px] text-[#999] font-[700px]">
                        €
                    </span>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                className="w-full pl-6 pr-2 text-[28px] text-[#999] font-[700px] border-0 border-b-2 rounded-none bg-transparent focus:outline-none"
                                placeholder="120"
                            />
                        )}
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                    size="lg"
                >
                    <T>Send Offer</T>
                </Button>
            </form>
        </div>
    )
}
