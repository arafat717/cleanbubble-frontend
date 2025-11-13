"use client"
import { MoveRight } from "lucide-react";
import hero_bg from '../../../public/images/home.png'
import Link from "next/link";
import { T } from "@/utils/translations";
import { useGetMeQuery } from "@/redux/api/authApi";
import Loader from "../shared/Loader";
import '@/i18n';
import { useTranslation } from 'react-i18next';

export default function HeroSection() {
  const { data, isLoading } = useGetMeQuery('')
  const { t } = useTranslation()

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <section className="relative overflow-hidden h-[80vh] -mt-20">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${typeof hero_bg === "string" ? hero_bg : hero_bg.src})`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        {/* Content Container */}
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center h-full">
            {/* Text Content - Left Side Only */}
            <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
              <div className="space-y-6">
                {/* Main Headlines */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-medium leading-tight">
                    {t('hero.headline')}
                  </h1>
                  <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl font-medium leading-tight">
                    <T>Meet</T> <span className="text-[#319E60]">{t('hero.heldlinetwo')}</span>
                  </h1>
                </div>

                {/* Description */}
                <p className="font-roboto max-w-xs sm:max-w-sm md:max-w-md text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-bold text-[#17171A]">
                  {t("hero.description")}
                </p>

                {/* CTA Button */}
                {!data?.data && (
                  <div className="pt-2">
                    <Link href={'/constractor-registration'}>
                      <button className="group bg-[#319E60] relative cursor-pointer text-white font-semibold pl-5 sm:pl-6 pr-14 sm:pr-16 py-3 sm:py-4 rounded-full hover:bg-[#2a8a52] transition-all duration-300 shadow-lg hover:shadow-xl">
                        <span className="text-sm sm:text-base">{t('hero.button')}</span>
                        <span className="bg-white p-2 sm:p-3 rounded-full absolute right-1 top-1/2 -translate-y-1/2 transition-transform group-hover:scale-110">
                          <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                        </span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}