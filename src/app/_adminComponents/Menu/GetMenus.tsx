"use client";

import { useMenuDelete, useMenusPaginated } from "@/lib/queries/menuQuery";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../Dashboard/Pagination";

type Image = {
    secure_url: string
};

type Category = {
    _id: string;
    name: string;
};

type Menus = {
    _id: string;
    name: string;
    image: Image;
    createdAt?: string;
    descraption: string;
    price: number;
    stock: number;
    discount: number;
    finalPrice: number;
    categoryId: Category;
};


export default function GetMenus() {
    const [page, setPage] = useState(1);
    const limit = 4;

    const { data, isLoading, error } = useMenusPaginated(page, limit);
    const { mutate: deleteMenu } = useMenuDelete();

    if (isLoading) {
        return <p className="text-center">جارٍ التحميل...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;
    };

    const totalPages = data?.totalCount ? Math.ceil(data.totalCount / limit) : 1;

    return (
        <>
            <tbody>
                {data?.data &&
                    (data?.data as Menus[]).map((menu) => (
                        <tr
                            key={menu._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  hover:text-blue-500 hover:underline"
                            >
                                <Link href={`/menu/${menu.categoryId._id}`}>  {menu.name.length > 30 ? menu.name.substring(0, 30) + "..." : menu.name}</Link>
                            </td>

                            <td className="px-6 py-4">{menu.descraption}</td>
                            <td className="px-6 py-4">{menu.price}</td>
                            <td className="px-6 py-4">{menu.finalPrice}</td>
                            <td className="px-6 py-4">{menu.discount}</td>
                            <td className="px-6 py-4">{menu.stock}</td>
                            <td className="px-6 py-4"><Image src={menu.image.secure_url} alt=  {menu.name.length > 30 ? menu.name.substring(0, 30) + "..." : menu.name} height={100} width={100} /></td>

                            <td className="px-6 py-4">
                                {menu.createdAt
                                    ? new Date(menu.createdAt).toLocaleDateString("ar-EG")
                                    : "—"}
                            </td>

                            <td className="px-6 py-4 cursor-pointer text-blue-500 hover:underline" >
                                <Link href={`/dashboard/menu-managment/${menu._id}`}>تعديل</Link>
                            </td>

                            <td className="px-6 py-4 cursor-pointer text-red-500 hover:underline"
                                onClick={() => {
                                    if (window.confirm("هل انت متأكد من الحذف؟")) {
                                        deleteMenu({ catId: menu.categoryId._id, menuId: menu._id })
                                    }
                                }}
                            >
                                حذف
                            </td>
                        </tr>
                    ))}
            </tbody>

            {totalPages > 1 && (
                <Pagination page={page} setPage={setPage} totalPages={totalPages} />
            )}

        </>
    )
}
