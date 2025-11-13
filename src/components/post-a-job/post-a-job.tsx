"use client";
import { MoveRight } from "lucide-react";
import React from "react";
import JobHero_img from "../../../public/images/job_post_hero.png";
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/authApi";
import Loader from "../shared/Loader";
import { useTranslation } from "react-i18next";
import '@/i18n';

const PostAJob = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMeQuery("");

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative overflow-hidden h-screen -mt-20">
      <div
        style={{
          backgroundImage: `url(${typeof JobHero_img === "string" ? JobHero_img : JobHero_img.src})`,
        }}
        className="absolute inset-0 bg-cover bg-center"
      >
        {/* Dark overlay for better text readability on mobile */}
        <div className="absolute inset-0 "></div>

        <div className="relative flex flex-col max-w-5xl h-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center md:items-center justify-center h-full">
            <div className="text-center md:text-left">
              <div className="max-w-full md:max-w-[50rem]">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium">
                  {t("postAJob.headline1")}{" "}
                  <span className="text-[#319E60]">
                    {t("postAJob.headline2")}
                  </span>
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium mt-2">
                  {t("postAJob.headline3")}
                </h1>
              </div>

              <p className="font-roboto font-medium max-w-full sm:max-w-md md:max-w-sm text-base sm:text-lg md:text-xl leading-6 my-4 md:my-6 text-[#17171A]">
                {t("postAJob.description")}
              </p>

              <div className="flex justify-center md:justify-start">
                {!data?.data && (
                  <Link href="/constractor-registration">
                    <button className="bg-[#319E60] relative cursor-pointer text-white font-semibold pl-4 pr-14 sm:pr-16 md:pr-17 py-3 md:py-4 rounded-full text-sm sm:text-base hover:bg-[#2a8653] transition-colors">
                      <span>{t("postAJob.cta")}</span>
                      <span className="bg-white p-2 md:p-3 rounded-full absolute right-1 top-1/2 -translate-y-1/2">
                        <MoveRight className="w-5 h-5 md:w-7 md:h-7 text-black" />
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostAJob;