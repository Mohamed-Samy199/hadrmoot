"use client";

import Image from 'next/image'
import { useCategories } from '@/lib/queries/categoryQuery';
import Link from 'next/link';
import PopupOrder from '../PopupOrder/PopupOrder';
import { useState } from 'react';
import { CategoryType, MenuItemType } from '@/lib/graphql/categoryGraph';

export default function Menu() {
    const { data, isLoading, error } = useCategories();
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;

    return (
        <>
            <div className="flex justify-center my-6">
                <input
                    type="text"
                    placeholder="ابحث عن اسم الوجبة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-red-400 rounded-lg px-4 py-2 w-[90%] max-w-md text-center shadow"
                />
            </div>
            {
                data &&
                data?.map((category: CategoryType) => {
                    const filteredMenu = category.menu.filter((item: MenuItemType) =>
                        item.name.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                    if (filteredMenu.length === 0) return null;
                    return (
                        <div key={category._id} className="mb-6 mx-2">
                            <div className="flex items-center justify-center gap-4 my-6">
                                <div className="flex-grow border-t-3 border-red-500"></div>
                                <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                                    <Link href={`/menu/${category._id}`}><span>{category.name}</span></Link>
                                </div>
                                <div className="flex-grow border-t-3 border-red-500"></div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
                                {filteredMenu.map((item: MenuItemType) => (
                                    <div key={item._id} className="relative">
                                        <div className="p-4 bg-gray-200 flex justify-between gap-3 rounded-xl shadow-2xl h-full">
                                            <div className='w-[40%]'>
                                                <div className="w-full aspect-[5/4] overflow-hidden rounded-lg border-2 border-red-400 relative">
                                                    <Image
                                                        src={item.image?.secure_url || '/fallback.png'}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-[38%] md:w-[45%]'>
                                                <h4 className="text-sm md:text-2xl font-bold mb-3">{item.name}</h4>
                                                <p className="text-sm font-semibold text-gray-600">{item.descraption}</p>
                                            </div>
                                            <div className='w-[22%] md:w-[15%]'>
                                                <div className='flex flex-col justify-between h-full'>
                                                    <div>
                                                        <h5 className="font-bold text-sm md:text-xl">{item.finalPrice} جنيه</h5>
                                                        {
                                                            item.price && item.discount > 0 &&
                                                            <>
                                                                <h6 className='text-sm text-red-400 py-1'>خصم {item.discount}%</h6>
                                                                <h5 className='font-bold text-sm md:text-xl text-gray-600 ' style={{ textDecorationLine: "line-through" }}>{item.price} جنيه</h5>
                                                            </>
                                                        }
                                                    </div>
                                                    <PopupOrder menuId={item._id} orderName={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};