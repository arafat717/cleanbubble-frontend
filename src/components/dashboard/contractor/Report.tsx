"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRight, FileText, ImageIcon } from "lucide-react"
import { useParams } from "next/navigation"

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

export function ReportJobPosterForm() {
    const id = useParams().reportedId;
    console.log(id)
    const [selectedReason, setSelectedReason] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState<File[]>([])

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFiles = Array.from(event.target.files || [])
        setFiles((prev) => [...prev, ...uploadedFiles])
    }

    const handleSubmit = () => {
        console.log("Report submitted:", {
            reason: selectedReason,
            description,
            files: files.map((f) => f.name),
        })
    }

    return (
        <div className="max-w-7xl px-20 bg-white  pb-10">
            <CardHeader className="pb-4">
                <h1 className="text-[40px] font-[500px] text-[#17171A]">Report Job Poster</h1>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Why are you reporting section */}
                <div>
                    <h3 className="text-[24px] font-[600px] text-[#161616] mb-2">Why are you reporting this job?</h3>
                    <p className="text-[18px] font-[400px] text-[#747474] mb-4">
                        Only flagged jobs will be sent and reported to our report. You identify will be kept confidential.
                    </p>
                    <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                        {reportReasons.map((reason) => (
                            <div
                                key={reason}
                                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                            >
                                <div className="flex items-center space-x-3">
                                    <RadioGroupItem value={reason} id={reason} />
                                    <Label htmlFor={reason} className="text-[18px] font-[400px] text-[#161616] cursor-pointer">
                                        {reason}
                                    </Label>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400" />
                            </div>
                        ))}
                    </RadioGroup>
                </div>
                {/* Rude behavior section */}
                <div>
                    <h3 className="text-[24px] font-[600px] text-[#161616] mb-2">Rude behavior</h3>
                    <p className="text-[18px] text-[#2D2D2D] font-[500px] mb-3">Describe about this</p>
                    <Textarea
                        placeholder="Describe..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[80px] text-sm resize-none"
                    />
                </div>
                {/* Send Attachments section */}
                <div>
                    <h3 className="text-[24px] font-[600px] text-[#161616] mb-3">Send Attachments</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {/* Upload Photos */}
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                                <ImageIcon className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-600">Upload Photos</p>
                            </div>
                        </div>
                        {/* Add Files */}
                        <div className="relative">
                            <input
                                type="file"
                                multiple
                                onChange={handleFileUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-gray-300 transition-colors">
                                <FileText className="h-6 w-6 text-green-500 mx-auto mb-2" />
                                <p className="text-xs text-gray-600">Add Files</p>
                            </div>
                        </div>
                        {/* Show uploaded files */}
                        {files.map((file, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center space-x-2">
                                    {file.type.startsWith("image/") ? (
                                        <ImageIcon className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <FileText className="h-4 w-4 text-green-500" />
                                    )}
                                    <span className="text-xs text-gray-600 truncate">{file.name}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-3">
                        <Label className="text-xs text-gray-500">Upload Photos</Label>
                        <Label className="text-xs text-gray-500">Add Files</Label>
                    </div>
                </div>
                {/* Submit button */}
                <Button onClick={handleSubmit} className="w-full py-[10px] px-[22px] cursor-pointer bg-green-500 hover:bg-green-600 text-[14px] text-[#FFF] font-[600px]">
                    Submit Report
                </Button>
            </CardContent>
        </div>
    )
}
