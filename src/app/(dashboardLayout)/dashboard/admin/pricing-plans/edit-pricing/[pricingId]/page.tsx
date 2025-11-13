/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEditPlanMutation, useGetSingleOffersQuery } from "@/redux/api/publicePage/homepage.api";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Loader from "@/components/shared/Loader";

type PlanFormData = {
    planName: string;
    planType: string;
    facilities: { value: string }[];
    price: number;
    duration: number;
};

const PricingEdit = () => {
    const { t } = useTranslation();
    const id = useParams().pricingId;
    const [editPlan] = useEditPlanMutation();
    const { data, isLoading } = useGetSingleOffersQuery(id);
    const router = useRouter();

    const { control, handleSubmit, reset } = useForm<PlanFormData>({
        defaultValues: {
            planName: "",
            planType: "",
            facilities: [{ value: "" }],
            price: 0,
            duration: 0,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "facilities",
    });

    // Reset form when API data arrives
    useEffect(() => {
        if (data?.data) {
            reset({
                planName: data.data.planName,
                planType: data.data.planType,
                facilities: data.data.facilities.map((f: string) => ({ value: f })),
                price: data.data.price,
                duration: data.data.duration,
            });
        }
    }, [data, reset]);

    const onSubmit = async (formValues: PlanFormData) => {
        try {
            const formattedData = {
                planName: formValues.planName,
                planType: formValues.planType,
                facilities: formValues.facilities.map((f) => f.value),
                price: Number(formValues.price),
                duration: Number(formValues.duration),
            };

            const res = await editPlan({ id, body: formattedData });

            if (res?.data) {
                toast.success(t("pricing.saveChanges") + " " + "✅");
                router.push("/dashboard/admin/pricing-plans");
            } else {
                toast.error(t("pricing.loading") + " ❌");
            }
        } catch (err: any) {
            const message = err?.data?.message || err?.message || t("pricing.loading");
            toast.error(message);
        }
    };

    if (isLoading) return <Loader></Loader>;

    const roleText = data?.data?.price === 0 ? "Job poster" : "Contractor";

    return (
        <div className="max-w-7xl">
            <h1 className="text-center text-xl font-semibold">
                {t("pricing.editPlanFor", { role: roleText })}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
                <div className="p-6 space-y-6">
                    {/* Plan Name */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{t("pricing.planName")}</label>
                        <div className="relative">
                            <Controller
                                control={control}
                                name="planName"
                                render={({ field }) => (
                                    <Input {...field} placeholder={t("pricing.planName")} className="pr-10 bg-input border border-gray-300" />
                                )}
                            />
                            <Edit2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>

                    {/* Plan Type & Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">{t("pricing.planType")}</label>
                            <Controller
                                control={control}
                                name="planType"
                                render={({ field }) => (
                                    <Input {...field} placeholder={t("pricing.planType")} className="pr-10 bg-input border border-gray-300" />
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">{t("pricing.price")}</label>
                            <Controller
                                control={control}
                                name="price"
                                render={({ field }) => (
                                    <Input type="number" {...field} placeholder={t("pricing.price")} className="pr-10 bg-input border border-gray-300" />
                                )}
                            />
                        </div>
                    </div>

                    {/* Facilities */}
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-foreground">{t("pricing.facilities")}</label>
                            <Button
                                variant="ghost"
                                size="sm"
                                type="button"
                                onClick={() => append({ value: "" })}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Plus className="w-4 h-4 mr-1" />
                                {t("pricing.addNew")}
                            </Button>
                        </div>
                        {fields.map((field, index) => (
                            <div key={field.id} className="relative flex items-center gap-2">
                                <Controller
                                    control={control}
                                    name={`facilities.${index}.value`}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            placeholder={`${t("pricing.facilities")} ${index + 1}`}
                                            className="pr-10 bg-input border border-gray-300 flex-1"
                                        />
                                    )}
                                />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* Duration */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">{t("pricing.duration")}</label>
                        <Controller
                            control={control}
                            name="duration"
                            render={({ field }) => (
                                <Input type="number" {...field} placeholder={t("pricing.duration")} className="pr-10 bg-input border border-gray-300" />
                            )}
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-5">
                        <Button
                            type="submit"
                            className="px-6 bg-[#319E60] flex-1 hover:bg-[#319E60]/90 text-[#FFF] text-[20px] font-[400] py-[20px] rounded-[40px]"
                        >
                            {t("pricing.saveChanges")}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="px-6 flex-1 bg-inherit rounded-[40px] py-[20px] text-[20px] font-[400]"
                            onClick={() => router.back()}
                        >
                            {t("pricing.cancel")}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PricingEdit;
