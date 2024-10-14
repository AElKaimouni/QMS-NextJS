"use client";
import { getTranslation } from "@/i18n";
import { FaHome } from "react-icons/fa"
import { FaPlus } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { ImStatsDots } from "react-icons/im";
import { ImStatsBars } from "react-icons/im";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";



const MobileNav = () => {
    const { t } = getTranslation();
    const pathname = usePathname();

    const menuItems = [
        {
            title: t("home"),
            Icon: FaHome,
            link: "/"
        },
        {
            title: t("analytics"),
            Icon: ImStatsBars,
            link: "/analytics"
        },
        {
            title: t("new_queue"),
            Icon: FaPlus,
            link: "/queues"
        },
        {
            title: t("metrics"),
            Icon: ImStatsDots,
            link: "/metrics"
        },
        {
            title: t("settings"),
            Icon: IoMdSettings,
            link: "/settings"
        },
    ];

    return (
        <div className="mobile-nav md:hidden lg:hidden fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-black dark:border-gray-800">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                {menuItems.map((item, index) => (
                    <>
                        {item.link === pathname && (
                            <div key={index} className="flex items-center justify-center">
                                <button
                                    data-tooltip-target="tooltip-new"
                                    type="button"
                                    className="inline-flex text-gray-100 items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    <item.Icon  className="w-5 h-5  dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                                    <span className="sr-only">{item.title}</span>
                                </button>
                            </div>
                        )}

                        {item.link !== pathname && (
                            <Link key={index} href={item.link}
                                data-tooltip-target="tooltip-home"
                                type="button"
                                className={`inline-flex flex-col items-center justify-center px-5 ${index === menuItems.length - 1 ? "rounded-e-full" : ""} ${index === 0 ? "rounded-s-full" : ""} hover:bg-gray-50 dark:hover:bg-gray-800 group`}
                            >
                                <item.Icon className="w-5 h-5  text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" />
                                <span className="sr-only">{item.title}</span>
                            </Link>
                        )}
                    </>
                    
                ))}
            </div>
        </div>
    )
}

export default MobileNav;