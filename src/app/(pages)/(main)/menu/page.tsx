import Menu from '@/app/_components/Menu/Menu'
import React from 'react'

export default function MenuPage() {
    return (
        <section className='menu'>
            <div className="relative bg-cover bg-center h-[48vh] w-full  bg-menu flex justify-center items-center">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-white p-6">
                    <h2 className="text-xl md:text-3xl font-bold text-center">قائمة الطعام / menu</h2>
                    <p className="text-sm md:text-xl mt-2 text-center">افضل الوجبات و المشويات حضرموت و مشويات الخليج</p>
                </div>
            </div>

            <div className='menus mx-1 md:mx-20'>
                <Menu />
            </div>
        </section>
    )
};