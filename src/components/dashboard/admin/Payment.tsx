/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useGetAllPaymentStatusQuery } from "@/redux/api/publicePage/reviews.api"
import DateMaker from "@/utils/DateMaker"
import { useTranslation } from "react-i18next"
import Loader from "@/components/shared/Loader"

export function PaymentsDashboard() {
    const { t } = useTranslation()
    const { data, isLoading } = useGetAllPaymentStatusQuery('')
    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className="max-w-7xl px-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FileText className="h-[46px] w-[46px]" />
                    <h1 className="text-[40px] text-[#17171A] font-[500px]">{t('payments.header')}</h1>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-lg border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b bg-muted/50">
                                <th className="text-left p-4 font-[500] text-[20px] text-[#5A27E5]">{t('payments.date')}</th>
                                <th className="text-left p-4 font-[500] text-[20px] text-[#5A27E5]">{t('payments.type')}</th>
                                <th className="text-left p-4 font-[500] text-[20px] text-[#5A27E5]">{t('payments.user')}</th>
                                <th className="text-left p-4 font-[500] text-[20px] text-[#5A27E5]">{t('payments.amount')}</th>
                                <th className="text-left p-4 font-[500] text-[20px] text-[#5A27E5]">{t('payments.platformEarning')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.data?.transactions?.map((payment: any, index: any) => (
                                <tr
                                    key={index}
                                    className={`border-b last:border-b-0 hover:bg-muted/30 transition-colors ${index % 2 === 1 ? "bg-muted/20" : ""}`}
                                >
                                    <td className="p-4 text-[#2D2D2D]">{DateMaker(payment.date)}</td>
                                    <td className="p-4">
                                        <Badge
                                            variant={payment.type === "Job" ? "secondary" : "default"}
                                            className={
                                                payment.type === "Job"
                                                    ? "bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-400"
                                                    : "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400"
                                            }
                                        >
                                            {t(`payments.types.${payment.type.toLowerCase()}`)}
                                        </Badge>
                                    </td>
                                    <td className="p-4 text-sm">{payment.user}</td>
                                    <td className="p-4 text-sm font-medium">{payment.amount}</td>
                                    <td className="p-4 text-sm font-medium">{payment.platformEarning}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
