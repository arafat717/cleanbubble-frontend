import React from 'react'
import bg_hero from '../../../../public/images/share_hero.png'
import Testimonials from '@/components/home/testimonial';

const page = () => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${typeof bg_hero === "string" ? bg_hero : bg_hero.src
            })`,
        }}
        className="relative overflow-hidden w-full min-h-[92vh] -mt-16 flex flex-col items-center justify-center bg-cover bg-center"
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl lg:text-[80px] font-normal leading-tight text-[#17171A]">
            REAL STORIES FROM REAL USERS
          </h1>
          <h4 className="text-base md:text-xl lg:text-2xl text-[#17171A] font-roboto font-medium leading-relaxed text-center mt-4">
            See how our platform is helping clients find quality cleaning help and
            helping <br className="hidden md:block" /> contractors grow their
            business — job by job.
          </h4>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}

export default page