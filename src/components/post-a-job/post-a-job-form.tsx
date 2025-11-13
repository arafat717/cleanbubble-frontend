/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "react-phone-input-2/lib/style.css";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import '@/i18n'; // make sure this runs first
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useCreatePostMutation } from "@/redux/api/publicePage/homepage.api";
import { IoCameraSharp } from "react-icons/io5";
import { toast } from "sonner";
import PhoneInput from "react-phone-input-2";
import { useGetMeQuery } from "@/redux/api/authApi";
import Loader from "../shared/Loader";
import { useTranslation } from "react-i18next";

const PostAJobForm = () => {
    const { data: userData } = useGetMeQuery('')
    // console.log("getMe=>", userData)
    const { t } = useTranslation();
    const [thumbnail, setThumbnail] = useState<File | null>(null);
    const [photoFields, setPhotoFields] = useState<number[]>([0]);
    const [videoFields, setVideoFields] = useState<number[]>([0]);
    const [photos, setPhotos] = useState<(File | null)[]>([]);
    const [videos, setVideos] = useState<(File | null)[]>([]);
    const { data, isLoading } = useGetMeQuery("");
    const user = data?.data;

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

    const [create] = useCreatePostMutation();
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
        if (!userData) {
            return toast.error(t("postAJobForm.errorMessage"))
        }

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
            time: `${data.hour}:${data.minute}`,
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

        const res = await create(formData);
        if (res?.data) {
            toast.success(t("postAJobForm.success"));
            reset();
        } else {
            // ✅ Show backend error message if available
            const errorMessage = (res?.error as any)?.data?.message || (res?.error as any)?.message || "Something went wrong!";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            {user?.role !== "CONTRACTOR" && (
                <div className="relative overflow-hidden min-h-[80vh] -mt-16">
                    <section className="py-16">
                        <div className="max-w-7xl mx-auto md:px-4">
                            <div className="my-10 sm:my-16 md:my-20 text-center px-4">
                                {/* Top badge */}
                                <span className="text-base sm:text-xl md:text-2xl bg-[#14A0C1] px-3 sm:px-6 py-1.5 sm:py-2 rounded-3xl font-medium font-roboto inline-block">
                                    {t("postAJobForm.topJobCategories")}
                                </span>

                                {/* Main heading */}
                                <div className="uppercase text-2xl sm:text-3xl md:text-[44px] font-medium leading-snug sm:leading-tight md:leading-[2.75rem] flex flex-wrap justify-center gap-2 sm:gap-4 my-4 sm:my-6">
                                    <span>{t("postAJobForm.getTheCleaningDone")}</span>
                                    <div>
                                        <span className="text-[#14A0C1]">{t("postAJobForm.cleaning")}</span>
                                    </div>
                                    <span>{t("postAJobForm.doneWithoutStress")}</span>
                                </div>
                            </div>


                            <div className="md:p-8 p-2 border border-gray-300 rounded-2xl">
                                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                    {/* Job Title + Category */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jobTitle" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.jobTitle")}
                                            </Label>
                                            <Input
                                                className="px-[18px] h-[50px]"
                                                id="jobTitle"
                                                placeholder={t("postAJobForm.jobTitle")}
                                                {...register("jobTitle", { required: true })}
                                            />
                                            {errors.jobTitle && <p className="text-red-500 text-sm">{t("postAJobForm.jobTitleRequired")}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="cleaningCategory" className="text-[18px] font-[500] text-[#424242]">
                                                {t("postAJobForm.cleaningCategory")}
                                            </Label>
                                            <Controller
                                                control={control}
                                                name="cleaningCategory"
                                                render={({ field }) => (
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
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
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="jobDescription" className="text-[18px] font-[500px] text-[#424242]">
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
                                            <Label htmlFor="street" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.street")}
                                            </Label>
                                            <Input
                                                id="street"
                                                className="px-[18px] h-[50px]"
                                                placeholder={t("postAJobForm.street")}
                                                {...register("street")}
                                            />
                                        </div>
                                    </div>

                                    {/* Area + City */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="area" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.area")}
                                            </Label>
                                            <Input
                                                id="area"
                                                className="px-[18px] h-[50px]"
                                                placeholder={t("postAJobForm.area")}
                                                {...register("area")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.city")}
                                            </Label>
                                            <Input
                                                id="city"
                                                className="px-[18px] h-[50px]"
                                                placeholder={t("postAJobForm.city")}
                                                {...register("city")}
                                            />
                                        </div>
                                    </div>

                                    {/* Price + Date */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="price" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.price")}
                                            </Label>
                                            <Input
                                                id="price"
                                                className="px-[18px] h-[50px]"
                                                placeholder={`€ ${t("postAJobForm.price")}`}
                                                {...register("price")}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="date" className="text-[18px] font-[500px] text-[#424242]">
                                                {t("postAJobForm.date")}
                                            </Label>
                                            <Input id="date" type="date" className="px-[18px] h-[50px]" {...register("date")} />
                                        </div>
                                    </div>

                                    {/* Time + Extra Requirements */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="time">{t("postAJobForm.time")}</Label>
                                            <div className="flex gap-2">
                                                {/* Hour select: 0 to 23 */}
                                                <select {...register("hour")} className="border px-3 py-2 rounded-md">
                                                    {Array.from({ length: 24 }, (_, i) => i).map((h) => (
                                                        <option key={h} value={h}>
                                                            {h.toString().padStart(2, "0")}
                                                        </option>
                                                    ))}
                                                </select>

                                                <span className="flex items-center">:</span>

                                                {/* Minute select */}
                                                <select {...register("minute")} className="border px-3 py-2 rounded-md">
                                                    {["00", "15", "30", "45"].map((m) => (
                                                        <option key={m} value={m}>
                                                            {m}
                                                        </option>
                                                    ))}
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

                                        <div className="flex items-center space-x-2 mt-6 border py-4 rounded-2xl px-5">
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
                                            <Label htmlFor="hasCleaningItems" className="text-lg cursor-pointer">
                                                {t("postAJobForm.ownCleaningTools")}
                                            </Label>
                                        </div>
                                    </div>

                                    {/* Thumbnail */}
                                    <div className="grid md:grid-cols-3 gap-5">
                                        <div className="flex flex-col items-center w-full">
                                            <label className="text-sm font-medium mb-2">{t("postAJobForm.uploadThumbnail")}</label>
                                            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer relative">
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
                                            {thumbnail && <p className="text-xs text-gray-700 mt-1">{thumbnail.name}</p>}
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
                                                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                                                        <IoCameraSharp className="text-3xl text-green-600" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            {...register(`photos.${index}`)}
                                                            onChange={(e) => handlePhotoChange(index, e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                    {photos[index] && <p className="text-xs text-gray-700 mt-1">{photos[index]?.name}</p>}
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
                                                    <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative">
                                                        🎥
                                                        <input
                                                            type="file"
                                                            accept="video/*"
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            {...register(`videos.${index}`)}
                                                            onChange={(e) => handleVideoChange(index, e.target.files?.[0] || null)}
                                                        />
                                                    </div>
                                                    {videos[index] && <p className="text-xs text-gray-700 mt-1">{videos[index]?.name}</p>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="border-t pt-8">
                                        <h4 className="text-[30px] text-[#17171A] font-[600px] mb-6">{t("postAJobForm.contactInformation")}</h4>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.name")}
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="px-[18px] h-[50px]"
                                                    placeholder={t("postAJobForm.name")}
                                                    {...register("name")}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.email")}
                                                </Label>
                                                <Input
                                                    className="px-[18px] h-[50px]"
                                                    id="email"
                                                    type="email"
                                                    placeholder={t("postAJobForm.emailPlaceholder")}
                                                    {...register("email")}
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2 w-full">
                                                <Label htmlFor="phone" className="text-[18px] font-medium text-[#424242]">
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
                                                                    "w-full h-[50px] px-14 border rounded-lg text-sm sm:text-base focus:ring-2 focus:ring-[#14A0C1] focus:outline-none",
                                                            }}
                                                            containerClass="w-full"
                                                            buttonClass="rounded-l-lg border bg-gray-50 px-2"
                                                        />
                                                    )}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="notification" className="text-[18px] font-[500px] text-[#424242]">
                                                    {t("postAJobForm.notificationPreference")}
                                                </Label>
                                                <Controller
                                                    control={control}
                                                    name="notification"
                                                    render={({ field }) => (
                                                        <Select onValueChange={field.onChange} value={field.value}>
                                                            <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
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

                                    <Button
                                        className="w-full h-[50px] bg-[#319E60] cursor-pointer hover:bg-[#319E60]/90 text-primary-foreground py-4 text-lg"
                                        type="submit"
                                    >
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

export default PostAJobForm;
