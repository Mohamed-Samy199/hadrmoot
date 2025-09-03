"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
    children: React.ReactNode;
};
export default function NavToggle({ children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const pathname = usePathname();

    // كل ما يتغير الـ route → اقفل المينيو
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <>
            {/* Toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-500 dark:text-gray-400 p-2.5 rounded-lg"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            {/* Menu (conditionally rendered) */}
            <div className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto`}>
                {children}
            </div>
        </>
    );
};