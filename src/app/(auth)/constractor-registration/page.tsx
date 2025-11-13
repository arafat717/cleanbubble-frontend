"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import authImage from "../../../../public/images/proccessImage.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ContractorRegistrationPage() {
    const { t } = useTranslation();
    const router = useRouter();
    const { register, handleSubmit } = useForm<any>();

    const onSubmit = (data: any) => {
        localStorage.setItem("registrationData", JSON.stringify(data));
        router.push("/contractor-information");
    };

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
                <Image
                    src={authImage}
                    alt="Login Image"
                    width={1000}
                    height={1000}
                    className="h-screen"
                />
            </div>

            <div className="itemcenter justify-center flex-1">
                <div className="min-h-screen flex items-center justify-center p-2">
                    <div className="max-h-screen w-[500px] flex items-center justify-center md:p-4">
                        <div className="min-h-screen bg-gray-50 flex items-center justify-center md:p-4 w-full">
                            <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-2 md:p-8">
                                <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
                                    {t("contractorregister.title")}
                                </h1>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                    {/* Company Name */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="company"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t("contractorregister.companyLabel")}
                                        </Label>
                                        <Input
                                            id="company"
                                            type="text"
                                            placeholder={t("contractorregister.companyPlaceholder")}
                                            {...register("companyName", {
                                                required: t("contractorregister.companyError") || "",
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />

                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t("contractorregister.phoneLabel")}
                                        </Label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                <span className="text-sm">🇩🇪 +49</span>
                                            </div>
                                            <Input
                                                id="companyPhone"
                                                type="tel"
                                                placeholder={t("contractorregister.phonePlaceholder")}
                                                {...register("companyPhone", {
                                                    required: t("contractorregister.phoneError") || "",
                                                })}
                                                className="w-full pl-20 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                            />
                                        </div>

                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t("contractorregister.emailLabel")}
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder={t("contractorregister.emailPlaceholder")}
                                            {...register("companyEmail", {
                                                required: t("contractorregister.emailError") || "",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: t("contractorregister.emailInvalid"),
                                                },
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />

                                    </div>

                                    {/* Address */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="address"
                                            className="text-sm font-medium text-gray-700"
                                        >
                                            {t("contractorregister.addressLabel")}
                                        </Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            placeholder={t("contractorregister.addressPlaceholder")}
                                            {...register("fullAddress", {
                                                required: t("contractorregister.addressError") || "",
                                            })}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        />

                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
                                    >
                                        {t("contractorregister.nextButton")}
                                    </Button>
                                </form>

                                <div className="mt-6 text-center">
                                    <p className="text-sm text-gray-600">
                                        {t("contractorregister.footerText")}{" "}
                                        <Link
                                            href="/login"
                                            className="text-gray-900 hover:underline"
                                        >
                                            {t("contractorregister.loginLink")}
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
