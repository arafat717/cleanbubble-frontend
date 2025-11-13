"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import authImage from "../../../../public/images/proccessImage.jpg";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/authSlice";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MainLoginPage() {
    const { t } = useTranslation();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        const loadingToast = toast.loading(t("loginone.loadingToast"));

        try {
            const res = await login(data);

            toast.dismiss(loadingToast);

            if (res?.data) {
                dispatch(setUser({ token: res.data.data.token }));
                toast.success(t("loginone.successToast"));
                window.location.href = "/";
            } else {
                if (res.error) {
                    const errorMessage =
                        (res.error as any)?.data?.message ||
                        (res.error as any)?.message ||
                        t("loginone.errorToast");
                    toast.error(errorMessage);
                }
            }
        } catch (err: any) {
            toast.dismiss(loadingToast);
            toast.error(err.message || t("loginone.errorToast"));
        }
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
                <div className="max-h-screen flex items-center justify-center p-4">
                    <div className="flex items-center justify-center min-h-screen bg-gray-50">
                        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
                            {/* Title */}
                            <h2 className="text-[40px] font-bold text-[#2D2D2D] text-center">
                                {t("loginone.welcomeTitle")}
                            </h2>
                            <p className="text-center text-[#737373] font-normal mt-1 mb-6">
                                {t("loginone.welcomeDescription")}
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {t("loginone.emailLabel")}
                                    </label>
                                    <input
                                        type="email"
                                        placeholder={t("loginone.emailPlaceholder")}
                                        {...register("email", { required: t("loginone.emailLabel") })}
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 normal-case"
                                    />
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        {t("loginone.passwordLabel")}
                                    </label>
                                    <input
                                        type="password"
                                        placeholder={t("loginone.passwordPlaceholder")}
                                        {...register("password", { required: t("loginone.passwordLabel") })}
                                        className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 normal-case"
                                    />
                                    <Link href={"/forgot-password"}>
                                        <p className="text-right text-md text-gray-500 mt-1 cursor-pointer hover:underline">
                                            {t("loginone.forgotPassword")}
                                        </p>
                                    </Link>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 cursor-pointer text-white py-2 rounded-full font-medium hover:bg-green-700 transition"
                                >
                                    {t("loginone.loginBtn")}
                                </button>
                            </form>

                            {/* Footer */}
                            <p className="text-center text-sm text-gray-600 mt-6">
                                {t("loginone.noAccount")}{" "}
                                <Link
                                    href="/main-singup"
                                    className="text-green-600 font-medium hover:underline"
                                >
                                    {t("loginone.signupLink")}
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
