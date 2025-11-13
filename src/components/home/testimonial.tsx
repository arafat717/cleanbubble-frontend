"use client"
import dot_bg from '@/assets/home/dot_ibg.png';
import { Button } from "../ui/button";
import "swiper/css";
import "swiper/css/effect-cards";
import { useState } from 'react';
import CustomersReviews from './CustomersReviews';
import ContractorReview from './ContractorReviews';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  const [active, setActive] = useState(true);

  return (
    <div
      style={{
        backgroundImage: `url(${typeof dot_bg === "string" ? dot_bg : dot_bg.src})`,
      }}
      className="inset-0 bg-cover bg-center py-16"
    >
      <div className="max-w- mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="my-10 text-center">
          <span className="md:text-2xl text-xl bg-[#14A0C1] px-6 py-2 rounded-3xl font-medium font-roboto inline-block">
            {t("testimonials.title")}
          </span>
          <div className="uppercase text-2xl md:text-[44px] font-medium leading-11 flex justify-center gap-4 my-6">
            {t("testimonials.heading")}
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => setActive(true)}
              size="lg"
              className={`border border-[#AFC64F] bg-white font-roboto text-lg font-semibold text-[#17171A] hover:text-white cursor-pointer rounded-sm ${active ? "bg-gray-600 text-white" : ""}`}
            >
              {t("testimonials.customers")}
            </Button>
            <Button
              onClick={() => setActive(false)}
              size="lg"
              className={`bg-white font-roboto text-lg font-semibold text-[#5A27E5] rounded-sm border cursor-pointer hover:text-white border-[#4D24FF] ${active ? "" : "bg-gray-600 text-white"}`}
            >
              {t("testimonials.contractors")}
            </Button>
          </div>
        </div>
        <div className="container mx-auto max-w-5xl">
          {active ? <CustomersReviews /> : <ContractorReview />}
        </div>
      </div>
    </div>
  );
}
