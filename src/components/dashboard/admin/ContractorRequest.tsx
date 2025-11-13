/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Pagination from "@/components/shared/common/Pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    useApproveUserMutation,
    useGetAllContractorRequestQuery,
} from "@/redux/api/admin/approve.api";
import DateMaker from "@/utils/DateMaker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

const ContractorRequest = () => {
    const { t } = useTranslation();

    const [approve] = useApproveUserMutation();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading, refetch } = useGetAllContractorRequestQuery([
        { name: "limit", value: 10 },
        { name: "page", value: String(currentPage) },
    ]);

    if (isLoading) {
        return <Loader></Loader>;
    }

    const contractorData = data?.data?.data;
    const metaData = data?.data?.meta;

    const handleApprove = async (id: any) => {
        try {
            const result = await approve(id);
            if (data?.data) {
                toast.success(t("contractorRequest.approvedSuccess"));
                refetch();
                router.push("/dashboard/admin/approvals");
            } else {
                toast.error(t("contractorRequest.error"));
            }
        } catch (err: any) {
            toast.error(err.message || t("contractorRequest.error"));
        }
    };

    return (
        <div>
            {contractorData?.length ? (
                <div>
                    {contractorData?.map((request: any) => (
                        <div
                            key={request.id}
                            className="bg-white p-4 shadow-sm my-2 rounded-md"
                        >
                            <div className="flex items-center justify-between">
                                {/* Left: Avatar + Info */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-[46px] w-[46px]">
                                        <AvatarImage
                                            src={
                                                request.Company[0]?.companyPhoto ||
                                                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD"
                                            }
                                            alt={request.name}
                                        />
                                        <AvatarFallback className="bg-gray-100 text-sm font-medium text-gray-600">
                                            {request.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium text-[18px] text-[#17171A]">
                                            {request.fullName}
                                        </h3>
                                        <p className="text-[14px] text-[#444]">
                                            {t("contractorRequest.joinedDate")} :{" "}
                                            {DateMaker(request?.createdAt)}
                                        </p>
                                    </div>
                                </div>
                                {/* Right: Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => handleApprove(request?.id)}
                                        className="bg-[#319E60] cursor-pointer px-[22px] py-[8px] text-white text-[16px] font-medium rounded-full hover:bg-[#267c4b]"
                                    >
                                        {t("contractorRequest.approve")}
                                    </Button>
                                    <Link
                                        href={`/dashboard/admin/approvals/contractor-details/${request?.id}`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border border-[#319E60] cursor-pointer text-[#319E60] text-[16px] font-medium rounded-full hover:bg-green-50"
                                        >
                                            {t("contractorRequest.viewDetails")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>{t("contractorRequest.noRequest")}</div>
            )}

            {metaData?.total > 10 && (
                <Pagination
                    currentPage={metaData?.page}
                    totalItem={metaData?.total}
                    limit={10}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </div>
    );
};

export default ContractorRequest;
