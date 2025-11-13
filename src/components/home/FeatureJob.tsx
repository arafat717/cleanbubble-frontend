/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import ServiceCard from '../shared/ServiceCard';
import { useAllPostQuery } from '@/redux/api/publicePage/homepage.api';
import Loader from '../shared/Loader';
import { useTranslation } from 'react-i18next';

const FeatureJob = () => {
  const { data, isLoading, isError } = useAllPostQuery('')
  // console.log(data?.data)
  const { t } = useTranslation();

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="py-20">
      <div className="my-20 text-center">
        <span className="text-xl md:text-2xl bg-[#14A0C1] px-5 md:px-6 py-2 rounded-3xl font-medium font-roboto inline-block">
          {t("featureJob.featuredCleaningJobs")}
        </span>
        <div className="uppercase text-2xl md:text-[44px] font-medium leading-11 flex justify-center gap-4 my-6">
          <p>{t("featureJob.latestCleaningJobs")}</p>
        </div>
      </div>
      <div className="container mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-500">{t("featureJob.loadingJobs")}</p>
        ) : isError ? (
          <p className="text-center text-red-500">{t("featureJob.somethingWentWrong")}</p>
        ) : data?.data?.data?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center gap-2">
            {data?.data?.data?.slice(0, 4).map((item: any) => (
              <ServiceCard key={item?._id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">{t("featureJob.noJobsAvailable")}</p>
        )}
      </div>
    </div >
  )
}

export default FeatureJob
