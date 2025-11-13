/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApproveJobPosterMutation, useGetSinglePostQuery, useRejectPostMutation } from "@/redux/api/admin/approve.api";
import DateMaker from "@/utils/DateMaker";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const JobsRequestDetail = () => {
    const { t } = useTranslation();
    const [approve] = useApproveJobPosterMutation();
    const [reject] = useRejectPostMutation();
    const [isPlaying, setIsPlaying] = useState(false);
    const id = useParams().jobId;
    const { data, isLoading, refetch } = useGetSinglePostQuery(id);
    const router = useRouter();

    if (isLoading) return <Loader></Loader>;

    const result = data?.data;

    const handleApprove = async () => {
        try {
            const res = await approve(id);
            if (res?.data) {
                toast.success(t("jobApprovalDetail.approveSuccess"));
                refetch();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("jobApprovalDetail.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("jobApprovalDetail.error"));
        }
    };

    const handleRejectApproval = async () => {
        try {
            const res = await reject(id);
            if (res?.data) {
                toast.success(t("jobApprovalDetail.rejectSuccess"));
                refetch();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("jobApprovalDetail.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("jobApprovalDetail.error"));
        }
    };

    return (
        <div className="max-w-6xl px-2 md:px-10 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
                <Link href="/dashboard/admin/approvals">
                    <ArrowLeft className="w-[46px] h-[46px] text-gray-700" />
                </Link>
                <h1 className="text-[40px] font-[500px] text-[#17171A]">{t("jobApprovalDetail.header")}</h1>
            </div>

            <div className="p-4 space-y-6 mx-4 mt-4 rounded-lg">
                {/* Job Details */}
                <div className="space-y-3">
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.jobTitle")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.jobTitle}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.cleaningCategory")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.cleaningCategory}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.jobDescription")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.jobDescription}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.street")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.street}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.price")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.price}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.date")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{DateMaker(result?.date)}</span>
                    </div>
                    <div>
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.time")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.time}</span>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("jobApprovalDetail.contactInfo")}</h3>
                    <div className="space-y-2">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.name")}:</strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.user?.fullName}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.email")}:</strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.user?.email}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.phone")}:</strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">+44013228538</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("jobApprovalDetail.notification")}:</strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{t("jobApprovalDetail.inApp")}</span>
                        </div>
                        {
                            result?.hasCleaningItems ? (
                                <div>
                                    <span className="text-[#222] font-[400px] text-[24px]">{t("jobApprovalDetail.toolsProvided")}</span>
                                </div>
                            ) : (<div>
                                <span className="text-[#222] font-[400px] text-[24px]">{t("jobApprovalDetail.toolsNotProvided")}</span>
                            </div>)
                        }
                    </div>
                </div>

                {/* Attachments */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("jobApprovalDetail.attachments")}</h3>

                    <div className="relative w-full h-40 md:h-96 rounded-lg overflow-hidden bg-gray-200 mb-4">
                        {!isPlaying ? (
                            <div className="w-full h-full relative cursor-pointer" onClick={() => setIsPlaying(true)}>
                                <Image src={result?.thumbnail} alt="Video thumbnail" fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                                        <Play className="w-8 h-8 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <video src={result?.video} controls autoPlay className="w-full h-full object-cover rounded-lg" />
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {result?.photos?.map((i: any) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                <Image src={i} alt={`Attachment ${i}`} width={1000} height={1000} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                    <Button onClick={handleApprove} className="flex-1 bg-[#319E60] cursor-pointer hover:bg-green-600 text-white font-medium py-[10px] rounded-lg">
                        {t("jobApprovalDetail.accept")}
                    </Button>
                    <Button onClick={handleRejectApproval} variant="outline" className="px-6 py-3 cursor-pointer flex-1 border-gray-300 text-gray-700 rounded-lg bg-transparent">
                        {t("jobApprovalDetail.cancel")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobsRequestDetail;
