import CartOnTable from '@/app/_components/Cart/CartOnTable'
import ProtectedRoute from '@/utils/ProtectedRoute'
import React from 'react'

export default function CartOfTableNumber() {
    return (
        <ProtectedRoute>
            <section className='cart'>
                <div className="relative bg-cover bg-center h-[48vh] w-full  bg-menu flex justify-center items-center">
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 text-white p-6">
                        <h2 className="text-sm md:text-3xl font-bold text-center">متطلبات من داخل المطعم / Cart Of Table</h2>
                        <p className="mt-2 text-center">افضل الوجبات و المشويات حضرموت و مشويات الخليج</p>
                    </div>
                </div>

                <div className='carts m-5 md:mx-20'>
                    <CartOnTable />
                </div>
            </section>
        </ProtectedRoute>
    )
}
