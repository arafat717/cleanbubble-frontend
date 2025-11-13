'use client'
import AllJobs from "@/components/home/AllJobs"
import JobHero from "@/components/job/job-hero"
import { Button } from "@/components/ui/button"
import PricingPage from "../pricing/page"
import Link from "next/link";
import Loader from "@/components/shared/Loader";
import { useGetMeQuery } from "@/redux/api/authApi";
import { useTranslation } from "react-i18next"


export default function BrowseJobsPage() {
  const { data, isLoading } = useGetMeQuery('')
  const { t } = useTranslation();
  if (isLoading) {
    return <Loader></Loader>
  }
  const user = data?.data;

  return (
    <div className="min-h-screen bg-background ">
      {/* Hero Section */}
      <JobHero />
      {/* Featured Jobs */}
      <AllJobs></AllJobs>
      <div className="container mx-auto px-4">
        {/* Subscription Pricing */}
        <PricingPage></PricingPage>
        {/* CTA Section */}
        {!user?.role && (
          <div className="my-10 text-center">
            <span className="text-xl bg-[#14A0C1] px-6 py-2 rounded-3xl font-medium font-roboto inline-block">
              {t('readySection.title')}
            </span>

            <div className="uppercase text-2xl md:text-[44px] font-medium leading-11 flex justify-center gap-4 my-8 max-w-5xl mx-auto">
              {t('readySection.subtitle')}
            </div>

            <div className="flex justify-center gap-4">
              <Link href="/constractor-registration">
                <Button
                  size="lg"
                  className="bg-[#319E60] cursor-pointer font-roboto text-lg font-semibold text-white rounded-3xl"
                >
                  {t('readySection.cta')}
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
