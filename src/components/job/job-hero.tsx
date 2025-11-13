import { MoveRight } from 'lucide-react';
import React from 'react';
import jobHero from '../../../public/images/job_hero.png';
import Link from 'next/link';
import { useGetMeQuery } from '@/redux/api/authApi';
import Loader from '../shared/Loader';
import { useTranslation } from 'react-i18next';

const JobHero = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useGetMeQuery('');

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="relative overflow-hidden h-screen -mt-20">
      {/* Background Image */}
      <div
        style={{
          backgroundImage: `url(${typeof jobHero === 'string' ? jobHero : jobHero.src})`,
        }}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <div className="container mx-auto h-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-center h-full">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4 lg:space-y-6">
              <div className="max-w-full lg:max-w-lg xl:max-w-xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight">
                  {t('jobHero.headline1')}{' '}
                  <span className="text-[#319E60]">{t('jobHero.headline2')}</span>
                </h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium mt-2">
                  {t('jobHero.headline3')}
                </h1>
              </div>

              <p className="font-roboto font-medium max-w-full sm:max-w-md md:max-w-sm text-base sm:text-lg md:text-xl leading-6 text-[#17171A]">
                {t('jobHero.description')}
              </p>

              {/* CTA Button */}
              {!data?.data && (
                <div>
                  <Link href="/constractor-registration">
                    <button className="group bg-[#319E60] relative cursor-pointer text-white font-semibold pl-5 sm:pl-6 pr-14 sm:pr-16 py-3 sm:py-4 rounded-full hover:bg-[#2a8a52] transition-all duration-300 shadow-lg hover:shadow-xl">
                      <span className="text-sm sm:text-base">{t('jobHero.cta')}</span>
                      <span className="bg-white p-2 sm:p-3 rounded-full absolute right-1 top-1/2 -translate-y-1/2 transition-transform group-hover:scale-110">
                        <MoveRight className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
                      </span>
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Optional Image Placeholder for side-by-side layout */}
            <div className="hidden lg:block w-1/2 h-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobHero;
