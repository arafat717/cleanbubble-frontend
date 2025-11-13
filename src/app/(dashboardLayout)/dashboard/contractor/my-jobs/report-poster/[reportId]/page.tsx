/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, ImageIcon, Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useAddReportMutation } from "@/redux/api/publicePage/reviews.api"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

const reportReasons = [
    "Scammer",
    "Dangerous item",
    "Violence",
    "I don't like this",
    "Not available to buy",
    "Illegal harassment",
    "Null behavior",
    "Something else",
]

const ReportJobPosterForm = () => {
    const { t } = useTranslation()
    const id = useParams().reportId
    const [addReport] = useAddReportMutation()
    const router = useRouter()
    const [selectedReason, setSelectedReason] = useState("")
    const [description, setDescription] = useState("")
    const [photos, setPhotos] = useState<File[]>([])
    const [videos, setVideos] = useState<File[]>([])

    const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || [])
        setPhotos((prev) => [...prev, ...uploadedFiles])
    }

    const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || [])
        setVideos((prev) => [...prev, ...uploadedFiles])
    }

    const handleSubmit = async () => {
        if (!selectedReason) {
            toast.error(t("reportJobPoster.selectReason"))
            return
        }
        const formData = new FormData()
        const payload = { reportReason: selectedReason, description, reportedId: id }
        formData.append("data", JSON.stringify(payload))
        if (videos[0]) formData.append("video", videos[0])
        if (photos[0]) formData.append("photos", photos[0])

        const res = await addReport(formData)
        if (res.data) {
            toast.success(t("reportJobPoster.success"))
            router.push("/")
        } else {
            let errorMessage = t("reportJobPoster.error")
            if (res.error && "data" in res.error && (res.error as any).data?.message) {
                errorMessage = (res.error as any).data.message
            } else if (res.error && "message" in res.error && typeof (res.error as any).message === "string") {
                errorMessage = (res.error as any).message
            }
            toast.error(errorMessage)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-20 bg-white pb-10">
            <CardHeader className="pb-4">
                <h1 className="text-2xl sm:text-3xl md:text-[40px] font-medium text-[#17171A]">
                    {t("reportJobPoster.title")}
                </h1>
            </CardHeader>

            <CardContent className="space-y-6">
                {/* Why are you reporting */}
                <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#161616] mb-2">
                        {t("reportJobPoster.reasonTitle")}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#747474] mb-4">
                        {t("reportJobPoster.reasonDescription")}
                    </p>
                    <RadioGroup
                        value={selectedReason}
                        onValueChange={setSelectedReason}
                        className="space-y-2"
                    >
                        {reportReasons.map((reason) => (
                            <div
                                key={reason}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value={reason} id={reason} />
                                    <Label
                                        htmlFor={reason}
                                        className="text-sm sm:text-base text-[#161616] cursor-pointer"
                                    >
                                        {t(`reportJobPoster.reasons.${reason.replace(/\s+/g, "_")}`)}
                                    </Label>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 hidden sm:block" />
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {/* Description */}
                <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#161616] mb-2">
                        {t("reportJobPoster.rudeTitle")}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-[#2D2D2D] mb-3">
                        {t("reportJobPoster.rudeDescription")}
                    </p>
                    <Textarea
                        placeholder={t("reportJobPoster.descriptionPlaceholder")}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[80px] text-sm sm:text-base resize-none w-full"
                    />
                </div>

                {/* Attachments */}
                <div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#161616] mb-3">
                        {t("reportJobPoster.attachmentsTitle")}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {/* Photos */}
                        <div>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handlePhotoUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                                    <ImageIcon className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {t("reportJobPoster.uploadPhotos")}
                                    </p>
                                </div>
                            </div>
                            {photos.length > 0 &&
                                photos.map((file, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-200 rounded-lg p-2 bg-blue-50 mt-2 flex items-center space-x-2"
                                    >
                                        <ImageIcon className="h-4 w-4 text-blue-500" />
                                        <span className="text-xs sm:text-sm text-gray-600 truncate">{file.name}</span>
                                    </div>
                                ))}
                        </div>

                        {/* Videos */}
                        <div>
                            <div className="relative">
                                <input
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={handleVideoUpload}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                                    <Video className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {t("reportJobPoster.uploadVideos")}
                                    </p>
                                </div>
                            </div>
                            {videos.length > 0 &&
                                videos.map((file, i) => (
                                    <div
                                        key={i}
                                        className="border border-gray-200 rounded-lg p-2 bg-purple-50 mt-2 flex items-center space-x-2"
                                    >
                                        <Video className="h-4 w-4 text-purple-500" />
                                        <span className="text-xs sm:text-sm text-gray-600 truncate">{file.name}</span>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                {/* Submit button */}
                <Button
                    onClick={handleSubmit}
                    className="w-full py-2 sm:py-3 px-4 cursor-pointer bg-green-500 hover:bg-green-600 text-sm sm:text-base text-white font-semibold rounded-md"
                >
                    {t("reportJobPoster.submit")}
                </Button>
            </CardContent>
        </div>
    )
}

export default ReportJobPosterForm
