"use client";

import { useCartDelivary, useDeleteAll, useDeleteOneOfMenu, useUpdateCart } from '@/lib/queries/cartQuery'
import { CartItem } from '@/lib/graphql/cartDelivaryGraph';
import EmptyCart from './EmptyCart';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import PayOnTable from '../Payment/PayOnTable';

export default function CartOnTable() {
    const tblNumber = useParams();
    const tableNumber = Number(tblNumber.cartOfTableNumber)


    const { data, isLoading, error } = useCartDelivary({ tableNumber });
    const { mutate: updateCart } = useUpdateCart();
    const { mutate: deleteOneItemFromCart } = useDeleteOneOfMenu();
    const { mutate: deleteAllCart } = useDeleteAll();

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;

    return (
        <>
            <h4 className='text-sm md:text-2xl font-semibold text-center text-red-500 mb-2'>طلبات تاربيزة رقم {tableNumber} عدد ({data?.data?.cart?.menus?.length}) وجبة</h4>
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
                                                    onClick={() => deleteOneItemFromCart({ menuId: cart.menuId._id, tableNumber })}>حذف</h4>
                                            </div>
                                        </div>

                                        <div >
                                            <div className='flex flex-col justify-between items-center  h-full'>
                                                <div>
                                                    <button
                                                        className="cart-btn"
                                                        onClick={() => {
                                                            updateCart(
                                                                { menuId: cart.menuId._id, action: "increase", tableNumber },
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
                                                                { menuId: cart.menuId._id, action: "decrease", tableNumber },
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
                                onClick={() => deleteAllCart({ tableNumber })}>حذف كل الطلبات
                            </button>
                            <PayOnTable />
                        </div>
                    </>
                    :
                    <EmptyCart />
            }
        </>
    )
};