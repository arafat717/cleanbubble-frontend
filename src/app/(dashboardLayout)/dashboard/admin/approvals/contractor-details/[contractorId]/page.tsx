/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
    useApproveUserMutation,
    useGetSingleUserQuery,
    useRejectUserMutation,
} from "@/redux/api/admin/approve.api";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

type RejectFormData = {
    suggestion: string;
};

const ContractorsRequest = () => {
    const { t } = useTranslation();

    const [approve] = useApproveUserMutation();
    const [reject] = useRejectUserMutation();
    const id = useParams().contractorId;
    const { data, isLoading, refetch } = useGetSingleUserQuery(id);
    const router = useRouter();
    const { control, handleSubmit, reset } = useForm<RejectFormData>();
    const [openModal, setOpenModal] = useState(false);

    if (isLoading) return <Loader></Loader>;

    const result = data?.data;

    const handleApprove = async () => {
        try {
            const res = await approve(id);
            if (res?.data) {
                toast.success(t("contractorApproval.approvedSuccess"));
                refetch();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("contractorApproval.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("contractorApproval.error"));
        }
    };

    const handleRejectApproval = async (formData: RejectFormData) => {
        try {
            const payload = { id, suggestion: formData.suggestion };
            const res = await reject(payload);

            if (res?.data) {
                toast.success(t("contractorApproval.rejectedSuccess"));
                refetch();
                setOpenModal(false);
                reset();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("contractorApproval.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("contractorApproval.error"));
        }
    };

    return (
        <div className="max-w-5xl px-10 min-h-screen">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b">
                <Link href={"/dashboard/admin/approvals"}>
                    <ArrowLeft className="w-[46px] h-[46px] text-gray-700" />
                </Link>
                <h1 className="text-[40px] font-[500px] text-[#17171A]">
                    {t("contractorApproval.header")}
                </h1>
            </div>

            <div className="p-4 space-y-6">
                {/* Company / Profile Section */}
                <div>
                    <div className="flex items-center gap-2 mb-3 h-[130px] w-[130px] rounded-full">
                        <Image
                            src={result?.Company[0]?.companyPhoto}
                            alt={t("contractorApproval.companyPhotoAlt")}
                            className="rounded-full"
                            width={1000}
                            height={1000}
                        />
                    </div>

                    <div className="text-xs text-gray-600 leading-relaxed mb-4">
                        <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.bio")}:</strong>{" "}
                        <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.bio}</span>
                    </div>

                    <div className="space-y-2 text-xs">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.services")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">
                                {result?.Company[0]?.services?.map((service: any) => (
                                    <span key={service}>{service}, </span>
                                ))}
                            </span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.serviceArea")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">
                                {result?.Company[0]?.serviceAreas?.map((area: any) => (
                                    <span key={area}>{area}, </span>
                                ))}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("contractorApproval.companyInfo")}</h3>
                    <div className="space-y-2 text-xs">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.companyName")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.companyName}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.phone")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.companyPhone}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.email")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.companyEmail}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.fullAddress")} : </strong>{" "}
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.fullAddress}</span>
                        </div>
                    </div>
                </div>

                {/* Company Documents */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("contractorApproval.companyDocs")}</h3>
                    <div className="space-y-2 text-xs mb-3">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.taxNumber")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.taxNumber}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.insuranceNumber")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.insuranceNumber}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.insuranceDoc")} : </strong>
                        </div>
                    </div>
                    <div className="w-[212px] h-[212px]">
                        <Image src={result?.Company[0]?.insuranceDocument} alt={t("contractorApproval.insuranceDocAlt")} width={1000} height={1000} />
                    </div>
                </div>

                {/* Personal Information */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("contractorApproval.personalInfo")}</h3>
                    <div className="space-y-2 text-xs">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.contractorName")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.fullName}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.phone")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.phone}</span>
                        </div>
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.email")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.email}</span>
                        </div>
                    </div>
                </div>

                {/* Payment Information */}
                <div>
                    <h3 className="text-[36px] font-[600px] text-[#222] mb-3">{t("contractorApproval.paymentInfo")}</h3>
                    <div className="text-xs">
                        <div>
                            <strong className="text-[#222] font-[600px] text-[24px]">{t("contractorApproval.paymentMethod")} : </strong>
                            <span className="text-[#222] font-[400px] text-[24px]">{result?.Company[0]?.paymentMethod}</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                    <Button
                        onClick={handleApprove}
                        className="flex-1 bg-[#319E60] w-full  wcursor-pointer hover:bg-green-600 text-white font-medium py-[10px] rounded-lg"
                    >
                        {t("contractorApproval.approve")}
                    </Button>
                    <Dialog open={openModal} onOpenChange={setOpenModal}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="cursor-pointer w-full">
                                {t("contractorApproval.cancel")}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <form onSubmit={handleSubmit(handleRejectApproval)} className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="suggestion">{t("contractorApproval.giveSuggestion")}</Label>
                                    <Controller control={control} name="suggestion" render={({ field }) => <Input id="suggestion" {...field} />} />
                                </div>
                                <DialogFooter>
                                    <Button type="submit" className="bg-[#319E60] cursor-pointer hover:bg-[#319E60]">
                                        {t("contractorApproval.send")}
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

export default ContractorsRequest;
