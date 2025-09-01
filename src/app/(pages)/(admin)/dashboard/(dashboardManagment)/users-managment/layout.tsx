import NavToggle from '@/app/_components/Navber/NavToggel'
import ProtectedRoute from '@/utils/ProtectedRoute'
import Link from 'next/link'
import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRoute allowedRoles={["Admin"]}>
            <section className='md:mx-auto md:w-[80%]'>
                <nav className="bg-white border-gray-200 dark:bg-red-600 my-2 rounded-lg">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
                        <NavToggle>
                            <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
                                <li><Link href="/dashboard/users-managment" className="block dark:text-white py-2 px-3 hover:text-red-300">كل المستخدمين</Link></li>
                                <li><Link href="/dashboard/users-managment/admin" className="block dark:text-white py-2 px-3 hover:text-red-300">إضافة ادمن</Link></li>
                                <li><Link href="/dashboard/users-managment/employee" className="block dark:text-white py-2 px-3 hover:text-red-300">إضافة موظف</Link></li>
                            </ul>
                        </NavToggle>
                    </div>
                </nav>
                {/*Outlet*/}
                <div className="m-3">
                    {children}
                </div>
            </section>
        </ProtectedRoute>
    )
};