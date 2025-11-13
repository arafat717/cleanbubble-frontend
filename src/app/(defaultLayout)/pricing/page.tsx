/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useGetAllOffersQuery } from "@/redux/api/publicePage/homepage.api";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Loader from "@/components/shared/Loader";

export default function PricingPage() {
  const { t } = useTranslation();
  const { data, isLoading, isError } = useGetAllOffersQuery({});

  if (isLoading) {
    return (
      <Loader></Loader>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500 px-4 text-sm md:text-base">
        {t("pricingPage.somethingWentWrong")}
      </div>
    );
  }

  const plans = data?.data || [];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-10 md:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="my-6 md:my-10 text-center">
            <span className="text-base sm:text-sm md:text-2xl bg-[#14A0C1] px-4 sm:px-6 py-1.5 sm:py-2 rounded-3xl font-medium font-roboto inline-block">
              {t("pricingPage.planAndPricing")}
            </span>
            <div className="uppercase text-xl sm:text-3xl md:text-[44px] font-medium leading-tight md:leading-11 flex justify-center gap-2 md:gap-4 my-4 md:my-6 px-4">
              <p className="break-words">{t("pricingPage.simpleTransparentPricing")}</p>
            </div>
          </div>

          {/* Plans Section */}
          <section className="flex flex-wrap justify-center items-stretch gap-4 md:gap-6 mt-6 md:mt-7">
            {plans.map((plan: any, index: number) => (
              <div key={plan.id} className="flex justify-center items-center w-full sm:w-auto">
                <div className={`w-full sm:w-[400px] md:w-[460px] h-full rounded-3xl md:rounded-[60.901px] border-2 border-[#797880] bg-[var(--primary-2-base)] relative`}>
                  {/* Plan Badge */}
                  <div className="my-6 md:my-10 text-center absolute -top-12 md:-top-18 left-0 right-0 px-4 md:px-6 py-2 md:py-4 flex justify-center items-center">
                    <p className={`w-[160px] sm:w-[180px] md:w-[200px] py-1.5 md:py-2 text-sm md:text-base rounded-3xl border text-white ${index % 2 === 0 ? "bg-[#319E60] border-[#319E60]" : "bg-[#14A0C1] border-[#14A0C1]"}`}>
                      {t(plan.planType)}
                    </p>
                  </div>

                  {/* Plan Details */}
                  <div className="flex flex-col my-6 md:my-10 w-full">
                    <div className="w-full text-center py-4 md:py-6">
                      <h1 className="font-roboto text-5xl sm:text-6xl md:text-[84px] font-bold leading-tight md:leading-28">
                        €{plan.price}
                        <span className="text-xl sm:text-2xl md:text-3xl font-normal">/{t("pricingPage.month")}</span>
                      </h1>
                      <p className="text-[#3D3D3D] font-roboto text-xl sm:text-2xl md:text-[30px] font-medium leading-tight md:leading-[34.288px] tracking-normal mt-2">
                        {t(plan.planType)}
                      </p>
                    </div>

                    <hr className="border-[#797880] w-full" />

                    {plan.price ? (
                      <div>
                        <h1 className="text-center text-xs sm:text-sm p-2 px-4">
                          {t("pricingPage.enjoyFirst3MonthsFree")} €{plan.price} {t("pricingPage.perMonth")}
                        </h1>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-center text-xs sm:text-sm p-2 px-4">
                          {t("pricingPage.serviceFree")}
                        </h1>
                      </div>
                    )}

                    <hr className="border-[#797880] w-full" />

                    {/* Facilities */}
                    <div className="space-y-3 md:space-y-4 flex flex-col justify-around mx-6 sm:mx-8 md:mx-10 mt-6 md:mt-10">
                      {plan.facilities?.map((facility: string, i: number) => (
                        <div key={i} className="flex items-center gap-3 md:gap-4">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 41 42" fill="none" className="flex-shrink-0 md:w-5 md:h-5">
                            <path d="M20.2612 41.1947C31.4514 41.1947 40.5223 32.1238 40.5223 20.9335C40.5223 9.74329 31.4514 0.672363 20.2612 0.672363C9.07092 0.672363 0 9.74329 0 20.9335C0 32.1238 9.07092 41.1947 20.2612 41.1947Z" fill={index % 2 === 0 ? "#319E60" : "#14A0C1"} />
                            <path d="M11.0918 22.2436L16.3314 27.4832L29.4303 14.3843" stroke="white" strokeWidth="3.1171" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <p className="text-[#211F54] font-roboto text-base sm:text-lg md:text-xl font-bold leading-tight md:leading-6 tracking-normal">
                            {t(facility)}
                          </p>
                        </div>
                      ))}

                      {/* CTA */}
                      <div className="mt-6 md:mt-10 pb-6 md:pb-0">
                        <Link href={`/subscribtion/${plan.id}`}>
                          <button className={`cursor-pointer w-full sm:w-[320px] md:w-[350px] py-2.5 md:py-3 rounded-3xl text-white ${index % 2 === 0 ? "bg-[#319E60]" : "bg-[#14A0C1]"} transition-all hover:opacity-90`}>
                            <h2 className="font-roboto text-center text-lg md:text-xl font-semibold">
                              {t("pricingPage.getStarted")}
                            </h2>
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
      </main>
    </div>
  );
}