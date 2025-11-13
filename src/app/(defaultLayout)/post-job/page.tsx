'use client'
import howitworks from "@/assets/home/how-it-work.png";
import PostAJob from "@/components/post-a-job/post-a-job";
import PostAJobForm from "@/components/post-a-job/post-a-job-form";
import { ContractorsSection } from "@/components/post-a-job/TopContractor";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function PostJobPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PostAJob />
      <div className="px-4 my-20">
        {/* Job Posters Section */}
        <section className="mb-8 md:mb-12 lg:mb-16 container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <div className="mb-4 sm:mb-5 md:mb-6">
                <span className="text-sm sm:text-base md:text-xl lg:text-2xl bg-[#14A0C1] px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-3xl font-medium font-roboto inline-block">
                  {t("postJobPage.badge")}
                </span>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[46px] flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 md:gap-4 my-3 sm:my-4 leading-tight">
                  <h2 className="break-words">{t("postJobPage.headline")}</h2>
                  <div>
                    <span className="text-[#14A0C1] break-words">
                      {t("postJobPage.highlight")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3 sm:space-y-4 my-3 sm:my-4">
                {[1, 2, 3, 4].map((num) => (
                  <div key={num} className="flex gap-3 sm:gap-4 md:gap-6">
                    <span className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="50"
                        viewBox="0 0 13 67"
                        fill="none"
                        className="sm:w-[11px] sm:h-[55px] md:w-[13px] md:h-[67px]"
                      >
                        <path
                          d="M6.5 0C10.0899 0 13 2.91015 13 6.5C13 9.92155 10.3561 12.7231 7 12.9785V66.5H6V12.9785C2.64387 12.7231 0 9.92155 0 6.5C0 2.91015 2.91015 0 6.5 0Z"
                          fill="#363636"
                        />
                      </svg>
                    </span>
                    <p className="font-roboto text-base sm:text-lg md:text-xl lg:text-2xl font-semibold leading-tight sm:leading-relaxed md:leading-9 -mt-1 sm:-mt-1.5 md:-mt-2">
                      {t(`postJobPage.steps.step${num}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-first lg:order-last">
              <Image
                src={howitworks.src}
                alt={t("postJobPage.headline")}
                width={600}
                height={400}
                className="w-full h-auto rounded-lg sm:rounded-xl shadow-lg"
                priority
              />
            </div>
          </div>
        </section>
        {/* top job category */}
        <ContractorsSection />

        {/* Job Form */}
        <PostAJobForm />
      </div>
    </div>
  );
}
