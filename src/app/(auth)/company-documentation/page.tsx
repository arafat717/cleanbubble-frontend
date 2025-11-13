/* eslint-disable prefer-const */
"use client";

import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

export default function CompanyDocumentsPage() {
    const router = useRouter();
    const { t } = useTranslation();

    const [taxNumber, setTaxNumber] = useState("");
    const [insuranceNumber, setInsuranceNumber] = useState("");

    const handleContinue = () => {
        const existingData = localStorage.getItem("registrationData");
        let registrationData = existingData ? JSON.parse(existingData) : {};

        const processedData = {
            taxNumber,
            insuranceNumber,
        };

        const updatedData = {
            ...registrationData,
            ...processedData,
        };

        localStorage.setItem("registrationData", JSON.stringify(updatedData));
        router.push("/register");
    };

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            {/* Left side image */}
            <div className="w-full">
                <Image src={authImage} alt="Login Image" width={1000} height={1000} className='h-screen ' />
            </div>

            {/* Right side form */}
            <div className="itemcenter justify-center items-center flex-1 ">
                <div className="max-h-screen flex items-center justify-center p-4 w-full">
                    <div className="min-h-screen bg-gray-50 p-4 w-full">
                        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border p-6 mt-30">
                            <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
                                {t("companyDocuments.title")}
                            </CardTitle>

                            <div className="space-y-6">
                                {/* Tax Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="tax-number" className="text-sm font-medium text-gray-700">
                                        {t("companyDocuments.taxNumberLabel")}
                                    </Label>
                                    <Input
                                        id="tax-number"
                                        type="text"
                                        placeholder={t("companyDocuments.taxNumberPlaceholder")}
                                        value={taxNumber}
                                        onChange={(e) => setTaxNumber(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                {/* Insurance Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="insurance-number" className="text-sm font-medium text-gray-700">
                                        {t("companyDocuments.insuranceNumberLabel")}
                                    </Label>
                                    <Input
                                        id="insurance-number"
                                        type="text"
                                        placeholder={t("companyDocuments.insuranceNumberPlaceholder")}
                                        value={insuranceNumber}
                                        onChange={(e) => setInsuranceNumber(e.target.value)}
                                        className="w-full"
                                    />
                                </div>

                                {/* Continue Button */}
                                <Button
                                    onClick={handleContinue}
                                    className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-2.5"
                                >
                                    {t("companyDocuments.continueButton")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
