/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRepostJobMutation } from "@/redux/api/user/myorder.api"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function RepostModal({ id }: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [repostJob] = useRepostJobMutation()

    const {
        register,
        handleSubmit,
    } = useForm<any>();

    console.log(id)
    const onSubmit = async (data: any) => {
        console.log(data)
        const formData = new FormData();
        const payload = {
            date: data.date,
            time: `${data.hour}:${data.minute} ${data.ampm}`,
        };
        // console.log(payload)
        formData.append("data", JSON.stringify(payload));
        const res = await repostJob({ id, formData })
        console.log(res)
        if (res?.data) {
            toast.success("Job repost successfully! Waiting for admin approve")
            setIsOpen(false);
        } else {
            toast.error("Something went wrong!")
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="w-full border border-green-600 bg-inherit md:py-6 
                     hover:bg-[#319E60] hover:text-white cursor-pointer 
                     text-green-600 rounded-full text-sm sm:text-base font-medium">
                    Repost
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-center">Select Time & Date</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date" className="text-[18px] font-[500px] text-[#424242]">Date</Label>
                            <div className="relative">
                                <Input id="date" type="date" className="px-[18px] h-[50px]" placeholder="25/2024" {...register("date")} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time</Label>
                            <div className="flex gap-2">
                                {/* Hour */}
                                <select {...register("hour")} className="border px-3 py-2 rounded-md">
                                    {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
                                        <option key={h} value={h}>{h}</option>
                                    ))}
                                </select>
                                <span className="flex items-center">:</span>

                                {/* Minute */}
                                <select {...register("minute")} className="border px-3 py-2 rounded-md">
                                    {["00", "15", "30", "45"].map((m) => (
                                        <option key={m} value={m}>{m}</option>
                                    ))}
                                </select>
                                {/* AM/PM */}
                                <select {...register("ampm")} className="border px-3 py-2 rounded-md">
                                    <option value="AM">AM</option>
                                    <option value="PM">PM</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="w-full py-3 mt-4 bg-[#319E60] hover:bg-[#319E60] cursor-pointer text-white rounded-4xl">Save changes</button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
