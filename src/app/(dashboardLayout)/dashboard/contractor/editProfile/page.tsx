/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { Settings, Upload, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useGetMeQuery } from "@/redux/api/authApi"
import Loader from "@/components/shared/Loader"
import { useGetSingleUserQuery } from "@/redux/api/admin/approve.api"
import DateMaker from "@/utils/DateMaker"
import { useUpdateUserMutation } from "@/redux/api/user/myorder.api"
import { toast } from "sonner"
import Link from "next/link"
import { useTranslation } from "react-i18next"

export default function ProfileSettings() {
    const { t } = useTranslation()
    const { data } = useGetMeQuery("")
    const id = data?.data?.id
    const { data: userData, isLoading } = useGetSingleUserQuery(id)
    const [updateUser] = useUpdateUserMutation()
    const [profileFile, setProfileFile] = useState<File | null>(null)

    const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
    const [newService, setNewService] = useState("")

    const [isServiceAreaModalOpen, setIsServiceAreaModalOpen] = useState(false)
    const [newServiceArea, setNewServiceArea] = useState("")

    const { register, handleSubmit, control, reset, setValue, watch, formState: { isSubmitting } } =
        useForm({
            defaultValues: {
                bio: "",
                serviceAreas: [] as string[],
                services: [] as string[],
                fromDate: "",
                toDate: "",
                fromTime: "",
                toTime: "",
                companyName: "",
                companyPhone: "",
                companyEmail: "",
                companyAddress: "",
                contractorName: "",
                personalPhone: "",
                personalEmail: "",
                hour: "9",
                minute: "00",
                ampm: "AM",
            },
        })

    const services = watch("services") || []
    const serviceAreas = watch("serviceAreas") || []

    function addChip(field: "services" | "serviceAreas", value: string) {
        if (!value.trim()) return
        const current = watch(field) || []
        if (!current.includes(value)) {
            setValue(field, [...current, value])
        }
    }

    function removeChip(field: "services" | "serviceAreas", value: string) {
        const current = watch(field) || []
        setValue(
            field,
            current.filter((s: string) => s !== value)
        )
    }

    useEffect(() => {
        if (userData?.data) {
            const u = userData.data
            reset({
                bio: u.Company?.[0]?.bio || "",
                services: u.Company?.[0]?.services || [],
                serviceAreas: u.Company?.[0]?.serviceAreas || [],
                fromDate: DateMaker(u.Company?.[0]?.availableDate) || "",
                toDate: DateMaker(u.Company?.[0]?.availableDate) || "",
                fromTime: u.Company?.[0]?.availableStartTime || "",
                toTime: u.Company?.[0]?.availableEndTime || "",
                companyName: u.Company?.[0]?.companyName || "",
                companyPhone: u.Company?.[0]?.companyPhone || "",
                companyEmail: u.Company?.[0]?.companyEmail || "",
                companyAddress: u.Company?.[0]?.fullAddress || "",
                contractorName: u.fullName || "",
                personalPhone: u.phone || "",
                personalEmail: u.email || "",
                hour: "9",
                minute: "00",
                ampm: "AM",
            })
        }
    }, [userData, reset])

    const onSubmit = async (formData: any) => {
        try {
            const body = {
                fullName: formData.contractorName,
                phone: formData.personalPhone,
                email: formData.personalEmail,
                role: "CONTRACTOR",
                companyName: formData.companyName,
                companyPhone: formData.companyPhone,
                companyEmail: formData.companyEmail,
                fullAddress: formData.companyAddress,
                bio: formData.bio,
                services: formData.services || [],
                serviceAreas: formData.serviceAreas || [],
                paymentMethod: "Stripe",
            }

            const fd = new FormData()
            fd.append("data", JSON.stringify(body))
            if (profileFile) {
                fd.append("profile", profileFile)
            }

            const res = await updateUser(fd).unwrap()
            if (res?.data) {
                toast.success(t("profileEdit.profileUpdated"))
            } else {
                toast.error(t("profileEdit.updateFailed"))
            }
        } catch (error) {
            toast.error(t("profileEdit.updateFailed"))
        }
    }

    if (isLoading) return <Loader />

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl relative">
            <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-[#17171A] gap-2 text-[40px] font-[500px]">
                    <Settings className="h-[54px] w-[54px]" />
                    {t("profileEdit.profileSettings")}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
                {/* Profile Photo */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-[130px] w-[130px]">
                        <AvatarImage
                            src={
                                profileFile
                                    ? URL.createObjectURL(profileFile)
                                    : userData?.data?.profileImage || userData?.data?.Company?.[0]?.companyPhoto
                            }
                            alt="Profile"
                        />
                        <AvatarFallback>
                            {userData?.data?.fullName
                                ? userData.data.fullName.charAt(0)
                                : "JD"}
                        </AvatarFallback>
                    </Avatar>

                    <Label className="cursor-pointer">
                        <div className="flex items-center px-4 py-2 bg-[#2C8E56] text-white rounded-md">
                            <Upload className="h-4 w-4 mr-2" />
                            {t("profileEdit.uploadNewPhoto")}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) setProfileFile(file)
                            }}
                        />
                    </Label>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                    <Label htmlFor="bio">{t("profileEdit.addBio")}</Label>
                    <Textarea id="bio" {...register("bio")} className="min-h-[80px]" />
                </div>

                {/* Services */}
                <div className="space-y-2">
                    <Label>{t("profileEdit.addServices")}</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {services.map((service: string, i: number) => (
                            <span
                                key={i}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                                {service}
                                <button type="button" onClick={() => removeChip("services", service)}>
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            </span>
                        ))}
                        <button
                            type="button"
                            onClick={() => setIsServiceModalOpen(true)}
                            className="flex items-center px-2 py-1 border rounded-md text-sm"
                        >
                            <Plus className="w-4 h-4 mr-1" /> {t("profileEdit.addMore")}
                        </button>
                    </div>
                </div>

                {/* Service Areas */}
                <div className="space-y-2">
                    <Label>{t("profileEdit.addServiceAreas")}</Label>
                    <div className="flex flex-wrap gap-2 p-2 border rounded-md">
                        {serviceAreas.map((area: string, i: number) => (
                            <span
                                key={i}
                                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm"
                            >
                                {area}
                                <button type="button" onClick={() => removeChip("serviceAreas", area)}>
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>
                            </span>
                        ))}
                        <button
                            type="button"
                            onClick={() => setIsServiceAreaModalOpen(true)}
                            className="flex items-center px-2 py-1 border rounded-md text-sm"
                        >
                            <Plus className="w-4 h-4 mr-1" /> {t("profileEdit.addMore")}
                        </button>
                    </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                    <Label>{t("profileEdit.availability")}</Label>
                    <div className="grid grid-cols-2 gap-4">
                        <Input {...register("fromDate")} placeholder={t("profileEdit.fromDate")} />
                        <Input {...register("toDate")} placeholder={t("profileEdit.toDate")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time">{t("profileEdit.time")}</Label>
                        <div className="flex gap-2">
                            <select {...register("hour")} className="border px-3 py-2 rounded-md">
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                            <span>:</span>
                            <select {...register("minute")} className="border px-3 py-2 rounded-md">
                                {["00", "15", "30", "45"].map((m) => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </select>
                            <select {...register("ampm")} className="border px-3 py-2 rounded-md">
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Company Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Input {...register("companyName")} placeholder={t("profileEdit.companyName")} />
                    <Controller
                        name="companyPhone"
                        control={control}
                        render={({ field }) => (
                            <PhoneInput {...field} country={"us"} inputStyle={{ width: "100%" }} />
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Input {...register("companyEmail")} placeholder={t("profileEdit.companyEmail")} />
                    <Input {...register("companyAddress")} placeholder={t("profileEdit.companyAddress")} />
                </div>

                {/* Personal Info */}
                <div className="grid grid-cols-2 gap-4">
                    <Input {...register("contractorName")} placeholder={t("profileEdit.contractorName")} />
                    <Controller
                        name="personalPhone"
                        control={control}
                        render={({ field }) => (
                            <PhoneInput {...field} country={"us"} inputStyle={{ width: "100%" }} />
                        )}
                    />
                </div>
                <Input {...register("personalEmail")} readOnly placeholder={t("profileEdit.personalEmail")} />

                {/* Save + Cancel */}
                <div className="flex gap-3 pt-6">
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                        {isSubmitting ? t("profileEdit.saving") : t("profileEdit.saveChanges")}
                    </Button>
                    <Link href={'/dashboard/contractor/profile-settings'}>
                        <Button type="button" variant="outline" className="flex-1 bg-transparent">
                            {t("profileEdit.cancel")}
                        </Button>
                    </Link>
                </div>
            </CardContent>

            {/* Service Modal */}
            {isServiceModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-80">
                        <h2 className="text-lg font-semibold mb-4">{t("profileEdit.addServices")}</h2>
                        <input
                            type="text"
                            value={newService}
                            onChange={(e) => setNewService(e.target.value)}
                            placeholder={t("profileEdit.enterServiceName")}
                            className="w-full border px-3 py-2 rounded-md mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => {
                                    setNewService("")
                                    setIsServiceModalOpen(false)
                                }}
                            >
                                {t("profileEdit.cancel")}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={() => {
                                    if (newService.trim() !== "") {
                                        addChip("services", newService)
                                        setNewService("")
                                        setIsServiceModalOpen(false)
                                    }
                                }}
                            >
                                {t("profileEdit.add")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Service Area Modal */}
            {isServiceAreaModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md w-80">
                        <h2 className="text-lg font-semibold mb-4">{t("profileEdit.addServiceAreas")}</h2>
                        <input
                            type="text"
                            value={newServiceArea}
                            onChange={(e) => setNewServiceArea(e.target.value)}
                            placeholder={t("profileEdit.enterPostcodeOrArea")}
                            className="w-full border px-3 py-2 rounded-md mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded-md"
                                onClick={() => {
                                    setNewServiceArea("")
                                    setIsServiceAreaModalOpen(false)
                                }}
                            >
                                {t("profileEdit.cancel")}
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-green-500 text-white rounded-md"
                                onClick={() => {
                                    if (newServiceArea.trim() !== "") {
                                        addChip("serviceAreas", newServiceArea)
                                        setNewServiceArea("")
                                        setIsServiceAreaModalOpen(false)
                                    }
                                }}
                            >
                                {t("profileEdit.add")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </form>
    )
}
