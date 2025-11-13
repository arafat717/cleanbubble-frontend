/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client"

import { useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import Image from "next/image"
import authImage from '../../../../public/images/proccessImage.jpg'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useVerifyOtpMutation } from "@/redux/api/authApi"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

type VerificationFormData = {
    digit0: string
    digit1: string
    digit2: string
    digit3: string
}

export default function ContractorRegistrationPage() {
    const [verifyOtp] = useVerifyOtpMutation()
    const router = useRouter()
    const { control, handleSubmit, watch, setValue, reset } = useForm<VerificationFormData>({
        defaultValues: { digit0: "", digit1: "", digit2: "", digit3: "" }
    })

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null)
    ]

    const digits = watch()
    const isCodeComplete = Object.values(digits).every(d => d !== "")

    const handleChange = (index: number, value: string, onChange: (value: string) => void) => {
        if (value.length > 1) value = value.slice(-1)
        if (value && !/^\d$/.test(value)) return
        onChange(value)
        if (value && index < 3) inputRefs[index + 1].current?.focus()
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        const currentValue = digits[`digit${index}` as keyof VerificationFormData]
        if (e.key === "Backspace" && !currentValue && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData("text").slice(0, 4)
        if (!/^\d+$/.test(pasted)) return
        pasted.split("").forEach((digit, i) => setValue(`digit${i}` as keyof VerificationFormData, digit))
        const nextFocus = pasted.length < 4 ? pasted.length : 3
        inputRefs[nextFocus].current?.focus()
    }

    const handleResend = () => console.log("Resending verification code...")

    const handleCancel = () => {
        reset()
        inputRefs[0].current?.focus()
    }

    const onSubmit = async (data: VerificationFormData) => {
        const fullCode = `${data.digit0}${data.digit1}${data.digit2}${data.digit3}`
        const email = JSON.parse(localStorage.getItem("email") || "{}");
        try {
            const payload = {
                email: email.email,
                otp: parseInt(fullCode)
            }
            console.log(payload)
            const res = await verifyOtp(payload)
            if (res?.data) {
                toast.success("Otp Verify successfully!")
                router.push('/reset-password')
            }
        } catch (err: any) {
            toast.error(err.message || 'Something went wrong!')
        }
    }

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Image */}
            <div className="w-full">
                <Image src={authImage} alt="Login Image" width={1000} height={1000} className="h-screen object-cover" />
            </div>

            {/* Right Verification Form */}
            <div className="flex items-center justify-center p-4 w-full">
                <div className="min-h-screen bg-gray-50 p-4 w-full flex items-center justify-center">
                    <Card className="w-full max-w-md shadow-lg">
                        <CardHeader className="text-center space-y-2">
                            <CardTitle className="text-2xl font-semibold">Enter Verification Code</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">
                                We just sent you a verification code. Check your inbox
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-6">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="flex justify-center gap-3">
                                    {[0, 1, 2, 3].map(index => (
                                        <Controller
                                            key={index}
                                            name={`digit${index}` as keyof VerificationFormData}
                                            control={control}
                                            render={({ field }) => (
                                                <input
                                                    ref={inputRefs[index]}
                                                    type="text"
                                                    inputMode="numeric"
                                                    maxLength={1}
                                                    value={field.value}
                                                    onChange={e => handleChange(index, e.target.value, field.onChange)}
                                                    onKeyDown={e => handleKeyDown(index, e)}
                                                    onPaste={handlePaste}
                                                    className="w-14 h-14 text-center text-xl font-semibold border-2 border-input rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                    aria-label={`Digit ${index + 1}`}
                                                />
                                            )}
                                        />
                                    ))}
                                </div>

                                <div className="text-center">
                                    <p className="text-sm text-muted-foreground">
                                        Didn't get a code?{" "}
                                        <button type="button" onClick={handleResend} className="text-foreground hover:underline font-medium">
                                            Click to resend
                                        </button>
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-3">
                                    <Button
                                        type="submit"
                                        disabled={!isCodeComplete}
                                        className="bg-primary hover:bg-green/90 text-primary-foreground px-8"
                                    >
                                        Continue
                                    </Button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
