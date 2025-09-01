"use client";

import { AuthContext } from '@/lib/context/auth';
import Link from 'next/link'
import { useContext } from "react";

export default function NavAuth() {
    const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("must be authariase");
    }
    const { userData, logout } = authContext;
    return (
        <>
            {
                userData ? (
                    <Link onClick={logout} href="/login" className="block dark:text-white py-2 px-3 hover:text-red-300">
                        تسجيل خروج
                    </Link>
                ) : (
                    <>
                        <Link href="/login" className="block dark:text-white py-2 px-3 hover:text-red-300">
                            تسجيل دخول
                        </Link>
                        <Link href="/register" className="block dark:text-white py-2 px-3 hover:text-red-300">
                            إنشاء حساب
                        </Link>
                    </>
                )
            }
        </>
    )
};