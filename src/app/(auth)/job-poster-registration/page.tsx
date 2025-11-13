/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import authImage from "../../../../public/images/proccessImage.jpg";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

type FormValues = {
    companyName: string;
    phone: string;
    email: string;
    password: string;
};

export default function JobPosterRegistrationPage() {
    const { t } = useTranslation();
    const [createUser] = useRegisterMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit = async (data: FormValues) => {
        const loadingToast = toast.loading(t("jobposterregister.creatingUser"));

        try {
            const payload = {
                role: "USER",
                email: data.email,
                password: data.password,
                fullName: data.companyName,
                phone: data.phone,
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            const res = await createUser(formData);

            toast.dismiss(loadingToast);

            if (res?.data) {
                dispatch(setUser({ token: res.data.data.token }));
                toast.success(t("jobposterregister.success"));
                router.push("/");
            } else {
                toast.error(t("jobposterregister.error"));
            }
        } catch (err: any) {
            toast.dismiss(loadingToast);
            toast.error(err?.data?.message || t("jobposterregister.error"));
        }
    };

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
                <Image
                    src={authImage}
                    alt="Register Image"
                    width={1000}
                    height={1000}
                    className="h-screen"
                />
            </div>

            <div className="flex items-center justify-center flex-1">
                <div className="min-h-screen flex items-center justify-center p-4 w-full">
                    <Card className="w-full max-w-lg mx-auto shadow-lg">
                        <CardHeader className="text-center pb-6">
                            <CardTitle className="text-xl font-medium text-gray-900">
                                {t("jobposterregister.title")}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 w-full">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Company Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="companyName">
                                        {t("jobposterregister.companyLabel")}
                                    </Label>
                                    <Input
                                        id="companyName"
                                        type="text"
                                        placeholder={t("jobposterregister.companyPlaceholder")}
                                        {...register("companyName", {
                                            required: t("jobposterregister.companyError") || "",
                                        })}
                                        className="w-full normal-case"
                                    />
                                    {errors.companyName && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.companyName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">{t("jobposterregister.phoneLabel")}</Label>
                                    <div className="relative">
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                            <span className="text-lg">🇩🇪</span>
                                            <span className="text-sm text-gray-600">+49</span>
                                        </div>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder={t("jobposterregister.phonePlaceholder")}
                                            {...register("phone", {
                                                required: t("jobposterregister.phoneError") || "",
                                            })}
                                            className="w-full pl-16 normal-case"
                                        />
                                    </div>
                                    {errors.phone && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("jobposterregister.emailLabel")}</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder={t("jobposterregister.emailPlaceholder")}
                                        {...register("email", {
                                            required: t("jobposterregister.emailError") || "",
                                        })}
                                        className="w-full normal-case"
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">{t("jobposterregister.passwordLabel")}</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder={t("jobposterregister.passwordPlaceholder")}
                                            {...register("password", {
                                                required: t("jobposterregister.passwordError") || "",
                                            })}
                                            className="w-full pr-10 normal-case"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="text-sm text-red-500 mt-1">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-2.5 mt-6"
                                >
                                    {t("jobposterregister.button")}
                                </Button>
                            </form>

                            {/* Footer */}
                            <div className="text-center pt-4">
                                <p className="text-sm text-gray-600">
                                    {t("jobposterregister.footerText")}{" "}
                                    <a
                                        href="/login"
                                        className="text-green-600 cursor-pointer hover:text-green-700 font-medium"
                                    >
                                        {t("jobposterregister.loginLink")}
                                    </a>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
