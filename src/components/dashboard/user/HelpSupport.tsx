"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Headphones } from "lucide-react"
import { useSentMessageMutation } from "@/redux/api/admin/repost.api"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"

export function HelpSupportForm() {
    const { t } = useTranslation()
    const [sentMessage] = useSentMessageMutation()
    const [formData, setFormData] = useState({ name: "", email: "", message: "" })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await sentMessage(formData)
        if (res?.data) {
            toast.success(t("helpSupport.messageSent"))
            setFormData({ name: "", email: "", message: "" })
        } else {
            toast.error(t("helpSupport.somethingWentWrong"))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="w-full max-w-3xl px-4 sm:px-6 md:px-8 bg-white rounded-lg p-6 sm:p-8 mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 sm:mb-8">
                <Headphones className="w-12 h-12 text-[#17171A]" />
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#17171A] text-center sm:text-left">
                    {t("helpSupport.helpSupport")}
                </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-lg sm:text-xl font-medium text-[#595959]">
                        {t("helpSupport.yourName")}
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-lg sm:text-xl font-medium text-[#595959]">
                        {t("helpSupport.yourEmail")}
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 focus:outline-none focus:ring-0 focus:border-gray-300"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description" className="text-lg sm:text-xl font-medium text-[#595959]">
                        {t("helpSupport.describe")}
                    </Label>
                    <Textarea
                        id="description"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full min-h-[100px] border-0 border-b border-gray-300 rounded-none bg-transparent px-0 py-2 resize-none focus:outline-none focus:ring-0 focus:border-gray-300"
                        required
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg sm:text-xl py-4 sm:py-5 px-4 rounded-full font-semibold mt-4 sm:mt-6"
                >
                    {t("helpSupport.sendMessage")}
                </Button>
            </form>
        </div>
    )
}
