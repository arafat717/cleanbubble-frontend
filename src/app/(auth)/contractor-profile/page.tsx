/* eslint-disable prefer-const */
"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import authImage from '../../../../public/images/proccessImage.jpg'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useTranslation } from "react-i18next";

export default function ContractorRegistrationPage() {
    const router = useRouter();
    const { t } = useTranslation();
    const { register, handleSubmit, control, watch } = useForm<any>({
        defaultValues: {
            bio: "",
            services: [] as string[],
            serviceAreas: [""],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "serviceAreas",
    });

    const watchedServices = watch("services");

    const toggleService = (service: string, onChange: (services: string[]) => void) => {
        let updated = [...watchedServices];
        if (updated.includes(service)) {
            updated = updated.filter((s) => s !== service);
        } else {
            updated.push(service);
        }
        onChange(updated);
    };

    const addServiceArea = () => append("");
    const removeServiceArea = (index: number) => fields.length > 1 && remove(index);

    const onSubmit = (data: any) => {
        const existingData = localStorage.getItem("registrationData");
        let registrationData = existingData ? JSON.parse(existingData) : {};

        const processedData = {
            ...data,
            services: data.services || [],
            serviceAreas: data.serviceAreas.filter((area: string) => area.trim() !== ""),
        };

        const updatedData = {
            ...registrationData,
            ...processedData,
        };

        localStorage.setItem("registrationData", JSON.stringify(updatedData));
        router.push("/company-documentation");
    };

    const serviceOptions = t("contractorServices.serviceOptions", { returnObjects: true }) as string[];

    return (
        <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
            <div className="w-full">
                <Image src={authImage} alt="Login Image" width={1000} height={1000} className='h-screen ' />
            </div>
            <div className='itemcenter justify-center flex-1 '>
                <div className="max-h-screen flex items-center justify-center p-4 w-full">
                    <div className="min-h-screen bg-gray-50 p-4 w-full">
                        <div className="mx-auto max-w-lg mt-20">
                            <Card className="shadow-sm">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl font-semibold text-gray-900 text-center">
                                        {t("contractorServices.title")}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                                        {/* Bio */}
                                        <div className="space-y-3">
                                            <Label htmlFor="bio" className="text-sm font-medium">{t("contractorServices.bioLabel")}</Label>
                                            <Textarea
                                                id="bio"
                                                placeholder={t("contractorServices.bioPlaceholder")}
                                                {...register('bio', { required: t("contractorServices.bioError") })}
                                                className="min-h-[80px] resize-none"
                                            />
                                        </div>

                                        {/* Services */}
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">{t("contractorServices.servicesLabel")}</Label>
                                            <Controller
                                                name="services"
                                                control={control}
                                                render={({ field: { onChange, value } }) => (
                                                    <div className="flex flex-wrap gap-2">
                                                        {serviceOptions?.map((service) => (
                                                            <Button
                                                                key={service}
                                                                type="button"
                                                                variant={value.includes(service) ? "default" : "outline"}
                                                                size="sm"
                                                                onClick={() => toggleService(service, onChange)}
                                                                className={value.includes(service) ? "bg-gray-800 text-white" : ""}
                                                            >
                                                                {service}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                )}
                                            />
                                        </div>

                                        {/* Service Areas */}
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">{t("contractorServices.serviceAreasLabel")}</Label>
                                                <Button type="button" variant="outline" size="sm" onClick={addServiceArea} className="text-xs bg-transparent">
                                                    <Plus className="h-3 w-3 mr-1" />
                                                    {t("contractorServices.addMoreButton")}
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                {fields.map((field, index) => (
                                                    <div key={field.id} className="flex gap-2">
                                                        <Input
                                                            placeholder={t("contractorServices.serviceAreaPlaceholder")}
                                                            {...register(`serviceAreas.${index}`, {
                                                                required: index === 0 ? t("contractorServices.serviceAreaError") : false
                                                            })}
                                                            className="flex-1"
                                                        />
                                                        {fields.length > 1 && (
                                                            <Button type="button" variant="outline" size="sm" onClick={() => removeServiceArea(index)} className="px-2">×</Button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Continue */}
                                        <Button type="submit" className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-medium py-3" size="lg">
                                            {t("contractorServices.continueButton")}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
