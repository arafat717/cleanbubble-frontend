import { Facebook, Instagram, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../../../public/images/logo.svg";
import logoName from "../../../public/images/logoName.svg";
import { T } from "@/utils/translations";

export default function Footer() {
  return (
    <footer className="bg-gray-100 px-6 py-12">
      <div className="container mx-auto ">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src={Logo}
              alt="CleanBubble"
              width={500}
              height={500}
              className="w-16 h-16"
            />
            <Image
              src={logoName}
              alt="CleanBubble"
              width={500}
              height={500}
              className="w-52 h-22"
            />
          </Link>
        </div>
        <hr className="border-border my-6" />

        {/* Footer Links */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 mb-12 font-roboto">
          {/* About the Platform */}
          <div>
            <h3 className="font-semibold text-[#363636] mb-4 text-2xl ">
              <T>About the Platform</T>
            </h3>
            <ul className="space-y-3 text-xl font-normal text-[#363636]">
              <li>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  <T>Home</T>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                  <T>Pricing & Subscription</T>
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-600 hover:text-gray-900">
                  <T>Testimonials</T>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-2xl text-[#363636]"><T>Services</T></h3>
            <ul className="space-y-3 text-xl font-normal text-[#363636]">
              <li>
                <Link href="/jobs" className="text-gray-600 hover:text-gray-900">
                  <T>Browse All Jobs</T>
                </Link>
              </li>
              <li>
                <Link href="/post-job" className="text-gray-600 hover:text-gray-900">
                  <T>Post a Job</T>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Data */}
          <div>
            <h3 className="font-semibold  text-[#363636] mb-4 text-2xl ">
              <T>Legal & Data</T>
            </h3>
            <ul className="space-y-3 text-xl font-normal text-[#363636]">
              <li>
                <Link href="/privacy-policy" className="text-gray-600 hover:text-gray-900">
                  <T>Privacy Policy</T>
                </Link>
              </li>
              <li>
                <Link href="/terms-of-services" className="text-gray-600 hover:text-gray-900">
                  <T>Terms of Service</T>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold  text-[#363636] mb-4 text-2xl ">
              <T>Support</T>
            </h3>
            <ul className="space-y-3 text-xl font-normal text-[#363636]">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  <T>FAQs</T>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  <T>Contact Us</T>
                </Link>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div>
            <h3 className="font-semibold  text-[#363636] mb-4 text-2xl ">
              <T>Address</T>
            </h3>
            <div className="text-xl font-normal text-[#363636] space-y-2">
              <p><T>6391 Elgin St. Celina,</T></p>
              <p><T>Delaware 10299</T></p>
              <div className="mt-4 space-y-1 ">
                <p className="text-xl font-normal text-[#363636]">
                  <T>(907) 555-0101</T>
                </p>
                <p className="text-xl font-normal text-[#363636]">
                  <T> (308) 555-0121</T>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex items-center gap-4 mb-8">
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Instagram className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Facebook className="h-6 w-6" />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900">
            <Mail className="h-6 w-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-gray-600 text-sm">
            <T>Copyright © 2010-2025 All rights reserved.</T>
          </p>
        </div>
      </div>
    </footer>
  );
}
