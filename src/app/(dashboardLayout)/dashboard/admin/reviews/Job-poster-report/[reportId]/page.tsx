/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { ArrowLeft, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useParams, useRouter } from "next/navigation"
import { useGetSingleReportQuery } from "@/redux/api/admin/repost.api"
import { useForm, Controller } from "react-hook-form"
import { useState } from "react"
import { useAdminReportMutation, useSentNotificationMutation } from "@/redux/api/admin/approve.api"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import Loader from "@/components/shared/Loader"

const ReportDetailsTranslated = () => {
    const { t } = useTranslation()
    const id = useParams().reportId
    const { data, isLoading } = useGetSingleReportQuery(id)
    const [isPlaying, setIsPlaying] = useState(false)
    const [reportAction, { isLoading: isSending }] = useAdminReportMutation()
    const [sendNotification] = useSentNotificationMutation()
    const router = useRouter()

    const reportedId = data?.data?.reportedId

    const { handleSubmit, control } = useForm<{ action: string }>({
        defaultValues: { action: "" },
    })

    const onSubmit = async (formData: { action: string }) => {
        if (!formData.action) return toast.error(t('reportDetails.selectAction'))
        try {
            const result = await reportAction({
                id: reportedId,
                action: formData.action,
            }).unwrap()
            if (result?.data?.message) {
                const payload = {
                    userId: result?.data?.user?.id,
                    title: result?.data?.user?.status,
                    body: result?.data?.message
                }
                const res = await sendNotification(payload)
                if (res?.data) toast.success(t('reportDetails.notificationSent'))
                else toast.error(t('reportDetails.notificationFailed'))
            }
            router.push('/dashboard/admin/reviews')
        } catch (error) {
            toast.error(t('reportDetails.actionFailed'))
        }
    }

    if (isLoading) return <Loader></Loader>
    const user = data?.data

    return (
        <div className="max-w-6xl px-2 md:px-10 min-h-screen pb-20">
            {/* Header */}
            <div className="flex items-center gap-3 p-4">
                <Link href={'/dashboard/admin/reviews'}>
                    <ArrowLeft className="w-[46px] h-[46px] text-gray-700" />
                </Link>
                <h1 className="text-[40px] font-[500] text-[#17171A]">{t('reportDetails.header')}</h1>
            </div>

            <div className="p-4 space-y-6 mx-4 mt-4 rounded-lg">
                {/* Reporter Info */}
                <div className="flex items-start space-x-3">
                    <Avatar className="w-12 h-12 flex-shrink-0">
                        <AvatarImage src={user?.photos?.[0]} alt="Reporter" />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-red-500 text-white font-semibold">
                            {user?.reporter?.fullName?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <h2 className="font-[500] text-[#17171A] text-[30px] mb-2">{user?.reporter?.fullName}</h2>
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-start">
                                <span className="font-medium text-gray-700 text-2xl mr-2">{t('reportDetails.report')}:</span>
                                <span className="text-[#17171A] text-2xl font-medium">{user?.reported?.fullName}</span>
                            </div>
                            <div className="flex items-start">
                                <span className="font-[500] text-gray-700 mr-2 text-[24px] flex-shrink-0">{t('reportDetails.description')}:</span>
                                <span className="text-[#17171A] text-[24px] font-[500]">{user?.description}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Attachments */}
                <div>
                    <h3 className="text-[36px] font-[600] text-[#222] mb-3">{t('reportDetails.attachments')}</h3>

                    <div className="relative w-full h-40 md:h-96 rounded-lg overflow-hidden bg-gray-200 mb-4">
                        {!isPlaying ? (
                            <div className="w-full h-full relative cursor-pointer" onClick={() => setIsPlaying(true)}>
                                <Image src={user?.photos[0]} alt="Thumbnail" fill className="object-cover" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white bg-opacity-80 rounded-full p-3">
                                        <Play className="w-8 h-8 text-gray-700" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <video src={user?.video} controls autoPlay className="w-full h-full object-cover rounded-lg" />
                        )}
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {user?.photos?.map((i: any) => (
                            <div key={i} className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                                <Image src={i} alt={`Attachment ${i}`} width={80} height={80} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Take Action Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg p-4">
                    <Controller
                        name="action"
                        control={control}
                        render={({ field }) => (
                            <select {...field} className="w-full p-3 border border-gray-300 rounded-md hover:border-gray-400">
                                <option value="">{t('reportDetails.selectAction')}</option>
                                <option value="WARN">{t('reportDetails.sendWarning')}</option>
                                <option value="PERM_BLOCK">{t('reportDetails.permBlock')}</option>
                            </select>
                        )}
                    />
                    <button
                        type="submit"
                        disabled={isSending}
                        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-300"
                    >
                        {isSending ? t('reportDetails.sending') : t('reportDetails.submitAction')}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ReportDetailsTranslated
