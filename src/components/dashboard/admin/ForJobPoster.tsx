/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Loader from "@/components/shared/Loader";
import { useGetAllOffersQuery } from "@/redux/api/publicePage/homepage.api";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { CiEdit } from "react-icons/ci";




const ForJobPoster = () => {
    const { data, isLoading, isError } = useGetAllOffersQuery({});
    const plans = data?.data || [];
    const { t } = useTranslation();



    if (isLoading) {
        return (
            <Loader></Loader>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex justify-center items-center text-red-500">
                Something went wrong. Please try again.
            </div>
        );
    }

    return (
        <>
            <div>
                <section className="flex flex-wrap justify-center items-center gap-6 mt-7">
                    {plans.map((plan: any, index: number) => (
                        <div
                            key={plan.id}
                            className="flex justify-center items-center"
                        >
                            <div
                                className={`w-[460px]  flex-shrink-0 rounded-[60.901px] border-2 border-[#797880] bg-[var(--primary-2-base)] relative`}
                            >
                                {/* Plan Badge */}
                                <div className="my-10 text-center absolute -top-18 left-0 right-0 px-6 py-4 flex justify-center items-center">
                                    <p
                                        className={`w-[200px] py-2 rounded-3xl border text-white ${index % 2 === 0
                                            ? "bg-[#319E60] border-[#319E60]"
                                            : "bg-[#14A0C1] border-[#14A0C1]"
                                            }`}
                                    >
                                        {plan.planType}
                                    </p>
                                </div>

                                {/* Plan Details */}
                                <div className="flex flex-col my-10 w-full">
                                    <div className="w-full text-center py-6">
                                        <h1 className="font-roboto text-[84px] font-bold leading-28">
                                            €{plan.price}
                                            <span className="text-3xl font-normal">/month</span>
                                        </h1>
                                        <p className="text-[#3D3D3D] font-roboto text-[30px] font-medium leading-[34.288px] tracking-normal">
                                            {plan.planType}
                                        </p>
                                    </div>
                                    <hr className="border-[#797880] border-1 w-full" />

                                    {/* Facilities */}
                                    <div className="space-y-4 flex flex-col justify-around mx-10 mt-10">
                                        {plan.facilities?.map((facility: string, i: number) => (
                                            <div key={i} className="flex items-center gap-4">
                                                {/* Check icon */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 41 42"
                                                    fill="none"
                                                >
                                                    <path
                                                        d="M20.2612 41.1947C31.4514 41.1947 40.5223 32.1238 40.5223 20.9335C40.5223 9.74329 31.4514 0.672363 20.2612 0.672363C9.07092 0.672363 0 9.74329 0 20.9335C0 32.1238 9.07092 41.1947 20.2612 41.1947Z"
                                                        fill={index % 2 === 0 ? "#319E60" : "#14A0C1"}
                                                    />
                                                    <path
                                                        d="M11.0918 22.2436L16.3314 27.4832L29.4303 14.3843"
                                                        stroke="white"
                                                        strokeWidth="3.1171"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p className="text-[#211F54] font-roboto text-xl font-bold leading-6 tracking-normal">
                                                    {facility}
                                                </p>
                                            </div>
                                        ))}

                                        {/* CTA */}
                                        <div className="mt-10">
                                            <Link href={`/dashboard/admin/pricing-plans/edit-pricing/${plan.id}`}>
                                                <button
                                                    className={`cursor-pointer w-[350px] py-3 rounded-3xl text-white flex items-center justify-center gap-2
        ${index % 2 === 0 ? "bg-[#319E60]" : "bg-[#14A0C1]"}
      `}
                                                >
                                                    <CiEdit className="text-2xl" />
                                                    <span className="font-roboto text-xl font-semibold">{t('jobPoster.editPlan')}</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default ForJobPoster;
