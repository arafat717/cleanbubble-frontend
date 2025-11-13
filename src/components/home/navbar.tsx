/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import i18n from '@/i18n';
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react"
import logo from "../../../public/images/logo.svg";
import logoName from "../../../public/images/logoName.svg";
import { useGetMeQuery } from "@/redux/api/authApi"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { removeCookie } from "@/utils/cookies"
import { logout } from "@/redux/features/authSlice"
import { setLanguage } from "@/redux/features/languageSlice"
import { T } from "@/utils/translations"

export default function Navbar() {
  const { data } = useGetMeQuery('')
  const role = data?.data?.role;
  const status = data?.data?.status;
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  const path = usePathname();
  const dispatch = useAppDispatch();

  // Get current language from Redux store
  const currentLanguage = useAppSelector((state: any) => state.language?.current || 'en')

  let userRole: string | undefined;
  if (role === "ADMIN") {
    userRole = "admin/approvals";
  } else if (role === "USER") {
    userRole = "user/my-order";
  } else if (role === "CONTRACTOR") {
    userRole = "contractor/my-jobs";
  }

  // Navigation links - these will be auto-translated
  const navLinks = [
    { href: "/", label: "Home" },
    ...(role !== "USER" ? [{ href: "/jobs", label: "Browse jobs" }] : []),
    ...(role !== "CONTRACTOR" ? [{ href: "/post-job", label: "Post a Job" }] : []),
    { href: "/pricing", label: "Pricing" },
    ...(userRole && status !== "PENDING"
      ? [{ label: "Dashboard", href: `/dashboard/${userRole}` }]
      : []),
  ];


  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [path])

  const handleLogOut = () => {
    dispatch(logout());
    removeCookie("accessToken");
    window.location.href = '/';
  };


  const handleLanguageChange = (language: 'en' | 'de') => {
    dispatch(setLanguage(language))
    i18n.changeLanguage(language);
    setIsLanguageDropdownOpen(false)
  }

  const LanguageSwitcher = ({ isMobile = false }) => (
    <div className={`relative language-dropdown ${isMobile ? 'w-full' : ''}`}>
      <Button
        variant="ghost"
        size="sm"
        className={`text-foreground bg-white shadow-md rounded-3xl flex items-center hover:bg-gray-50 ${isMobile ? 'w-full justify-between px-4' : 'px-3'}`}
        onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
      >
        <span className="flex items-center gap-2">
          {currentLanguage === 'en' ? (
            <>
              <Image
                src="https://flagcdn.com/w20/gb.png"
                alt="English"
                width={20}
                height={20}
              />
              <span className="font-medium">English</span>
            </>
          ) : (
            <>
              <Image
                src="https://flagcdn.com/w20/de.png"
                alt="German"
                width={20}
                height={20}
              />
              <span className="font-medium">Deutsch</span>
            </>
          )}
        </span>
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
        <div className={`absolute ${isMobile ? 'left-0 right-0 top-full' : 'right-0 top-full'} mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px]`}>
          <button
            onClick={() => handleLanguageChange('en')}
            className={`w-full px-4 py-3 text-left flex gap-3 hover:bg-gray-50 items-center rounded-t-lg transition-colors ${currentLanguage === 'en' ? 'bg-green-50 text-[#319E60] font-semibold' : ''}`}
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
            className={`w-full px-4 py-3 text-left hover:bg-gray-50 flex gap-3 items-center rounded-b-lg transition-colors ${currentLanguage === 'de' ? 'bg-green-50 text-[#319E60] font-semibold' : ''}`}
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
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
    >
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo - Responsive sizing */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="flex items-center space-x-1 sm:space-x-2">
              <Image
                src={logo}
                alt="CleanBubble"
                width={1000}
                height={1000}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16"
              />
              <Image
                src={logoName}
                alt="CleanBubble"
                width={1000}
                height={1000}
                className="w-32 h-32 sm:w-40 sm:h-40 lg:w-52 lg:h-52"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm xl:text-base font-medium transition-colors hover:text-[#319E60] ${path === link.href ? 'text-[#319E60]' : 'text-gray-700'
                  }`}
              >
                <T>{link.label}</T>
              </Link>
            ))}
          </div>

          {/* Right side items - Desktop only */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <LanguageSwitcher />
            {userRole ? (
              <Button
                onClick={handleLogOut}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold rounded-2xl px-4 xl:px-6 transition-colors"
              >
                <T>Log Out</T>
              </Button>
            ) : (
              <Link href="/main-page">
                <Button className="bg-[#319E60] hover:bg-[#0c6331] cursor-pointer text-white font-semibold rounded-2xl px-4 xl:px-6 transition-colors">
                  <T>Get Started</T>
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button - Shown on mobile/tablet */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Slide down menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-4 pb-3 space-y-1">
              {/* Mobile nav links */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${path === link.href
                    ? 'bg-green-50 text-[#319E60]'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <T>{link.label}</T>
                </Link>
              ))}

              {/* Mobile language switcher and buttons */}
              <div className="flex flex-col space-y-3 px-4 pt-4 border-t border-gray-200 mt-2">
                <LanguageSwitcher isMobile={true} />

                {userRole ? (
                  <Button
                    onClick={() => {
                      handleLogOut();
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-semibold rounded-2xl w-full py-3"
                  >
                    <T>Log Out</T>
                  </Button>
                ) : (
                  <Link href="/main-page" className="w-full">
                    <Button
                      className="bg-[#319E60] hover:bg-[#0c6331] cursor-pointer text-white font-semibold rounded-2xl w-full py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <T>Get Started</T>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}