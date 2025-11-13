/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react'
import { Button } from '../ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';
import Link from 'next/link';
import DateMaker from '@/utils/DateMaker';
import { useAcceptTaskMutation } from '@/redux/api/publicePage/homepage.api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useGetMeQuery } from '@/redux/api/authApi';
import { T } from '@/utils/translations';

const ServiceCard = ({ item }: any) => {
  const [acceptTask] = useAcceptTaskMutation()
  const router = useRouter()
  const { data: userData } = useGetMeQuery('')
  const status = userData?.data?.status;

  const handleAccept = async (id: string) => {
    if (!userData) return toast.error("You need to be logged in to send an offer!")
    if (status === 'PENDING') {
      return toast.error("You need admin approve for accept task! Waiting for approve")
    }
    const res = await acceptTask(id)
    if (res?.data) {
      toast.success('Task accepted successfully!')
      router.push('/dashboard/contractor/my-jobs')
    } else if (res?.error) {
      const errorMessage =
        (res.error as { data?: { message?: string } })?.data?.message ||
        (res.error as { message?: string })?.message ||
        "Something went wrong!";
      toast.error(errorMessage);
    }
    else {
      toast.error("Something went wrong!")
    }
  }

  // Clean time formatting function
  const formatTime = (timeString: string) => {
    if (!timeString) return timeString;
    return timeString.replace(/[\u0600-\u06FF\u0750-\u077F]/g, '').trim();
  }

  // Clean date formatting
  const formatDate = (dateString: string) => {
    if (!dateString) return dateString;
    try {
      const cleanDate = DateMaker(dateString);
      return cleanDate.replace(/[\u0600-\u06FF\u0750-\u077F]/g, '').trim();
    } catch (error: any) {
      return dateString;
    }
  }

  return (
    <Card className="w-full max-w-[340px] sm:max-w-[360px] md:max-w-[370px] mx-auto bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow min-h-[450px] sm:min-h-[480px] md:min-h-[500px] flex flex-col">
      {/* Property Image */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-60 w-full overflow-hidden flex-shrink-0">
        <Image
          src={item?.photos[0]}
          width={1000}
          height={1000}
          alt="Service image"
          className="w-full h-full object-cover rounded-xl sm:rounded-2xl md:rounded-3xl p-1.5 sm:p-2"
        />
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-grow">
        {/* Title and Price */}
        <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-3">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-gray-900 flex-1 line-clamp-2 leading-tight">
            <T>{item?.jobTitle}</T>
          </h2>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 mb-0.5"><T>Price</T></p>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 whitespace-nowrap leading-tight">
              €<T>{item?.price}</T>
            </p>
          </div>
        </div>

        {/* Property Details */}
        <div className="space-y-1.5 sm:space-y-2 md:space-y-2.5 mb-3 sm:mb-4 md:mb-5 flex-grow">
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#14A0C1]" />
            </div>
            <span className="text-xs sm:text-sm md:text-base text-gray-600 truncate leading-tight">
              <T>{item?.city}</T>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#14A0C1]" />
            </div>
            <span className="text-xs sm:text-sm md:text-base text-gray-600 truncate leading-tight">
              <T>Date</T>: {formatDate(item.date)}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 text-[#14A0C1]" />
            </div>
            <span className="text-xs sm:text-sm md:text-base text-gray-600 truncate leading-tight">
              <T>Time</T>: {formatTime(item?.time)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2.5 md:gap-3 mt-auto">
          <Button
            onClick={() => handleAccept(item?.id)}
            className="w-full sm:flex-1 bg-[#319E60] hover:bg-[#2a8653] cursor-pointer text-white rounded-full py-2 sm:py-2.5 md:py-3 font-medium text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px] transition-colors"
          >
            <T>Accept</T>
          </Button>
          <Link href={`/jobs/job-details/${item?.id}`} className="w-full sm:flex-1">
            <Button
              variant="outline"
              className="w-full border-2 border-[#319E60] text-[#319E60] cursor-pointer hover:bg-[#319E60] hover:text-white rounded-full py-2 sm:py-2.5 md:py-3 font-medium bg-transparent text-xs sm:text-sm md:text-base min-h-[36px] sm:min-h-[40px] md:min-h-[44px] transition-all"
            >
              <T>Make Offer</T>
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default ServiceCard