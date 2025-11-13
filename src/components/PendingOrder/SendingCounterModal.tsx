/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useMakeOfferByContractorMutation } from "@/redux/api/publicePage/homepage.api";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

const SendingCounterModal = ({ id }: { id: string }) => {
    const { t } = useTranslation();
    console.log('id:', id)
    const [dialogOpen, setDialogOpen] = useState(false)
    const { control, handleSubmit, reset } = useForm<{ price: number }>()
    const [makeOffer] = useMakeOfferByContractorMutation();

    const onSubmit = async (values: { price: number }) => {
        if (!values?.price) return toast.error(t("houseCleaningOffer.pleaseEnterPrice"));
        const payload = { id, data: { counterPrice: parseFloat(values.price.toString()) } };
        console.log(payload)
        const res = await makeOffer(payload);
        console.log(res)
        if (res?.data) {
            toast.success(t("houseCleaningOffer.sendOffer"));
            setDialogOpen(false);
            reset();
        } else {
            toast.error((res?.error as any)?.data?.message || "An error occurred");
        }
    };

    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger><button className="border border-green-600 cursor-pointer text-green-600 hover:bg-green-50 px-4 py-2 rounded-full text-xs sm:text-sm font-medium">
                    Send Counter
                </button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="pt-4 space-y-4 max-w-full mx-auto"
                        >
                            <div className="relative w-full">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[28px] text-[#999] font-[700px]">
                                    €
                                </span>
                                <Controller
                                    name="price"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            type="number"
                                            className="w-full pl-6 pr-2 text-[28px] text-[#999] font-[700px] border-0 border-b-2 rounded-none bg-transparent focus:outline-none"
                                            placeholder="120"
                                        />
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                                size="lg"
                            >
                                Send Offer
                            </Button>
                        </form>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SendingCounterModal;