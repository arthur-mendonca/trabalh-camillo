"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChartPieIcon,
    ArrowRightIcon,
    BookOpenIcon,
    UserIcon,
    DocumentChartBarIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline";
import { useUserContext } from "@/app/context/UserContext";
// import { useAuth } from "@/hooks/useAuth";
import { HandCoins } from "lucide-react";
const navItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: ChartPieIcon,
    },
    {
        name: "Livros",
        href: "/books",
        icon: BookOpenIcon,
    },
    {
        name: "Emprestimos",
        href: "/loans",
        icon: HandCoins,
    },
    {
        name: "Relatórios",
        icon: DocumentChartBarIcon,
        subItems: [
            {
                name: "Livros por aluno",
                href: "/reports/by-student",
            },
            {
                name: "Livros em atraso",
                href: "/reports/overdue",
            }
        ]
    },
    {
        name: "Meu perfil",
        href: "/profile",
        icon: UserIcon,
    },

];

export function Sidebar() {
    const pathname = usePathname();
    const { handleLogout } = useUserContext()
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

    const toggleSubMenu = (itemName: string) => {
        setOpenSubMenu(openSubMenu === itemName ? null : itemName);
    };

    return (
        <>
            {/* Botão Hamburger (Mobile) */}
            <button
                type="button"
                aria-controls="default-sidebar"
                data-drawer-toggle="default-sidebar"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="ms-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none sm:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Abrir sidebar</span>
                <svg
                    className="h-6 w-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            {/* A Sidebar */}
            <aside
                id="default-sidebar"
                className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
                    } sm:translate-x-0`} // Lógica do React para mobile
                aria-label="Sidebar"
            >
                <div className="flex h-full flex-col overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-zinc-800">
                    {/* Logo/Título (Opcional) */}
                    <div className="mb-5 px-2">
                        <Link href="/dashboard" className="text-xl font-semibold text-gray-900 dark:text-white">
                            Biblioteca do Camillo
                        </Link>
                    </div>

                    {/* Links de Navegação */}
                    <ul className="flex-1 space-y-2 font-medium">
                        {navItems.map((item) => {
                            const isActive = pathname && item.href && pathname.startsWith(item.href);
                            const Icon = item.icon;
                            const hasSubItems = item.subItems && item.subItems.length > 0;
                            const isSubMenuOpen = openSubMenu === item.name;
                            const isAnySubItemActive = hasSubItems && item.subItems?.some(subItem => 
                                pathname && pathname.startsWith(subItem.href)
                            );

                            return (
                                <li key={item.name}>
                                    {hasSubItems ? (
                                        <>
                                            <button
                                                onClick={() => toggleSubMenu(item.name)}
                                                className={`group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                                                    isAnySubItemActive ? "bg-gray-100 dark:bg-gray-700" : ""
                                                }`}
                                            >
                                                <Icon
                                                    className={`h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${
                                                        isAnySubItemActive ? "text-gray-900 dark:text-white" : ""
                                                    }`}
                                                />
                                                <span className="ms-3 flex-1 text-left whitespace-nowrap">{item.name}</span>
                                                <ChevronDownIcon 
                                                    className={`h-4 w-4 transition-transform ${
                                                        isSubMenuOpen ? "rotate-180" : ""
                                                    }`}
                                                />
                                            </button>
                                            {isSubMenuOpen && (
                                                <ul className="mt-2 space-y-2 pl-8">
                                                    {item.subItems?.map((subItem) => {
                                                        const isSubActive = pathname && pathname.startsWith(subItem.href);
                                                        return (
                                                            <li key={subItem.name}>
                                                                <Link
                                                                    href={subItem.href}
                                                                    onClick={() => setIsMobileOpen(false)}
                                                                    className={`flex items-center rounded-lg p-2 text-sm text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                                                                        isSubActive ? "bg-gray-100 dark:bg-gray-700" : ""
                                                                    }`}
                                                                >
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link
                                            href={item.href || "#"}
                                            onClick={() => setIsMobileOpen(false)}
                                            className={`group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                                                isActive ? "bg-gray-100 dark:bg-gray-700" : ""
                                            }`}
                                        >
                                            <Icon
                                                className={`h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white ${
                                                    isActive ? "text-gray-900 dark:text-white" : ""
                                                }`}
                                            />
                                            <span className="ms-3">{item.name}</span>
                                        </Link>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Botão de Logout (na parte inferior) */}
                    <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
                        <li>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer group flex w-full items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            >
                                <ArrowRightIcon className="h-5 w-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="ms-3 flex-1 whitespace-nowrap">Sair</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}
