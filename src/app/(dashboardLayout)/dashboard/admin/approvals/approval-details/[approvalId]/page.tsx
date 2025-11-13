/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    useApproveUserMutation,
    useGetSingleUserQuery,
    useRejectUserMutation,
} from "@/redux/api/admin/approve.api";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

type RejectFormData = {
    suggestion: string;
};

const JobPostersRequest = () => {
    const { t } = useTranslation();

    const [reject] = useRejectUserMutation();
    const [approve] = useApproveUserMutation();
    const router = useRouter();
    const id = useParams().approvalId;
    const { data, isLoading, refetch } = useGetSingleUserQuery(id);
    const singleData = data?.data;

    const { control, handleSubmit, reset } = useForm<RejectFormData>();
    const [openModal, setOpenModal] = useState(false);

    const handleApprove = async () => {
        try {
            const result = await approve(id);
            if (result?.data) {
                toast.success(t("jobPostersRequest.approvedSuccess"));
                refetch();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("jobPostersRequest.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("jobPostersRequest.error"));
        }
    };

    const handleRejectApproval = async (formData: RejectFormData) => {
        try {
            const payload = {
                id,
                suggestion: formData.suggestion,
            };
            const result = await reject(payload);

            if (result?.data) {
                toast.success(t("jobPostersRequest.rejectedSuccess"));
                refetch();
                setOpenModal(false);
                reset();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("jobPostersRequest.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("jobPostersRequest.error"));
        }
    };

    if (isLoading) return <Loader></Loader>;

    return (
        <div className="max-w-xl min-h-screen px-10">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 pb-6">
                <Link href={"/dashboard/admin/approvals"}>
                    <ArrowLeft className="w-[46px] h-[46px] text-gray-700" />
                </Link>
                <h1 className="text-[40px] font-[500px] text-[#17171A]">
                    {t("jobPostersRequest.title")}
                </h1>
            </div>

            {/* Profile Section */}
            <div className="px-4 pb-8">
                <div className="flex flex-col items-start">
                    <div className="flex justify-center mb-6">
                        <div className="w-[130px] h-[130px] rounded-full overflow-hidden bg-gray-200">
                            <Image
                                src={singleData?.profile || "/default-avatar.png"}
                                alt="Profile picture"
                                width={130}
                                height={130}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 mb-8">
                        <div>
                            <span className="text-[24px] font-[600px] text-[#222]">
                                {t("jobPostersRequest.name")}:
                            </span>
                            <span className="text-[24px] font-[400px] text-[#4d4a4a]">
                                {singleData?.fullName}
                            </span>
                        </div>
                        <div>
                            <span className="text-[24px] font-[600px] text-[#222]">
                                {t("jobPostersRequest.email")}:
                            </span>
                            <span className="text-[24px] font-[400px] text-[#4d4a4a]">
                                {singleData?.email}
                            </span>
                        </div>
                        <div>
                            <span className="text-[24px] font-[600px] text-[#222]">
                                {t("jobPostersRequest.phone")}:
                            </span>
                            <span className="text-[24px] font-[400px] text-[#4d4a4a]">
                                {singleData?.phone}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 flex gap-5">
                    <Button
                        onClick={handleApprove}
                        className="w-full bg-[#319E60] cursor-pointer !py-[10px] hover:bg-green-700 text-[#FFF] font-[400px] rounded-lg"
                    >
                        {t("jobPostersRequest.approve")}
                    </Button>

                    <Dialog open={openModal} onOpenChange={setOpenModal}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="cursor-pointer w-full">
                                {t("jobPostersRequest.cancel")}
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="sm:max-w-[425px]">
                            <form
                                onSubmit={handleSubmit(handleRejectApproval)}
                                className="grid gap-4"
                            >
                                <div className="grid gap-3">
                                    <Label htmlFor="suggestion">
                                        {t("jobPostersRequest.giveSuggestion")}
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="suggestion"
                                        render={({ field }) => (
                                            <Input id="suggestion" {...field} />
                                        )}
                                    />
                                </div>

                                <DialogFooter>
                                    <Button
                                        type="submit"
                                        className="bg-[#319E60] cursor-pointer hover:bg-[#319E60]"
                                    >
                                        {t("jobPostersRequest.send")}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default JobPostersRequest;
