"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import contractor from "../../../../public/images/contractor.png";
import jobposter from "../../../../public/images/jobposter.png";
import authImage from "../../../../public/images/proccessImage.jpg";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function MainsignUpPage() {
    const { t } = useTranslation();

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
                <Image
                    src={authImage}
                    alt="Signup Image"
                    width={1000}
                    height={1000}
                    className="h-screen"
                />
            </div>

            <div className="itemcenter justify-center flex-1">
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="max-h-screen w-[500px] flex items-center justify-center p-4">
                        <div className="w-full max-w-full space-y-6">
                            {/* Header */}
                            <h1 className="text-3xl font-semibold text-green-600 text-center">
                                {t("signupone.title")}
                            </h1>

                            {/* Options */}
                            <div className="space-y-4">
                                {/* Job Poster Option */}
                                <Link href="/job-poster-registration">
                                    <Card className="p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow mt-5">
                                        <div className="flex items-center bg-purple-200 text-gray-800 p-4 hover:bg-green-600 transition">
                                            <div className="w-1/3">
                                                <Image
                                                    src={jobposter}
                                                    alt="Job Poster"
                                                    width={1000}
                                                    height={1000}
                                                    className="w-14 h-14 text-white border-r border-gray-500 mr-6 pr-6"
                                                />
                                            </div>
                                            <div className="w-2/3">
                                                <span className="text-lg font-medium">
                                                    {t("signupone.jobPosterOption")}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>

                                {/* Contractor Option */}
                                <Link href="/constractor-registration">
                                    <Card className="p-0 overflow-hidden cursor-pointer hover:shadow-md transition-shadow mt-5">
                                        <div className="flex items-center bg-purple-200 text-gray-800 p-4 hover:bg-green-600 transition">
                                            <div className="w-1/3">
                                                <Image
                                                    src={contractor}
                                                    alt="Contractor"
                                                    width={1000}
                                                    height={1000}
                                                    className="w-14 h-14 text-white border-r border-gray-500 mr-6 pr-6"
                                                />
                                            </div>
                                            <div className="w-2/3">
                                                <span className="text-lg font-medium">
                                                    {t("signupone.contractorOption")}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
