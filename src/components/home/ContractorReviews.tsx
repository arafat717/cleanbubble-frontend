/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Image from "next/image";
import { useGetAllContractorReviewsQuery } from "@/redux/api/publicePage/reviews.api";
import testimonial_person from '@/assets/home/testimonial.jpg';
import { T } from "@/utils/translations";
import Loader from "../shared/Loader";

const ContractorReview = () => {
    const { data, isLoading } = useGetAllContractorReviewsQuery({});
    if (isLoading) {
        return <Loader></Loader>
    }
    const reviews = data?.data?.data || [];
    return (
        <div className="w-full px-4 py-10">
            <Swiper
                effect="cards"
                grabCursor
                modules={[EffectCards]}
                className="mySwiper"
            >
                {reviews?.map((review: any) => (
                    <SwiperSlide key={review.id}>
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 bg-white p-6 rounded-xl shadow-md h-full">

                            {/* Reviewer Image */}
                            <div className="flex-shrink-0 w-28 h-28 md:w-40 md:h-40 relative rounded-full overflow-hidden">
                                <Image
                                    src={review.reviewer.profileImage || testimonial_person.src}
                                    alt={review.reviewer.fullName}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Review Content */}
                            <div className="flex-1 flex flex-col justify-center gap-4">
                                {/* Quote Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 72 53"
                                    fill="none"
                                >
                                    <path
                                        d="M72 0C70.7104 5.48027 69.3493 11.3932 67.9164 17.7388C66.4836 24.0844 65.194 30.2857 64.0478 36.3429C62.9015 42.4 61.9701 47.9524 61.2537 53H40.8358L39.3313 50.6204C40.6209 45.5728 42.2687 40.1646 44.2746 34.3959C46.2806 28.483 48.5015 22.5701 50.9373 16.6571C53.3731 10.7442 55.7373 5.19184 58.0299 0H72ZM32.2388 0C30.9493 5.48027 29.5881 11.3932 28.1552 17.7388C26.7224 24.0844 25.4328 30.2857 24.2866 36.3429C23.1403 42.4 22.209 47.9524 21.4925 53H1.28955L0 50.6204C1.28955 45.5728 2.93731 40.1646 4.94328 34.3959C6.94925 28.483 9.09851 22.5701 11.391 16.6571C13.8269 10.7442 16.191 5.19184 18.4836 0H32.2388Z"
                                        fill="#17171A"
                                    />
                                </svg>

                                {/* Review Comment */}
                                <p className="text-black text-lg md:text-2xl font-medium leading-relaxed">
                                    “<T>{review.comment}</T>”
                                </p>

                                {/* Reviewer Info */}
                                <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-2">
                                    <div className="text-center md:text-left">
                                        <p className="text-lg md:text-xl font-semibold">
                                            <T>{review.reviewer.fullName}</T>
                                        </p>
                                        <p className="text-sm md:text-base text-gray-600">
                                            <T>{review.reviewer.role}</T>
                                        </p>
                                        <p className="text-sm md:text-base text-gray-600">
                                            <T>{review.reviewer.email}</T>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ContractorReview;
