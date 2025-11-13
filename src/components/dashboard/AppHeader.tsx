/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { useGetMeQuery } from "@/redux/api/authApi";
import Loader from "../shared/Loader";
import Link from "next/link";
import { useGetUnreadNotiQuery, useReadNotificationMutation } from "@/redux/api/admin/repost.api";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import i18n from '@/i18n';
import { setLanguage } from "@/redux/features/languageSlice";
import { Button } from "../ui/button";

export default function Header() {
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)
    const [showProfile, setShowProfile] = useState(false);
    const { data, isLoading } = useGetMeQuery('')
    const { data: noti } = useGetUnreadNotiQuery('')
    const [markRead] = useReadNotificationMutation()
    const dispatch = useAppDispatch();

    // Get current language from Redux store
    const currentLanguage = useAppSelector((state: any) => state.language?.current || 'en')


    if (isLoading) {
        return <Loader></Loader>
    }

    const handleRead = async () => {
        const payload = {
            read: true
        }
        const res = await markRead(payload)
        console.log(res);
    }
    const handleLanguageChange = (language: 'en' | 'de') => {
        dispatch(setLanguage(language))
        i18n.changeLanguage(language); // update i18next
        setIsLanguageDropdownOpen(false)
    }


    const LanguageSwitcher = ({ isMobile = false }) => (
        <div className={`relative language-dropdown ${isMobile ? 'w-full' : ''}`}>
            <Button
                variant="ghost"
                size="sm"
                className={`text-foreground bg-white shadow-md rounded-3xl flex items-center ${isMobile ? 'w-full justify-start' : ''}`}
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
            >
                {currentLanguage === 'en' ? (
                    <button
                        className="flex items-center gap-2 px-3 py-2 w-full"
                    >
                        <Image
                            src="https://flagcdn.com/w20/gb.png"
                            alt="English"
                            width={20}
                            height={20}
                        />
                        English
                    </button>
                ) : (
                    <button
                        className="flex items-center gap-2 px-3 py-3  w-full"
                    >
                        <Image
                            src="https://flagcdn.com/w20/de.png"
                            alt="German"
                            width={20}
                            height={20}
                        />
                        Deutsch
                    </button>
                )}
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </Button>

            {isLanguageDropdownOpen && (
                <div className={`absolute ${isMobile ? 'left-0 right-0 top-full' : 'right-0 top-full'} mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]`}>
                    <button
                        onClick={() => handleLanguageChange('en')}
                        className={`w-full px-4 py-2 text-left flex gap-3 hover:bg-gray-50 items-center rounded-t-lg ${currentLanguage === 'en' ? 'bg-green-50 text-[#319E60]' : ''}`}
                    >
                        <Image
                            src="https://flagcdn.com/w20/gb.png"
                            alt="English"
                            width={20}
                            height={20}
                        />
                        English
                    </button>
                    <button
                        onClick={() => handleLanguageChange('de')}
                        className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex gap-3 items-center rounded-b-lg ${currentLanguage === 'de' ? 'bg-green-50 text-[#319E60]' : ''}`}
                    >
                        <Image
                            src="https://flagcdn.com/w20/de.png"
                            alt="German"
                            width={20}
                            height={20}
                        />
                        Deutsch
                    </button>
                </div>
            )}
        </div>
    )

    return (
        <header className="flex items-center min-w-full justify-between  rounded-lg px-20 py-5 shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 relative">
                {/* Language dropdown */}
                <LanguageSwitcher />

                {/* Notification */}
                <Link href={'/dashboard/notification'}><button onClick={handleRead} className="relative p-2 cursor-pointer rounded-full hover:bg-gray-200">
                    <FaBell className="text-gray-600  h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                        {noti?.data?.length || ''}
                    </span>
                </button></Link>

                {/* Profile dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="flex items-center"
                    >
                        <Image
                            src={data?.data?.profileImage || 'https://randomuser.me/api/portraits/men/32.jpg'}
                            alt="Profile"
                            width={42}
                            height={42}
                            className="rounded-full"
                        />
                    </button>
                </div>
            </div>
        </header>
    );
}
