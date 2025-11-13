
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, MapPin, Calendar, Phone, Mail } from "lucide-react";
import Image from "next/image";
import { FiX } from "react-icons/fi";
import { useGetAllOffersQuery } from "@/redux/api/user/myorder.api";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/shared/Loader";
import { useGetSinglePostQuery } from "@/redux/api/admin/approve.api";
import DateMaker from "@/utils/DateMaker";
import { useAcceptCounterTaskByContractorMutation, useDeclineOfferMutation } from "@/redux/api/publicePage/homepage.api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import SendingCounterModal from "@/components/PendingOrder/SendingCounterModal";

export default function HouseCleaningOffer() {
    const { offerId } = useParams();
    const id = offerId as string;

    const { t } = useTranslation();
    const [acceptTask] = useAcceptCounterTaskByContractorMutation();
    const [isPlaying, setIsPlaying] = useState(false);

    const [declineOffer] = useDeclineOfferMutation();
    const router = useRouter();

    const { data, isLoading, refetch } = useGetAllOffersQuery(id, {
        skip: !id,
    });
    const { data: singlePost } = useGetSinglePostQuery(id, {
        skip: !id,
    });

    useEffect(() => {
        if (id) refetch();
    }, [id, refetch]);





    const handleAccept = async (id: string) => {
        const res = await acceptTask(id);
        if (res?.data) {
            toast.success(t("houseCleaningOffer.acceptOffer") + " " + "successfully!");
            router.push('/dashboard/contractor/my-jobs');
        } else {
            const errorMessage = (res?.error as any)?.data?.message || (res?.error as any)?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    };



    const handleDeclineOffer = async (id: string) => {
        const res = await declineOffer(id);
        if (res?.data) toast.success(t("houseCleaningOffer.declineOffer") + " successfully!");
        else toast.error("Something went wrong!");
    };

    if (isLoading) return <Loader />;

    const allOffers = data?.data?.data;
    const postData = singlePost?.data;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-5 bg-background pb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center mb-8 text-[#222]">{t("houseCleaningOffer.makeOffer")}</h1>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12">
                {/* Left Column - Media */}
                <div className="space-y-4">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                        {!isPlaying ? (
                            <>
                                <Image src={postData?.thumbnail} alt="Video thumbnail" fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Button size="lg" onClick={() => setIsPlaying(true)} className="rounded-full w-12 h-12 sm:w-16 sm:h-16 cursor-pointer bg-white/90 hover:bg-white text-primary shadow-lg">
                                        <Play className="w-5 h-5 sm:w-6 sm:h-6 ml-1 cursor-pointer" fill="currentColor" />
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <video controls autoPlay className="w-full h-full object-cover">
                                <source src={singlePost?.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {postData?.photos?.map((thumb: any, index: any) => (
                            <div key={index} className="aspect-square rounded-md overflow-hidden bg-muted">
                                <Image src={thumb} alt={`Interior view ${index + 1}`} width={100} height={100} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Details */}
                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#222] mb-2 sm:mb-4">{postData?.jobTitle}</h2>
                        <p className="text-sm sm:text-base md:text-lg text-[#747474] font-[400px] leading-relaxed">{postData?.jobDescription}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2"><MapPin className="w-4 h-4 text-muted-foreground" /><span className="text-sm sm:text-base font-medium text-[#17171A]">{t("houseCleaningOffer.fullAddress")}</span></div>
                            <div className="text-xs sm:text-sm md:text-base text-muted-foreground space-y-1">
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.street")}:</span> <span className="text-[#17171A]">{postData?.street}</span></div>
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.area")}:</span> <span className="text-[#17171A]">{postData?.area}</span></div>
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.city")}:</span> <span className="text-[#17171A]">{postData?.city}</span></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2"><Calendar className="w-4 h-4 text-muted-foreground" /><span className="text-sm sm:text-base font-medium text-[#17171A]">{t("houseCleaningOffer.dateTime")}</span></div>
                            <div className="text-xs sm:text-sm md:text-base text-muted-foreground space-y-1">
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.date")}:</span> <span className="text-[#17171A]">{DateMaker(postData?.createdAt)}</span></div>
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.time")}:</span> <span className="text-[#17171A]">{postData?.time}</span></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2"><Phone className="w-4 h-4 text-muted-foreground" /><span className="text-sm sm:text-base font-medium text-[#17171A]">{t("houseCleaningOffer.contactInfo")}</span></div>
                            <div className="text-xs sm:text-sm md:text-base text-muted-foreground space-y-1">
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.name")}:</span> <span className="text-[#17171A]">{postData?.user?.fullName}</span></div>
                                <div className="flex items-center gap-1"><Mail className="w-3 h-3 sm:w-4 sm:h-4" /><span className="text-[#17171A]">{postData?.user?.email}</span></div>
                                <div><span className="font-semibold text-[#797880]">{t("houseCleaningOffer.phone")}:</span> <span className="text-[#17171A]">{postData?.user?.phone}</span></div>
                            </div>
                        </div>

                        <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#17171A] self-center">€{postData?.price}</div>
                    </div>
                </div>
            </div>

            {/* Offers List */}
            <div className="space-y-4">
                {allOffers?.map((job: any) => (
                    <div key={job.id} className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                        <div className="flex-1">
                            <p className="text-sm sm:text-base text-[#515157]">{t("houseCleaningOffer.counterOfferFromPoster")}</p>
                            <p className="text-base sm:text-lg font-semibold text-[#17171A]">“{job?.post?.jobTitle} - {job?.post?.area}, {job?.post?.city}”</p>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                <span className="font-medium text-[#797880]">{t("houseCleaningOffer.price")}:</span> <span className="text-[#17171A]">{job?.post?.price}</span><br />
                                <span className="font-medium text-[#797880]">{t("houseCleaningOffer.yourOffer")}:</span> <span className="text-[#17171A]">{job.offerPrice}</span>
                            </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                            <button onClick={() => handleDeclineOffer(job?.id)} className="text-red-500 cursor-pointer flex items-center font-medium text-xs sm:text-sm hover:underline">
                                {t("houseCleaningOffer.declineOffer")} <FiX className="ml-1" />
                            </button>
                            <div className="flex flex-col sm:flex-row gap-2 mt-2 sm:mt-4">
                                <button onClick={() => handleAccept(job?.id)} className="bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium">{t("houseCleaningOffer.acceptOffer")}</button>
                                <SendingCounterModal id={job?.id}></SendingCounterModal>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
