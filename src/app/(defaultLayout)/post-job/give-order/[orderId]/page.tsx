/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-phone-input-2/lib/style.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import '@/i18n'; // make sure this runs first


import { useGiveOrderMutation } from "@/redux/api/publicePage/homepage.api";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import { useGetMeQuery } from "@/redux/api/authApi";

import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";

const GiveOrder = () => {
    const id = useParams().orderId;
    const { data: userData } = useGetMeQuery('')
    const { t } = useTranslation();
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [photoFields, setPhotoFields] = useState<number[]>([0]);
    const [videoFields, setVideoFields] = useState<number[]>([0]);
    const [photos, setPhotos] = useState<(File | null)[]>([]);
    const [videos, setVideos] = useState<(File | null)[]>([]);
    const { data, isLoading } = useGetMeQuery("");
    const user = data?.data;
    const router = useRouter()

    const handlePhotoChange = (index: number, file: File | null) => {
        const newPhotos = [...photos];
        newPhotos[index] = file;
        setPhotos(newPhotos);
    };

    const handleVideoChange = (index: number, file: File | null) => {
        const newVideos = [...videos];
        newVideos[index] = file;
        setVideos(newVideos);
    };

    const addPhotoField = () => setPhotoFields((prev) => [...prev, prev.length]);
    const addVideoField = () => setVideoFields((prev) => [...prev, prev.length]);

    const [create] = useGiveOrderMutation();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<any>({
        defaultValues: {
            cleaningCategory: "",
            area: "",
            city: "",
            notification: "",
            ownTools: false,
        },
    });

    const onSubmit = async (data: any) => {
        if (!userData && userData?.data?.role !== 'USER') {
            return toast.error(t("postAJobForm.errorMessage"))
        }
        const toastId = toast.loading('Sending...');
        const formData = new FormData();

        const payload = {
            jobTitle: data.jobTitle,
            hasCleaningItems: data.hasCleaningItems,
            notification: data.notification,
            jobDescription: data.jobDescription,
            cleaningCategory: data.cleaningCategory,
            street: data.street,
            area: data.area,
            city: data.city,
            price: parseFloat(data.price),
            date: data.date,
            time: `${data.hour}:${data.minute} ${data.ampm}`,
            extraRequirements: data.extraRequirements,
            ownTools: data.ownTools,
            name: data.name,
            email: data.email,
            phone: data.phone,
        };

        if (isLoading) return <Loader />;

        formData.append("data", JSON.stringify(payload));

        if (data.thumbnail && data.thumbnail[0]) formData.append("thumbnail", data.thumbnail[0]);
        if (data.photos) {
            Object.values(data.photos).forEach((file: any) => {
                if (file?.[0]) formData.append("photos", file[0]);
            });
        }
        if (data.videos) {
            Object.values(data.videos).forEach((file: any) => {
                if (file?.[0]) formData.append("video", file[0]);
            });
        }

        const res = await create({ data: formData, id: id });
        if (res?.data) {
            toast.success(("Order Given Successfully!"), { id: toastId });
            router.push('/dashboard/user/my-order')
            reset();
        } else {
            toast.error(t("postAJobForm.error"), { id: toastId });
        }
    };

    return (
        <>
            {user?.role !== "CONTRACTOR" && (
                <div className="relative overflow-hidden min-h-[80vh] -mt-16">
                    <section className="py-10 sm:py-14 md:py-16">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="my-10 sm:my-14 md:my-20 text-center">
                                <span className="text-lg sm:text-xl md:text-2xl bg-[#14A0C1] px-4 sm:px-5 md:px-6 py-2 rounded-3xl font-medium font-roboto inline-block">
                                    {t("postAJobForm.topJobCategories")}
                                </span>

                                <div className="uppercase text-2xl sm:text-3xl md:text-[44px] font-medium leading-tight sm:leading-[48px] md:leading-11 flex flex-wrap justify-center gap-2 sm:gap-4 my-4 sm:my-6">
                                    <span>{t("postAJobForm.getTheCleaningDone")}</span>
                                    <div>
                                        <span className="text-[#14A0C1]">{t("postAJobForm.cleaning")}</span>
                                    </div>
                                    <span>{t("postAJobForm.doneWithoutStress")}</span>
                                </div>
                            </div>

                            <div className="p-4 sm:p-6 md:p-8 border border-gray-300 rounded-2xl">
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    {/* Job Title + Category */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* job title */}
                                        <div className="space-y-2">
                                            <Label htmlFor="jobTitle" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.jobTitle")}
                                            </Label>
                                            <Input
                                                className="px-[18px] h-[45px] sm:h-[50px]"
                                                id="jobTitle"
                                                placeholder={t("postAJobForm.jobTitle")}
                                                {...register("jobTitle", { required: true })}
                                            />
                                            {errors.jobTitle && (
                                                <p className="text-red-500 text-sm">{t("postAJobForm.jobTitleRequired")}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="cleaningCategory" className="text-base sm:text-lg md:text-[18px] font-[500] text-[#424242]">
                                                {t("postAJobForm.cleaningCategory")}
                                            </Label>
                                            <Controller
                                                control={control}
                                                name="cleaningCategory"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full h-[45px] sm:h-[50px] py-4 flex items-center">
                                                            <SelectValue placeholder={t("postAJobForm.cleaningCategory")} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="residential">{t("postAJobForm.residential")}</SelectItem>
                                                            <SelectItem value="commercial">{t("postAJobForm.commercial")}</SelectItem>
                                                            <SelectItem value="office">{t("postAJobForm.office")}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Job Description + Street */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jobDescription" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.jobDescription")}
                                            </Label>
                                            <Textarea
                                                id="jobDescription"
                                                placeholder={t("postAJobForm.jobDescription")}
                                                rows={3}
                                                {...register("jobDescription")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="street" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.street")}
                                            </Label>
                                            <Input
                                                id="street"
                                                className="px-[18px] h-[45px] sm:h-[50px]"
                                                placeholder={t("postAJobForm.street")}
                                                {...register("street")}
                                            />
                                        </div>
                                    </div>

                                    {/* Area + City */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="area" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.area")}
                                            </Label>
                                            <Input
                                                id="area"
                                                className="px-[18px] h-[45px] sm:h-[50px]"
                                                placeholder={t("postAJobForm.area")}
                                                {...register("area")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.city")}
                                            </Label>
                                            <Input
                                                id="city"
                                                className="px-[18px] h-[45px] sm:h-[50px]"
                                                placeholder={t("postAJobForm.city")}
                                                {...register("city")}
                                            />
                                        </div>
                                    </div>

                                    {/* Price + Date */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.price")}
                                            </Label>
                                            <Input
                                                id="price"
                                                className="px-[18px] h-[45px] sm:h-[50px]"
                                                placeholder={t("postAJobForm.price")}
                                                {...register("price")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.date")}
                                            </Label>
                                            <Input id="date" type="date" className="px-[18px] h-[45px] sm:h-[50px]" {...register("date")} />
                                        </div>
                                    </div>

                                    {/* Time + Extra Requirements */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="time">{t("postAJobForm.time")}</Label>
                                            <div className="flex flex-wrap sm:flex-nowrap gap-2">
                                                <select {...register("hour")} className="border px-3 py-2 rounded-md w-full sm:w-auto">
                                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                                        <option key={h} value={h}>
                                                            {h}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="flex items-center justify-center">:</span>
                                                <select {...register("minute")} className="border px-3 py-2 rounded-md w-full sm:w-auto">
                                                    {["00", "15", "30", "45"].map((m) => (
                                                        <option key={m} value={m}>
                                                            {m}
                                                        </option>
                                                    ))}
                                                </select>
                                                <select {...register("ampm")} className="border px-3 py-2 rounded-md w-full sm:w-auto">
                                                    <option value="AM">{t("postAJobForm.am")}</option>
                                                    <option value="PM">{t("postAJobForm.pm")}</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="extraRequirements">{t("postAJobForm.extraRequirements")}</Label>
                                            <Textarea
                                                id="extraRequirements"
                                                placeholder={t("postAJobForm.extraRequirements")}
                                                rows={2}
                                                {...register("extraRequirements")}
                                            />
                                        </div>

                                        <div className="flex items-start sm:items-center space-x-2 mt-6 border py-4 rounded-2xl px-5">
                                            <Controller
                                                control={control}
                                                name="hasCleaningItems"
                                                render={({ field }) => (
                                                    <Checkbox
                                                        className="h-5 w-5 border-2 border-gray-400 cursor-pointer"
                                                        id="hasCleaningItems"
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                )}
                                            />
                                            <Label htmlFor="hasCleaningItems" className="text-base sm:text-lg cursor-pointer">
                                                {t("postAJobForm.ownCleaningTools")}
                                            </Label>
                                        </div>
                                    </div>

                                    {/* File Upload Sections */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                                        {/* Thumbnail */}
                                        <div className="flex flex-col items-center w-full">
                                            <label className="text-sm font-medium mb-2">{t("postAJobForm.uploadThumbnail")}</label>
                                            <div className="w-full h-36 sm:h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative">
                                                <IoCameraSharp className="text-3xl text-green-600" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    {...register("thumbnail")}
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        setThumbnail(file || null);
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">{t("postAJobForm.thumbnailInfo")}</p>
                                            {thumbnail && <p className="text-xs text-gray-700 mt-1 truncate">{thumbnail.name}</p>}
                                        </div>

                                        {/* Photos */}
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium">{t("postAJobForm.uploadPhotos")}</label>
                                                <button type="button" onClick={addPhotoField} className="text-xs text-green-600 hover:underline">
                                                    {t("postAJobForm.addNew")}
                                                </button>
                                            </div>

                                            {photoFields.map((field, index) => (
                                                <div key={field} className="mb-3">
                                                    <div className="w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                                                        <IoCameraSharp className="text-3xl text-green-600" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            {...register(`photos.${index}`)}
                                                            onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                    {photos[index] && <p className="text-xs text-gray-700 mt-1 truncate">{photos[index]?.name}</p>}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Videos */}
                                        <div className="flex flex-col w-full">
                                            <div className="flex justify-between mb-2">
                                                <label className="text-sm font-medium">{t("postAJobForm.uploadVideos")}</label>
                                                <button type="button" onClick={addVideoField} className="text-xs text-green-600 hover:underline">
                                                    {t("postAJobForm.addNew")}
                                                </button>
                                            </div>

                                            {videoFields.map((field, index) => (
                                                <div key={field} className="mb-3">
                                                    <div className="w-full h-28 sm:h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                                                        🎥
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            {...register(`videos.${index}`)}
                                                            onChange={(e) => handleVideoChange(index, e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                    {videos[index] && <p className="text-xs text-gray-700 mt-1 truncate">{videos[index]?.name}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Contact Information */}
                                    <div className="border-t pt-8">
                                        <h4 className="text-2xl sm:text-3xl md:text-[30px] text-[#17171A] font-semibold mb-6">
                                            {t("postAJobForm.contactInformation")}
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.name")}
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="px-[18px] h-[45px] sm:h-[50px]"
                                                    placeholder={t("postAJobForm.name")}
                                                    {...register("name")}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.email")}
                                                </Label>
                                                <Input
                                                    className="px-[18px] h-[45px] sm:h-[50px]"
                                                    id="email"
                                                    type="email"
                                                    placeholder={t("postAJobForm.emailPlaceholder")}
                                                    {...register("email")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2 w-full">
                                                <Label htmlFor="phone" className="text-base sm:text-lg md:text-[18px] font-medium text-[#424242]">
                                                    {t("postAJobForm.phone")}
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="phone"
                                                    render={({ field }) => (
                                                        <PhoneInput
                                                            {...field}
                                                            country={"mz"}
                                                            enableSearch={true}
                                                            onChange={(value, country, e, formattedValue) => field.onChange(formattedValue)}
                                                            inputProps={{
                                                                name: "phone",
                                                                required: true,
                                                                className:
                                                                    "w-full h-[45px] sm:h-[50px] px-14 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-[#14A0C1] focus:outline-none",
                                                            }}
                                                            containerClass="w-full"
                                                            buttonClass="rounded-l-lg border bg-gray-50 px-2"
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="notification" className="text-base sm:text-lg md:text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.notificationPreference")}
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="notification"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="w-full h-[45px] sm:h-[50px] py-4 flex items-center">
                                                                <SelectValue placeholder={t("postAJobForm.notificationPreference")} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="in-app">{t("postAJobForm.inAppNotifications")}</SelectItem>
                                                                <SelectItem value="email">{t("postAJobForm.emailNotifications")}</SelectItem>
                                                                <SelectItem value="sms">{t("postAJobForm.smsNotifications")}</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full h-[45px] sm:h-[50px] bg-[#319E60] cursor-pointer hover:bg-[#319E60]/90 text-primary-foreground py-4 text-base sm:text-lg" type="submit">
                                        {t("postAJobForm.postNow")}
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </>


    );
};

export default GiveOrder;
