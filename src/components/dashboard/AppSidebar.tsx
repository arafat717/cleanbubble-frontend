/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IoBagHandleOutline, IoPricetagsOutline } from "react-icons/io5"
import { CiSettings } from "react-icons/ci"
import { MdHeadsetMic, MdOutlineLogout } from "react-icons/md"
import { PiCurrencyCircleDollar } from "react-icons/pi"
import { FaRegMessage } from "react-icons/fa6"
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2"
import { BadgeCheck } from "lucide-react"
import logo from "../../../public/images/logo.svg"
import logoName from "../../../public/images/logoName.svg"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAppDispatch } from "@/redux/hooks"
import { logout } from "@/redux/features/authSlice"
import { removeCookie } from "@/utils/cookies"
import { useGetMeQuery } from "@/redux/api/authApi"
import { useTranslation } from "react-i18next"
export function AppSidebar() {
    const { t } = useTranslation()
    const { data } = useGetMeQuery("")
    const dispatch = useAppDispatch()
    const path = usePathname()

    const handleLogOut = () => {
        dispatch(logout())
        removeCookie("accessToken")
        // router.push("/login")
        window.location.href = '/';
    }

    const role = data?.data?.role
    console.log(data?.data?.
        fullName)

    // Role-based menu items
    const users = [
        {
            title: t("sidebar.user.myOrder"),
            url: "/dashboard/user/my-order",
            icon: IoBagHandleOutline,
        },
        {
            title: t("sidebar.user.profileSettings"),
            url: "/dashboard/user/profile-setting",
            icon: CiSettings,
        },
        {
            title: t("sidebar.user.helpSupport"),
            url: "/dashboard/user/help-support",
            icon: MdHeadsetMic,
        },
        {
            title: t("sidebar.user.subscription"),
            url: "/dashboard/user/subscribtion",
            icon: PiCurrencyCircleDollar,
        },
    ]

    const contractor = [
        {
            title: t("sidebar.contractor.myJobs"),
            url: "/dashboard/contractor/my-jobs",
            icon: IoBagHandleOutline,
        },
        {
            title: t("sidebar.contractor.profileSettings"),
            url: "/dashboard/contractor/profile-settings",
            icon: CiSettings,
        },
        {
            title: t("sidebar.contractor.helpSupport"),
            url: "/dashboard/contractor/help-support",
            icon: MdHeadsetMic,
        },
        {
            title: t("sidebar.contractor.subscription"),
            url: "/dashboard/contractor/subscribtion",
            icon: PiCurrencyCircleDollar,
        },
    ]

    const admin = [
        {
            title: t("sidebar.admin.approvals"),
            url: "/dashboard/admin/approvals",
            icon: BadgeCheck,
        },
        {
            title: t("sidebar.admin.reviewsReports"),
            url: "/dashboard/admin/reviews",
            icon: FaRegMessage,
        },
        {
            title: t("sidebar.admin.payments"),
            url: "/dashboard/admin/payment",
            icon: HiOutlineDocumentCurrencyDollar,
        },
        {
            title: t("sidebar.admin.plansPricing"),
            url: "/dashboard/admin/pricing-plans",
            icon: IoPricetagsOutline,
        }
    ]

    let items: any[] = []
    if (role === "ADMIN") {
        items = admin
    } else if (role === "USER") {
        items = users
    } else if (role === "CONTRACTOR") {
        items = contractor
    }

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <div>
                        <div className="mt-5">
                            <Link href="/" className="flex flex-col items-center">
                                <Image
                                    src={logo}
                                    alt="CleanBubble"
                                    width={1000}
                                    height={1000}
                                    className="w-30 h-20"
                                />
                                <Image
                                    src={logoName}
                                    alt="CleanBubble"
                                    width={1000}
                                    height={1000}
                                    className="w-30 h-16"
                                />
                            </Link>
                        </div>
                        <div className="mb-4 text-center  rounded-lg p-1 mx-auto">
                            <h1 className="text-sm md:text-xl font-bold text-gray-900 mb-2">
                                Hi, {data?.data?.fullName}
                            </h1>
                            <p className="text-lg text-gray-700 mb-1"></p>
                            <span className="inline-block mt-2 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                                Role: {role}
                            </span>
                        </div>

                    </div>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item: any) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        className={`font-[500px] py-6 text-[#17171A] hover:text-white text-[18px] hover:bg-[#319E60] transition-colors duration-200 ${path === item.url
                                            ? "bg-[#319E60] text-white"
                                            : "text-black"
                                            }`}
                                    >
                                        <Link href={item.url}>
                                            <span className="w-[24px] h-[24px] inline-block mr-2">
                                                <item.icon />
                                            </span>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Logout button */}
                            <div
                                onClick={handleLogOut}
                                className="mt-[125px] font-[500px] px-4 rounded-xl cursor-pointer py-3 my-1 text-[#17171A] hover:text-[#319E60] text-[18px] transition-colors duration-200"
                            >
                                <MdOutlineLogout className="inline-block w-[24px] h-[24px] mr-[24px]" />
                                {t("sidebar.logout")}
                            </div>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
