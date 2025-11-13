'use client'
import Image from "next/image";
import React from "react";
import '@/i18n';
import residential from "@/assets/home/top-services/residential.svg";
import commercial from "@/assets/home/top-services/commercial.svg";
import office from "@/assets/home/top-services/office.svg";
import outdoor from "@/assets/home/top-services/outdoor.svg";
import { useTranslation } from "react-i18next";

const TopCategoriesJob = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="my-20 text-center">
          <span className="text-xl md:text-2xl bg-[#14A0C1] px-3 md:px-6 py-2 rounded-3xl font-medium font-roboto inline-block">
            {t("topCategoriesJob.sectionTitle")}
          </span>

          <div className="uppercase md:text-3xl md:text-[44px] font-medium leading-11 flex flex-wrap justify-center md:gap-4 my-6">
            <span>{t("topCategoriesJob.headlinePart1")}</span>
            <div>
              <span className="text-[#14A0C1]">{t("topCategoriesJob.headlinePart2")}</span>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="147"
                height="14"
                viewBox="0 0 147 14"
                fill="none"
                className="w-30 md:w-[147px] text-[#14A0C1]"
              >
                <path
                  d="M3 11C23.854 4.96301 81.2495 -3.48877 144 11"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg> */}
            </div>
            <span>{t("topCategoriesJob.headlinePart3")}</span>
          </div>
        </div>

        {/* Residential */}
        <div className="text-[#17171A] font-roboto font-semibold leading-[100%] flex flex-col md:flex-row items-center">
          <div className="flex items-center gap-10 flex-1">
            <Image src={residential.src} alt="Residential" width={1000} height={1000} className="w-20 h-20 rounded-xl" priority />
            <p className="text-2xl md:text-3xl">{t("topCategoriesJob.residentialTitle")}</p>
          </div>
          <p className="text-xl md:text-2xl text-wrap flex-1">
            {t("topCategoriesJob.residentialDesc")}
          </p>
        </div>

        <hr className="h-[2px] my-3 bg-[#17171A]" />

        {/* Commercial */}
        <div className="text-[#17171A] font-roboto font-semibold leading-[100%] flex flex-col md:flex-row items-center">
          <div className="flex items-center gap-10 flex-1">
            <Image src={commercial.src} alt="Commercial" width={1000} height={1000} className="w-20 h-20 rounded-xl" priority />
            <p className="text-2xl md:text-3xl">{t("topCategoriesJob.commercialTitle")}</p>
          </div>
          <p className="text-xl md:text-2xl text-wrap flex-1">
            {t("topCategoriesJob.commercialDesc")}
          </p>
        </div>

        <hr className="h-[2px] my-3 bg-[#17171A]" />

        {/* Office */}
        <div className="text-[#17171A] font-roboto font-semibold leading-[100%] flex flex-col md:flex-row items-center">
          <div className="flex items-center gap-10 flex-1">
            <Image src={office.src} alt="Office" width={1000} height={1000} className="w-20 h-20 rounded-xl" priority />
            <p className="text-2xl md:text-3xl">{t("topCategoriesJob.officeTitle")}</p>
          </div>
          <p className="text-xl md:text-2xl text-wrap flex-1">
            {t("topCategoriesJob.officeDesc")}
          </p>
        </div>

        <hr className="h-[2px] my-3 bg-[#17171A]" />

        {/* Outdoor */}
        <div className="text-[#17171A] font-roboto font-semibold leading-[100%] flex flex-col md:flex-row items-center">
          <div className="flex items-center gap-10 flex-1">
            <Image src={outdoor.src} alt="Outdoor" width={1000} height={1000} className="w-20 h-20 rounded-xl" priority />
            <p className="text-2xl md:text-3xl">{t("topCategoriesJob.outdoorTitle")}</p>
          </div>
          <p className="text-xl md:text-2xl text-wrap flex-1">
            {t("topCategoriesJob.outdoorDesc")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopCategoriesJob;
