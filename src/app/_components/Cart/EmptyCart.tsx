"use client";

import emptyCart from "@image/empty-cart.png"
import { useRouter } from 'next/navigation';
import Image from 'next/image'

export default function EmptyCart() {
    const router = useRouter();

    return (
        <div className='flex items-center justify-center'>
            <div className='bg-white dark:bg-gray-200 rounded-lg shadow-lg w-full max-w-md p-6 relative text-center'>
                <div>
                    <Image src={emptyCart} alt='empty cart حضرموت' />
                </div>
                <h4 className='text-sm md:text-xl font-bold text-red-500 py-4'>يبدو انك لم تطلب أي طلب بعد!</h4>
                <button onClick={() => router.push("/menu")}
                    className='main-btn'>عودة إلي صفحة قائمة الطعام
                </button>
            </div>
        </div>
    )
};