/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Controller, useForm } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdatePostMutation } from "@/redux/api/publicePage/homepage.api";
import { Label } from "@/components/ui/label";
import { IoCameraSharp } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import { useParams, useRouter } from "next/navigation";
import { useGetSinglePostQuery } from "@/redux/api/admin/approve.api";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Loader from "@/components/shared/Loader";

const EditJob = () => {
    const { t } = useTranslation();
    const id = useParams().editId as string;
    const { data, isLoading } = useGetSinglePostQuery(id);
    console.log("Full data:", data?.data);
    const router = useRouter();

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [photoFiles, setPhotoFiles] = useState<(File | null)[]>([]);
    const [videoFiles, setVideoFiles] = useState<(File | null)[]>([]);
    const [deletedPhotos, setDeletedPhotos] = useState<string[]>([]);
    const [formKey, setFormKey] = useState(0);

    const [update] = useUpdatePostMutation();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm<any>();

    // Reset form with API data
    useEffect(() => {
        if (data?.data) {
            const job = data.data;
            console.log("Setting form data...");
            console.log("cleaningCategory:", job.cleaningCategory);
            console.log("notification:", job.notification);
            console.log("phone:", job.phone);

            let hour = "1", minute = "00", ampm = "AM";
            if (job.time) {
                const timeParts = job.time.split(" ");
                if (timeParts.length === 2) {
                    const [time, meridiem] = timeParts;
                    const [h, m] = time.split(":");
                    hour = h || "1";
                    minute = m || "00";
                    ampm = meridiem || "AM";
                }
            }

            const formData = {
                jobTitle: job.jobTitle || "",
                cleaningCategory: job.cleaningCategory || "",
                jobDescription: job.jobDescription || "",
                street: job.street || "",
                area: job.area || "",
                city: job.city || "",
                price: job.price || "",
                date: job.date ? job.date.split("T")[0] : "",
                hour: hour,
                minute: minute,
                ampm: ampm,
                extraRequirements: job.extraRequirements || "",
                hasCleaningItems: Boolean(job.hasCleaningItems),
                name: job.user?.fullName || "",
                email: job.user?.email || "",
                phone: job.phone || job.user?.phone || "",
                notification: job.notification || "",
            };

            console.log("Form data to reset:", formData);
            reset(formData);

            // Force re-render of form after reset
            setFormKey(prev => prev + 1);

            // Set media previews
            setThumbnailPreview(job.thumbnail || null);

            // Handle photos array
            const photos = Array.isArray(job.photos) ? job.photos : [];
            setPhotoPreviews(photos);
            setPhotoFiles(new Array(photos.length).fill(null));

            // Handle video - can be string or array
            let videos: string[] = [];
            if (job.video) {
                videos = Array.isArray(job.video) ? job.video : [job.video];
            } else if (job.videos) {
                videos = Array.isArray(job.videos) ? job.videos : [job.videos];
            }
            setVideoPreviews(videos);
            setVideoFiles(new Array(videos.length).fill(null));
        }
    }, [data, reset]);

    const handleThumbnailChange = (file: File | null) => {
        if (thumbnailPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbnailPreview);
        setThumbnailFile(file);
        setThumbnailPreview(file ? URL.createObjectURL(file) : null);
    };

    const handlePhotoChange = (index: number, file: File | null) => {
        const newFiles = [...photoFiles];
        const newPreviews = [...photoPreviews];
        if (newPreviews[index]?.startsWith("blob:")) URL.revokeObjectURL(newPreviews[index]);
        newFiles[index] = file;
        newPreviews[index] = file ? URL.createObjectURL(file) : "";
        setPhotoFiles(newFiles);
        setPhotoPreviews(newPreviews);
    };

    const handleVideoChange = (index: number, file: File | null) => {
        const newFiles = [...videoFiles];
        const newPreviews = [...videoPreviews];
        if (newPreviews[index]?.startsWith("blob:")) URL.revokeObjectURL(newPreviews[index]);
        newFiles[index] = file;
        newPreviews[index] = file ? URL.createObjectURL(file) : "";
        setVideoFiles(newFiles);
        setVideoPreviews(newPreviews);
    };

    const addPhotoField = () => {
        setPhotoPreviews(prev => [...prev, ""]);
        setPhotoFiles(prev => [...prev, null]);
    };


    const removePhotoField = (index: number) => {
        const photoUrl = photoPreviews[index];

        // If it's an existing photo (not a blob URL), add it to deleted list
        if (photoUrl && !photoUrl.startsWith("blob:")) {
            setDeletedPhotos(prev => [...prev, photoUrl]);
        }

        // Clean up blob URL if it exists
        if (photoUrl?.startsWith("blob:")) {
            URL.revokeObjectURL(photoUrl);
        }

        // Remove from arrays
        setPhotoPreviews(prev => prev.filter((_, i) => i !== index));
        setPhotoFiles(prev => prev.filter((_, i) => i !== index));
    };

    const removeVideoField = (index: number) => {
        if (videoPreviews[index]?.startsWith("blob:")) URL.revokeObjectURL(videoPreviews[index]);
        setVideoPreviews(prev => prev.filter((_, i) => i !== index));
        setVideoFiles(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        return () => {
            if (thumbnailPreview?.startsWith("blob:")) URL.revokeObjectURL(thumbnailPreview);
            photoPreviews.forEach(preview => {
                if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
            });
            videoPreviews.forEach(preview => {
                if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
            });
        };
    }, []);

    const onSubmit = async (formData: any) => {
        console.log("Submitting form data:", formData);
        console.log("Deleted photos:", deletedPhotos);
        const toastId = toast.loading(t("postEdit.loading"));
        const submitData = new FormData();

        // Add deletedPhotos to the data object
        submitData.append("data", JSON.stringify({
            ...formData,
            price: parseFloat(formData.price),
            time: `${formData.hour}:${formData.minute} ${formData.ampm}`,
            deletedPhotos: deletedPhotos // Send deleted photos to backend
        }));

        if (thumbnailFile) submitData.append("thumbnail", thumbnailFile);
        photoFiles.forEach(file => file && submitData.append("photos", file));
        videoFiles.forEach(file => file && submitData.append("video", file));

        try {
            const res = await update({ id, body: submitData });
            if (res?.data) {
                toast.success(`${t("postEdit.updatePost")} ${t("postEdit.success")}`, { id: toastId });
                router.push("/dashboard/user/my-order");
            } else {
                toast.error(t("postEdit.error"), { id: toastId });
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error(t("postEdit.error"), { id: toastId });
        }
    };

    if (isLoading) return <Loader></Loader>;

    return (
        <Card className="max-w-7xl mx-auto">
            <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                    <Button variant="ghost" size="sm" className="p-0" onClick={() => router.back()}>
                        <Link href={'/dashboard/user/my-order'}><ArrowLeft className="h-5 w-5" /></Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{t("postEdit.editPost")}</h1>
                </div>

                <div className="p-8 border border-gray-300 rounded-2xl">
                    <form key={formKey} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {/* Job Title + Category */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">{t("postEdit.jobTitle")}</Label>
                                <Input
                                    id="jobTitle"
                                    placeholder={t("postEdit.jobTitle")}
                                    {...register("jobTitle", { required: true })}
                                />
                                {errors.jobTitle && (
                                    <p className="text-red-500 text-sm">{t("postEdit.jobTitleRequired")}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cleaningCategory">{t("postEdit.cleaningCategory")}</Label>
                                <Controller
                                    control={control}
                                    name="cleaningCategory"
                                    render={({ field }) => {
                                        console.log("cleaningCategory field value:", field.value);
                                        return (
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value || undefined}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder={t("postEdit.selectCategory")}>
                                                        {field.value || t("postEdit.selectCategory")}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Deep Cleaning">Deep Cleaning</SelectItem>
                                                    <SelectItem value="residential">{t("postEdit.residential")}</SelectItem>
                                                    <SelectItem value="commercial">{t("postEdit.commercial")}</SelectItem>
                                                    <SelectItem value="office">{t("postEdit.office")}</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        );
                                    }}
                                />
                            </div>
                        </div>

                        {/* Job Description + Street */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="jobDescription">{t("postEdit.jobDescription")}</Label>
                                <Textarea
                                    id="jobDescription"
                                    placeholder={t("postEdit.jobDescription")}
                                    rows={3}
                                    {...register("jobDescription")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="street">{t("postEdit.street")}</Label>
                                <Input
                                    id="street"
                                    placeholder={t("postEdit.street")}
                                    {...register("street")}
                                />
                            </div>
                        </div>

                        {/* Area + City */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="area">{t("postEdit.area")}</Label>
                                <Input
                                    id="area"
                                    placeholder={t("postEdit.area")}
                                    {...register("area")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">{t("postEdit.city")}</Label>
                                <Input
                                    id="city"
                                    placeholder={t("postEdit.city")}
                                    {...register("city")}
                                />
                            </div>
                        </div>

                        {/* Price + Date */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="price">{t("postEdit.price")}</Label>
                                <Input
                                    id="price"
                                    placeholder={t("postEdit.price")}
                                    {...register("price")}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">{t("postEdit.date")}</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    {...register("date")}
                                />
                            </div>
                        </div>

                        {/* Time + Extra Requirements */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>{t("postEdit.time")}</Label>
                                <div className="flex gap-2 items-center">
                                    <select
                                        {...register("hour")}
                                        className="border rounded px-3 py-2 flex-1"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                    <span className="text-xl">:</span>
                                    <select
                                        {...register("minute")}
                                        className="border rounded px-3 py-2 flex-1"
                                    >
                                        {["00", "15", "30", "45"].map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                    <select
                                        {...register("ampm")}
                                        className="border rounded px-3 py-2 flex-1"
                                    >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="extraRequirements">{t("postEdit.extraRequirements")}</Label>
                                <Textarea
                                    id="extraRequirements"
                                    placeholder={t("postEdit.extraRequirements")}
                                    rows={3}
                                    {...register("extraRequirements")}
                                />
                            </div>
                        </div>

                        {/* Own Tools */}
                        <div className="flex items-center space-x-2 mt-6 border py-4 rounded-2xl px-5">
                            <Controller
                                control={control}
                                name="hasCleaningItems"
                                render={({ field }) => (
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <Label>{t("postEdit.ownTools")}</Label>
                        </div>

                        {/* Media Uploads */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
                            {/* Thumbnail */}
                            <div>
                                <Label className="mb-2 block">{t("postEdit.thumbnail")}</Label>
                                <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                                    {thumbnailPreview ? (
                                        <Image
                                            src={thumbnailPreview}
                                            alt="Thumbnail"
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <IoCameraSharp className="text-3xl text-green-600" />
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={e => handleThumbnailChange(e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>

                            {/* Photos */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Label>{t("postEdit.photos")}</Label>
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="outline"
                                        onClick={addPhotoField}
                                    >
                                        <Plus className="w-4 h-4 mr-1" /> {t("postEdit.addNew")}
                                    </Button>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {photoPreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                {preview ? (
                                                    <Image
                                                        src={preview}
                                                        alt={`photo-${index}`}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <IoCameraSharp className="text-3xl text-green-600" />
                                                )}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={e => handlePhotoChange(index, e.target.files?.[0] || null)}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => removePhotoField(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Videos */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <Label>{t("postEdit.videos")}</Label>
                                </div>
                                <div className="space-y-3 max-h-80 overflow-y-auto">
                                    {videoPreviews.map((preview, index) => (
                                        <div key={index} className="relative">
                                            <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center relative overflow-hidden">
                                                {preview ? (
                                                    <video
                                                        src={preview}
                                                        controls
                                                        className="object-cover w-full h-full"
                                                    />
                                                ) : (
                                                    <div className="text-4xl">🎥</div>
                                                )}
                                                <input
                                                    type="file"
                                                    accept="video/*"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={e => handleVideoChange(index, e.target.files?.[0] || null)}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                onClick={() => removeVideoField(index)}
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="border-t pt-8 mt-8">
                            <h4 className="text-2xl font-semibold mb-6">{t("postEdit.contactInfo")}</h4>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name">{t("postEdit.name")}</Label>
                                    <Input
                                        id="name"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("postEdit.email")}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        readOnly
                                        {...register("email")}
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t("postEdit.phone")}</Label>
                                    <Controller
                                        control={control}
                                        name="phone"
                                        render={({ field }) => {
                                            console.log("Phone field value:", field.value);
                                            return (
                                                <PhoneInput
                                                    country="mz"
                                                    enableSearch
                                                    value={field.value || ""}
                                                    onChange={(value) => {
                                                        console.log("Phone changed to:", value);
                                                        field.onChange(value);
                                                    }}
                                                />
                                            );
                                        }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="notification">{t("postEdit.notification")}</Label>
                                    <Controller
                                        control={control}
                                        name="notification"
                                        render={({ field }) => {
                                            console.log("notification field value:", field.value);
                                            return (
                                                <Select
                                                    onValueChange={field.onChange}
                                                    value={field.value || undefined}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={t("postEdit.selectNotification")}>
                                                            {field.value || t("postEdit.selectNotification")}
                                                        </SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="in-app">{t("postEdit.inApp")}</SelectItem>
                                                        <SelectItem value="email">{t("postEdit.email")}</SelectItem>
                                                        <SelectItem value="sms">{t("postEdit.sms")}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full mt-8">
                            {t("postEdit.updatePost")}
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    );
};

export default EditJob;