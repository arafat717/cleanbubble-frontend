"use client"
import cleaningContructor from "@/assets/home/cleaning-contructor.png";
import howitworks from "@/assets/home/how-it-work.png";
import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function HowItWorks() {
  const { t } = useTranslation();

  return (
    <section className="py-20 container mx-auto">
      <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8">
        {/* Job Posters Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="mb-6">
                <span className="text-xl md:text-2xl bg-[#14A0C1] px-6 py-2 rounded-3xl font-medium font-roboto">
                  {t("howItWorks.sectionTitle")}
                </span>
                <div className="text-4xl md:text-[56px] flex flex-row md:flex-row flex-wrap items-center gap-4 my-4">
                  <h2>{t("howItWorks.sectionTitle")}</h2>
                  <div>
                    <p className="text-[#14A0C1]">{t("howItWorks.jobPosters")}</p>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="268"
                      height="20"
                      viewBox="0 0 268 20"
                      fill="none"
                      className="-mt-3 md:-mt-4 w-36 md:w-[268px] text-[#14A0C1]"
                    >
                      <path
                        d="M4 16C42.4541 6.94452 148.29 -5.73316 264 16"
                        stroke="#14A0C1"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg> */}
                  </div>
                </div>
              </div>
              <div className="space-y-4 my-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex gap-6">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="67"
                        viewBox="0 0 13 67"
                        fill="none"
                        className="w-5 md:w-[13px] h-12 md:h-[67px]"
                      >
                        <path
                          d="M6.5 0C10.0899 0 13 2.91015 13 6.5C13 9.92155 10.3561 12.7231 7 12.9785V66.5H6V12.9785C2.64387 12.7231 0 9.92155 0 6.5C0 2.91015 2.91015 0 6.5 0Z"
                          fill="#363636"
                        />
                      </svg>
                    </span>
                    <p className="font-roboto text-xl md:text-2xl font-semibold leading-6 md:leading-9 -mt-2">
                      {t(`howItWorks.posterStep${step}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Image
                src={howitworks.src}
                alt={t("howItWorks.jobPosters")}
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Cleaning Contractors Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src={cleaningContructor.src}
                alt={t("howItWorks.cleaningContractors")}
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-lg"
                priority
              />
            </div>
            <div className="space-y-6">
              <div className="mb-6">
                <span className="text-xl md:text-2xl bg-[#14A0C1] px-6 py-2 rounded-3xl font-medium font-roboto">
                  {t("howItWorks.sectionTitle")}
                </span>
                <div className="text-4xl md:text-[44px] flex flex-wrap items-center gap-4 my-4">
                  <h2>{t("howItWorks.sectionTitle")}</h2>
                  <div className="flex flex-col gap-1">
                    <span className="text-[#14A0C1]">{t("howItWorks.cleaningContractors")}</span>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="372"
                      height="20"
                      viewBox="0 0 372 20"
                      fill="none"
                      className="md:-mt-5 w-36 md:w-[372px] text-[#14A0C1]"
                    >
                      <path
                        d="M4 16C57.8357 6.94452 206.006 -5.73316 368 16"
                        stroke="#14A0C1"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                    </svg> */}
                  </div>
                </div>
              </div>
              <div className="space-y-4 my-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex gap-6">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="67"
                        viewBox="0 0 13 67"
                        fill="none"
                        className="w-5 md:w-[13px] h-12 md:h-[67px]"
                      >
                        <path
                          d="M6.5 0C10.0899 0 13 2.91015 13 6.5C13 9.92155 10.3561 12.7231 7 12.9785V66.5H6V12.9785C2.64387 12.7231 0 9.92155 0 6.5C0 2.91015 2.91015 0 6.5 0Z"
                          fill="#363636"
                        />
                      </svg>
                    </span>
                    <p className="font-roboto text-xl md:text-2xl font-semibold leading-6 md:leading-9 -mt-2">
                      {t(`howItWorks.contractorStep${step}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
