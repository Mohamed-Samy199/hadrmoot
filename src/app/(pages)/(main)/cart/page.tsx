import Cart from '@/app/_components/Cart/Cart'
import ProtectedRoute from '@/utils/ProtectedRoute'
import React from 'react'

export default function CartPage() {
    return (
        <ProtectedRoute allowedRoles={["User"]}>
            <section className='cart'>
                <div className="relative bg-cover bg-center h-[48vh] w-full  bg-menu flex justify-center items-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 text-white p-6">
                        <h2 className="text-xl md:text-3xl font-bold text-center">قائمة الطلبات / cart</h2>
                        <p className="text-sm md:text-xl mt-2 text-center">افضل الوجبات و المشويات حضرموت و مشويات الخليج</p>
                    </div>
                </div>

                <div className='carts m-5 md:mx-20 md:my-10'>
                    <Cart />
                </div>
            </section>
        </ProtectedRoute>
    )
}
