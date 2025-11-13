"use client"
import Pagination from "@/components/shared/common/Pagination"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useApproveUserMutation, useGetAllUserRequestQuery } from "@/redux/api/admin/approve.api"
import DateMaker from "@/utils/DateMaker"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const PosterRequest = () => {
    const { t } = useTranslation()
    const [approve] = useApproveUserMutation()
    const [currentPage, setCurrentPage] = useState(1)
    const router = useRouter()
    const { data, isLoading, refetch } = useGetAllUserRequestQuery([
        { name: "limit", value: 10 },
        { name: "page", value: String(currentPage) },
    ])

    if (isLoading) {
        return <div>Loading...</div>
    }

    const jobPosterData = data?.data?.data
    const metaData = data?.data?.meta

    const handleApprove = async (id: any) => {
        try {
            const result = await approve(id)
            console.log(result)
            if (data?.data) {
                toast.success(t("posterRequest.toast.success"))
                refetch()
                router.push("/dashboard/admin/approvals")
            } else {
                toast.error(t("posterRequest.toast.error"))
            }
        } catch (err: any) {
            toast.error(err.message)
        }
    }

    return (
        <div>
            {jobPosterData?.length ? (
                <div>
                    {jobPosterData?.map((request: any) => (
                        <div
                            key={request.id}
                            className="bg-white p-4 shadow-sm my-2 rounded-md"
                        >
                            <div className="flex items-center justify-between">
                                {/* Left: Avatar + Info */}
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-[46px] w-[46px]">
                                        <AvatarImage
                                            src={request.avatar || "/placeholder.svg"}
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
                                            {t("posterRequest.joinedDate")} :{" "}
                                            {DateMaker(request.createdAt)}
                                        </p>
                                    </div>
                                </div>

                                {/* Right: Actions */}
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => handleApprove(request?.id)}
                                        className="bg-[#319E60] cursor-pointer px-[22px] py-[8px] text-white text-[16px] font-medium rounded-full hover:bg-[#267c4b]"
                                    >
                                        {t("posterRequest.approve")}
                                    </Button>
                                    <Link
                                        href={`/dashboard/admin/approvals/approval-details/${request?.id}`}
                                    >
                                        <Button
                                            variant="outline"
                                            className="border border-[#319E60] cursor-pointer text-[#319E60] text-[16px] font-medium rounded-full hover:bg-green-50"
                                        >
                                            {t("posterRequest.viewDetails")}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>{t("posterRequest.noRequests")}</div>
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
    )
}

export default PosterRequest
