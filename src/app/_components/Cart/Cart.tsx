"use client";

import { useCartDelivary, useDeleteAll, useDeleteOneOfMenu, useUpdateCart } from '@/lib/queries/cartQuery'
import { CartItem } from '@/lib/graphql/cartDelivaryGraph';
import EmptyCart from './EmptyCart';
import Image from 'next/image';
import Link from 'next/link';
import { safeLocalStorage } from "@/utils/safeLocalStorage";


export default function Cart() {
    const token = safeLocalStorage.get("hadramoot");
    if (!token) {
        return <EmptyCart />;
    }
    const { data, isLoading, error } = useCartDelivary({ token });
    const { mutate: updateCart } = useUpdateCart();
    const { mutate: deleteOneItemFromCart } = useDeleteOneOfMenu();
    const { mutate: deleteAllCart } = useDeleteAll();

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;
    return (
        <>
            {
                data?.data?.cart?.menus?.length > 0 ?
                    <>
                        {data?.data?.cart?.menus?.map((cart: CartItem) => (
                            <div key={cart._id} className="grid grid-cols-1 gap-3 my-3">
                                <div className="relative">
                                    <div className="p-4 bg-gray-200 flex justify-between gap-3 rounded-xl shadow-2xl h-full">
                                        <div className="aspect-[5/4] overflow-hidden rounded-lg border-2 border-red-400 relative">
                                            <Image
                                                src={cart.menuId.image.secure_url || '/fallback.png'}
                                                alt={cart.menuId.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className='md:w-[35%]'>
                                            <h4 className="text-sm md:text-2xl font-bold mb-3">{cart.menuId.name}</h4>
                                            <p className="text-sm font-semibold text-gray-600 pb-10">{cart.menuId.categoryId.name}</p>
                                        </div>
                                        <div className='w-[25%] md:w-[15%]'>
                                            <div className='flex flex-col justify-between items-center h-full'>
                                                <h5 className="font-bold text-sm md:text-xl">{cart.menuId.finalPrice} جنيه</h5>
                                                <h4 className='md:font-bold cursor-pointer text-sm md:text-xl text-red-600'
                                                    onClick={() => {
                                                        if (window.confirm("هل انت متأكد من الحذف؟")) {
                                                            deleteOneItemFromCart({ menuId: cart.menuId._id, token: safeLocalStorage.get("hadramoot") })
                                                        }
                                                    }}
                                                >حذف</h4>
                                            </div>
                                        </div>

                                        <div >
                                            <div className='flex flex-col justify-between items-center  h-full'>
                                                <div>
                                                    <button
                                                        className="cart-btn"
                                                        onClick={() => {
                                                            updateCart(
                                                                { menuId: cart.menuId._id, action: "increase", token: safeLocalStorage.get("hadramoot") },
                                                            );
                                                        }}
                                                    >+</button>
                                                </div>
                                                <h4 className='font-bold text-sm md:text-xl text-red-600'>{cart.quntity}</h4>
                                                <div>
                                                    <button
                                                        className="cart-btn"
                                                        onClick={() => {
                                                            updateCart(
                                                                { menuId: cart.menuId._id, action: "decrease", token: safeLocalStorage.get("hadramoot") },
                                                            );
                                                        }}
                                                    >-</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className='flex items-center justify-between sm:mt-4 mt-10'>
                            <button
                                className='main-btn'
                                onClick={() => {
                                    if (window.confirm("هل انت متأكد من الحذف؟")) {
                                        deleteAllCart({ token: safeLocalStorage.get("hadramoot") })
                                    }
                                }}
                            >حذف كل الطلبات
                            </button>

                            <h4 className='font-bold text-sm px-1 md:text-xl text-center'>
                                الحساب الكلي:{" "}
                                <span className="text-red-500">
                                    {data?.data?.cart?.menus && data?.data?.cart?.menus?.length > 0
                                        ? (
                                            data?.data?.cart?.menus?.reduce((sum: number, menu: CartItem) => {
                                                return sum + menu.menuId.finalPrice * menu.quntity;
                                            }, 0)
                                        ).toFixed(2)
                                        : "0"
                                    }{" "}
                                    جنيه
                                </span>
                            </h4>
                            <Link href="/payment-delivery">
                                <button className='main-btn'>الطلب ديليفري</button>
                            </Link>
                        </div>
                    </>
                    :
                    <EmptyCart />
            }
        </>
    )
}