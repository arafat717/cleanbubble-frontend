"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

export default function ContractorRegistrationPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        const existingData = localStorage.getItem('registrationData');
        let registrationData = {};

        if (existingData) {
            registrationData = JSON.parse(existingData);
        }

        const updatedData = {
            ...registrationData,
            ...data
        };

        localStorage.setItem('registrationData', JSON.stringify(updatedData));
        router.push('/contractor-profile');
    };

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
                <Image src={authImage} alt="Login Image" width={1000} height={1000} className='h-screen ' />
            </div>
            <div className='itemcenter justify-center flex-1 '>
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-h-screen w-[500px] flex items-center justify-center p-4">
                        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 w-full">
                            <Card className="w-full max-w-md mx-auto shadow-lg">
                                <CardHeader className="text-center pb-6">
                                    <CardTitle className="text-2xl font-semibold text-gray-900">
                                        {t("contractorinfo.title")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                        {/* Contractor Name */}
                                        <div className="space-y-2">
                                            <Label htmlFor="contractorName" className="text-sm font-medium text-gray-700">
                                                {t("contractorinfo.contractorNameLabel")}
                                            </Label>
                                            <Input
                                                id="contractorName"
                                                type="text"
                                                placeholder={t("contractorinfo.contractorNamePlaceholder")}
                                                {...register('fullName', { required: t("contractorinfo.contractorNameError") })}
                                                className="h-12"
                                            />
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-2">
                                            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                                {t("contractorinfo.phoneLabel")}
                                            </Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="phone"
                                                    type="tel"
                                                    placeholder={t("contractorinfo.phonePlaceholder")}
                                                    {...register('phone', { required: t("contractorinfo.phoneError") })}
                                                    className="flex-1 h-12"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                                {t("contractorinfo.emailLabel")}
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder={t("contractorinfo.emailPlaceholder")}
                                                {...register('email', {
                                                    required: t("contractorinfo.emailError"),
                                                    pattern: { value: /^\S+@\S+$/i, message: t("contractorinfo.emailInvalid") }
                                                })}
                                                className="h-12"
                                            />
                                        </div>

                                        {/* Submit */}
                                        <Button type="submit" className="w-full h-12 cursor-pointer bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg">
                                            {t("contractorinfo.nextButton")}
                                        </Button>
                                    </form>

                                    <div className="text-center">
                                        <p className="text-sm text-gray-600">
                                            {t("contractorinfo.footerText")}{" "}
                                            <button className="text-gray-900 hover:underline font-medium">
                                                {t("contractorinfo.loginLink")}
                                            </button>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
