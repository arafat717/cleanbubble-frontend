'use client';
import '@/i18n';
import { Button } from '@/components/ui/button';
import Image from "next/image";
import Link from 'next/link';
import authImage from '../../../../public/images/proccessImage.jpg';
import { useTranslation } from 'react-i18next';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="max-h-screen grid grid-cols-1 md:grid-cols-2">
      <div className="w-full">
        <Image
          src={authImage}
          alt="Login Image"
          width={1000}
          height={1000}
          className="h-screen object-cover"
        />
      </div>

      <div className="flex items-center justify-center flex-1">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="w-full max-w-sm space-y-6">
            {/* Heading */}
            <h1 className="font-bold text-[64px] text-[#319E60] text-center">
              {t('login.getStarted')}
            </h1>

            {/* Buttons */}
            <div className="space-y-4">
              <Link href="/login">
                <Button className="w-full bg-purple-200 hover:bg-green-700 text-black font-medium text-[20px] cursor-pointer py-[28px] rounded-lg" size="lg">
                  {t('login.loginBtn')}
                </Button>
              </Link>

              <Link href="/main-singup">
                <Button
                  variant="secondary"
                  className="w-full mt-5 bg-purple-200 hover:bg-green-600 cursor-pointer py-[28px] text-gray-800 font-medium text-[20px] mb-5 rounded-lg"
                  size="lg"
                >
                  {t('login.signupBtn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
