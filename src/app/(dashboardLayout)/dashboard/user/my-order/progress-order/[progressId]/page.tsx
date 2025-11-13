"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useForm, Controller, useFieldArray } from "react-hook-form"
import { Briefcase, Camera, Plus, Trash2, Video, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import { useGetSingleOrderQuery, useUpdateProgressMutation } from "@/redux/api/user/myorder.api"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import Loader from "@/components/shared/Loader"

type JobStatus = "Not Started" | "In Process" | "Completed"

interface FileUploadProps {
    onFileUpload: (files: File[]) => void
    label: string
    accept?: string
    className?: string
    icon?: React.ReactNode
}

function FileUpload({ onFileUpload, label, accept = "*", className, icon }: FileUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileSelect = (files: FileList | null) => {
        if (files && files.length > 0) {
            const fileArray = Array.from(files)
            setSelectedFile(fileArray[0])
            onFileUpload(fileArray)
        }
    }

    const handleClick = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className={cn("space-y-2", className)}>
            <div
                onClick={handleClick}
                onDragOver={(e) => {
                    e.preventDefault()
                    setIsDragOver(true)
                }}
                onDragLeave={(e) => {
                    e.preventDefault()
                    setIsDragOver(false)
                }}
                onDrop={(e) => {
                    e.preventDefault()
                    setIsDragOver(false)
                    handleFileSelect(e.dataTransfer.files)
                }}
                className={cn(
                    "flex flex-col items-center justify-center",
                    "h-24 rounded-lg border-2 border-dashed border-border",
                    "bg-muted/30 hover:bg-muted/50 cursor-pointer transition-colors",
                    isDragOver && "border-primary bg-primary/10",
                )}
            >
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
                    {icon ? icon : <Camera className="h-4 w-4 text-muted-foreground" />}
                </div>
            </div>

            <div className="flex items-center justify-between text-xs">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClick}
                    className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
                >
                    {label}
                </Button>
                <span className="text-muted-foreground">{selectedFile ? selectedFile.name : label}</span>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={(e) => handleFileSelect(e.target.files)}
                className="hidden"
                multiple
            />
        </div>
    )
}

interface JobFormValues {
    status: JobStatus
    estimatedTime: string
    photos: { files: File[] }[]
    videos: { files: File[] }[]
}

const JobCard = () => {
    const { t } = useTranslation();
    const [updateProgress] = useUpdateProgressMutation()
    const id = useParams().progressId;
    const { data: trackData, isLoading } = useGetSingleOrderQuery(id);
    const progress = trackData?.data?.progressStatus;
    const currentEstimatedTime = trackData?.data?.estimatedTime || "";
    const router = useRouter()

    const { control, handleSubmit, setValue } = useForm<JobFormValues>({
        defaultValues: {
            status: progress,
            estimatedTime: currentEstimatedTime,
            photos: [],
            videos: [],
        },
    })

    const photosField = useFieldArray({ control, name: "photos" })
    const videosField = useFieldArray({ control, name: "videos" })

    const onSubmit = async (data: JobFormValues) => {
        const formData = new FormData();

        const dataJson = {
            progressStatus: data.status,
            estimatedTime: data.estimatedTime
        };
        formData.append("data", JSON.stringify(dataJson));

        if (data.photos?.length) {
            data.photos.forEach((block) => {
                block.files.forEach((file) => formData.append("photos", file));
            });
        }

        if (data.videos?.length) {
            data.videos.forEach((block) => {
                block.files.forEach((file) => formData.append("video", file));
            });
        }

        const res = await updateProgress({ id, data: formData });
        if (res?.data) {
            toast.success(t("progressDetails.saveUpdate") + "!")
            router.push('/dashboard/contractor/my-jobs')
        } else {
            toast.error("Something went wrong!")
        }
    };

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <>
            <header className="flex items-center max-w-6xl mx-auto gap-3 px-4 py-6 bg-card border-b border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                </div>
                <h1 className="text-xl font-semibold text-foreground">{t("progressDetails.pendingJob")}</h1>
            </header>
            <Card className="max-w-6xl mx-auto">
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold">Job Title will be here</CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-foreground">{t("progressDetails.updateProgress")}</Label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={t("progressDetails.selectStatus")} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="CONFIRMED">CONFIRMED</SelectItem>
                                            <SelectItem value="IN_PROCESS">IN_PROCESS</SelectItem>
                                            <SelectItem value="EMPLOYEE_ASSIGNED">EMPLOYEE_ASSIGNED</SelectItem>
                                            <SelectItem value="ARRIVED">ARRIVED</SelectItem>
                                            <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-sm font-medium text-foreground">{t("progressDetails.estimatedTime")}</Label>
                            <Controller
                                name="estimatedTime"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input {...field} type="time" className="pl-10" placeholder="Select time" />
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex w-full justify-between gap-10">
                        {/* Photos */}
                        <div className="space-y-3 w-full">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-foreground">{t("progressDetails.photos")}</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => photosField.append({ files: [] })}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" /> {t("progressDetails.addPhoto")}
                                </Button>
                            </div>
                            {photosField.fields.length === 0 && (
                                <p className="text-xs text-muted-foreground">No photos yet. Click Add Photo.</p>
                            )}
                            {photosField.fields.map((field, index) => (
                                <div key={field.id} className="space-y-2 border p-3 rounded-lg relative">
                                    <Button type="button" variant="ghost" size="icon" onClick={() => photosField.remove(index)} className="absolute top-2 right-2 text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Controller
                                        name={`photos.${index}.files`}
                                        control={control}
                                        render={() => (
                                            <FileUpload
                                                onFileUpload={(files) => setValue(`photos.${index}.files`, files)}
                                                label={t("progressDetails.chooseFile")}
                                                accept="image/*"
                                                icon={<Camera className="h-4 w-4 text-muted-foreground" />}
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Videos */}
                        <div className="space-y-3 w-full">
                            <div className="flex justify-between items-center">
                                <h3 className="text-sm font-medium text-foreground">{t("progressDetails.videos")}</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => videosField.append({ files: [] })}
                                    className="flex items-center gap-1"
                                >
                                    <Plus className="h-4 w-4" /> {t("progressDetails.addVideo")}
                                </Button>
                            </div>
                            {videosField.fields.length === 0 && (
                                <p className="text-xs text-muted-foreground">No videos yet. Click Add Video.</p>
                            )}
                            {videosField.fields.map((field, index) => (
                                <div key={field.id} className="space-y-2 border p-3 rounded-lg relative">
                                    <Button type="button" variant="ghost" size="icon" onClick={() => videosField.remove(index)} className="absolute top-2 right-2 text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <Controller
                                        name={`videos.${index}.files`}
                                        control={control}
                                        render={() => (
                                            <FileUpload
                                                onFileUpload={(files) => setValue(`videos.${index}.files`, files)}
                                                label={t("progressDetails.chooseFile")}
                                                accept="video/*"
                                                icon={<Video className="h-4 w-4 text-muted-foreground" />}
                                            />
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#319E60] cursor-pointer hover:bg-[#25814d] text-white">
                        {t("progressDetails.saveUpdate")}
                    </Button>
                </form>
            </Card>
        </>
    )
}

export default JobCard
