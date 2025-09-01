"use client";

import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react';
import { AuthContext } from '@/lib/context/auth';
import { safeLocalStorage } from '@/utils/safeLocalStorage';
import { useCartDelivary } from '@/lib/queries/cartQuery';

export default function NavCart() {
    const { data } = useCartDelivary({ token: safeLocalStorage.get("hadramoot") });
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within AuthContextProvider");
    };
    const { userData } = authContext;
    return (
        <li className="relative">
            {userData && userData?.role === "User" ? (
                <Link href="/cart" className="block dark:text-white py-2 px-3 hover:text-red-300">
                    {data?.data?.cart?.menus?.length > 0 && (
                        <h4 className="absolute bg-white text-red-500 -top-1 right-1 rounded-full font-bold text-xl w-5 h-5 flex justify-center items-center">
                            {data?.data?.cart?.menus?.length}
                        </h4>
                    )}
                    <ShoppingCart />
                </Link>
            ) : (
                userData && userData?.role === "Admin" &&
                <Link href="/dashboard" className="block dark:text-white py-2 px-3 hover:text-red-300">
                    لوحة التحكم
                </Link>
            )}
        </li>
    )
};