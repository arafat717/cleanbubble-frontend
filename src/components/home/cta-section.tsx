'use client'
import { Button } from "@/components/ui/button"
import Image from "next/image";
import mobile from '@/assets/home/mobile_phone.png';
import staff from '@/assets/home/staff.jpg';
import Link from "next/link";
import { useGetMeQuery } from "@/redux/api/authApi";
import Loader from "../shared/Loader";
import { useTranslation } from "react-i18next";

export default function CTASection() {
  const { data, isLoading } = useGetMeQuery('');
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader />;
  }

  const user = data?.data;

  return (
    <div className="py-20 px-1.5 bg-background container mx-auto">
      {/* First Block */}
      <section className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl font-normal leading-8 md:leading-14">
              {t("ctaSection.firstBlockLine1")}
              <span className="text-[#6A6A6A] ml-2">
                {t("ctaSection.firstBlockLine2")}
              </span>
            </p>
          </div>
          <div>
            <Image
              src={mobile.src}
              alt="Mobile App"
              width={1000}
              height={1000}
              className="w-full h-auto rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>
      </section>

      {/* Second Block */}
      <section className="my-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Image
              src={staff.src}
              alt="Staff"
              width={1000}
              height={1000}
              className="w-full h-auto rounded-xl shadow-lg"
              priority
            />
          </div>
          <div className="space-y-6">
            <p className="text-2xl md:text-4xl font-normal leading-8 md:leading-14">
              {t("ctaSection.secondBlockLine1")}
              <span className="text-[#6A6A6A] ml-2">
                {t("ctaSection.secondBlockLine2")}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      {(!user?.role || user?.role === "USER") && (
        <div className="my-20 text-center">
          {/* Title */}
          <span className="text-xl sm:text-2xl md:text-3xl bg-[#14A0C1] px-4 sm:px-6 py-1 sm:py-2 rounded-3xl font-medium font-roboto inline-block">
            {t("ctaSection.getStartedTitle")}
          </span>

          {/* Description */}
          <div className="uppercase text-lg sm:text-2xl md:text-[44px] font-medium leading-6 sm:leading-8 md:leading-11 flex justify-center gap-2 sm:gap-4 my-4 sm:my-6">
            <p className="max-w-full sm:max-w-2xl md:max-w-4xl text-center">
              {t("ctaSection.getStartedDescription")}
            </p>
          </div>

          <div className="flex justify-center gap-4 flex-wrap">
            {!user?.role && (
              <Link href="/constractor-registration">
                <Button
                  size="lg"
                  className="bg-[#319E60] cursor-pointer font-roboto text-lg font-semibold text-white rounded-3xl whitespace-nowrap"
                >
                  {/* Text changes for different screen sizes */}
                  <span className="hidden sm:inline">{t("ctaSection.joinAsContractor")}</span>
                  <span className="inline sm:hidden">{t("ctaSection.joinAsContractor")}</span>
                </Button>
              </Link>
            )}

            <Link href="/post-job">
              <Button
                size="lg"
                className="bg-white cursor-pointer font-roboto text-lg font-semibold text-[#319E60] rounded-3xl border border-[#319E60] whitespace-nowrap"
              >
                <span className="hidden sm:inline">{t("ctaSection.postJobNow")}</span>
                <span className="inline sm:hidden">{t("ctaSection.postJobNow")}</span>
              </Button>
            </Link>
          </div>

        </div>
      )}
    </div>
  );
}
