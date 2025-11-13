"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import topAndFeatureJobImg from "@/assets/home/top-job-category-bg.png";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = {
    jobTitle: string;
    cleaningCategory: string;
    jobDescription: string;
    street: string;
    area: string;
    city: string;
    price: string;
    date: string;
    hour: string;
    minute: string;
    extraRequirements: string;
    name: string;
    email: string;
    phone: string;
    notification: string;
    ownTools: boolean;
};

const PostAJobForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            cleaningCategory: "",
            area: "",
            city: "",
            notification: "",
            ownTools: false,
        },
    });

    const onSubmit = (data: FormValues) => {
        console.log("Form Data:", data);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${typeof topAndFeatureJobImg === "string"
                    ? topAndFeatureJobImg
                    : topAndFeatureJobImg.src
                    })`,
            }}
            className="relative overflow-hidden min-h-[80vh] -mt-16"
        >
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="my-8 text-center">
                        <h1 className="text-[#17171A] text-[44px] font-[400px]">Fill up order form</h1>
                    </div>

                    <div className="p-8 border border-gray-300 rounded-2xl">
                        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            {/* Job Title + Category */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Job Title</Label>
                                    <Input
                                        className="px-[18px] h-[50px]"
                                        id="jobTitle"
                                        placeholder="Job Title"
                                        {...register("jobTitle", { required: true })}
                                    />
                                    {errors.jobTitle && (
                                        <p className="text-red-500 text-sm">Job title is required</p>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500] text-[#424242]">
                                        Cleaning Category
                                    </Label>
                                    <Controller
                                        control={control}
                                        name="cleaningCategory"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="residential">Residential</SelectItem>
                                                    <SelectItem value="commercial">Commercial</SelectItem>
                                                    <SelectItem value="office">Office</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>

                            </div>

                            {/* Description + Street */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Job Description</Label>
                                    <Textarea
                                        id="jobDescription"
                                        placeholder="Describe"
                                        rows={3}
                                        {...register("jobDescription")}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Street</Label>
                                    <Input id="street" className="px-[18px] h-[50px]" placeholder="Street" {...register("street")} />
                                </div>
                            </div>

                            {/* Area + City */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Area</Label>
                                    <Controller
                                        control={control}
                                        name="area"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
                                                    <SelectValue placeholder="Area" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="london">London</SelectItem>
                                                    <SelectItem value="manchester">Manchester</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">City</Label>
                                    <Controller
                                        control={control}
                                        name="city"
                                        render={({ field }) => (
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
                                                    <SelectValue placeholder="City" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="london">London</SelectItem>
                                                    <SelectItem value="manchester">Manchester</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Price + Date */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Price</Label>
                                    <Input id="price" className="px-[18px] h-[50px]" placeholder="amount" {...register("price")} />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Date</Label>
                                    <div className="relative">
                                        <Input id="date" className="px-[18px] h-[50px]" placeholder="25/2024" {...register("date")} />
                                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>

                            {/* Time + Extra */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[18px] font-[500px] text-[#424242]">Time</Label>
                                    <div className="flex gap-2">
                                        <Input placeholder="1" className="px-[18px] h-[50px]" {...register("hour")} />
                                        <span className="flex items-center">:</span>
                                        <Input placeholder="00" className="px-[18px] h-[50px]" {...register("minute")} />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="bg-primary text-primary-foreground"
                                            type="button"
                                        >
                                            AM
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label >Extra Requirements</Label>
                                    <Textarea
                                        id="extraRequirements"
                                        placeholder="Describe"
                                        rows={2}
                                        {...register("extraRequirements")}
                                    />
                                </div>
                            </div>

                            {/* Contact Information */}
                            <div className="border-t pt-8">
                                <h4 className="text-[30px] text-[#17171A] font-[600px] mb-6">Contact Information</h4>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-[18px] font-[500px] text-[#424242]">Name</Label>
                                        <Input id="name" className="px-[18px] h-[50px]" placeholder="Your Name" {...register("name")} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[18px] font-[500px] text-[#424242]">Email</Label>
                                        <Input
                                            className="px-[18px] h-[50px]"
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6 mt-6">
                                    <div className="space-y-2">
                                        <Label className="text-[18px] font-[500px] text-[#424242]">Phone</Label>
                                        <div className="flex">
                                            <div className="flex items-center px-3 border border-r-0 rounded-l-md bg-gray-50">
                                                <span className="text-sm">🇩🇪 +49</span>
                                            </div>
                                            <Input
                                                id="phone"
                                                placeholder="XXX XXXX"
                                                className="px-[18px] h-[50px]"
                                                {...register("phone")}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[18px] font-[500px] text-[#424242]">Notification Preference</Label>
                                        <Controller
                                            control={control}
                                            name="notification"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full h-[50px] py-6 flex items-center">
                                                        <SelectValue placeholder="In-app notifications" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="in-app">In-app notifications</SelectItem>
                                                        <SelectItem value="email">Email notifications</SelectItem>
                                                        <SelectItem value="sms">SMS notifications</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center space-x-2 mt-6">
                                    <Controller
                                        control={control}
                                        name="ownTools"
                                        render={({ field }) => (
                                            <Checkbox
                                                id="ownTools"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        )}
                                    />
                                    <Label className="text-sm">
                                        Do you have your own cleaning tools?
                                    </Label>
                                </div>
                            </div>

                            <Button
                                className="w-full h-[50px] bg-[#319E60] cursor-pointer hover:bg-[#319E60]/90 text-primary-foreground py-4 text-lg"
                                type="submit"
                            >
                                Post Now
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PostAJobForm;
