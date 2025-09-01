"use client";

import { useCategoriesPaginated, useCategoryDelete } from "@/lib/queries/categoryQuery";
import Link from "next/link";
import { useState } from "react";
import Pagination from "../Dashboard/Pagination";

type Category = {
    _id: string;
    name: string;
    menu: number[];
    createdAt?: string;
};

export default function GetCategory() {
    const { mutate: deleteCategory } = useCategoryDelete();
    const [page, setPage] = useState(1);
    const limit = 4;
    const { data, isLoading, error } = useCategoriesPaginated(page, limit);
    if (isLoading) {
        return <p className="text-center">جارٍ التحميل...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;
    }
    const totalPages = data?.totalCount ? Math.ceil(data.totalCount / limit) : 1;

    return (
        <>
            <tbody>
                {data?.data &&
                    (data?.data as Category[]).map((category) => (
                        <tr
                            key={category._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline"
                            >
                                <Link href={`/menu/${category._id}`}>{category.name}</Link>
                            </td>
                            <td className="px-6 py-4">{category.menu?.length || 0}</td>
                            <td className="px-6 py-4">
                                {category.createdAt
                                    ? new Date(category.createdAt).toLocaleDateString("ar-EG")
                                    : "—"}
                            </td>
                            <td className="px-6 py-4 cursor-pointer text-blue-500 hover:underline" >
                                <Link href={`/dashboard/category-managment/${category._id}`}>تعديل</Link>
                            </td>
                            <td className="px-6 py-4 cursor-pointer text-red-500 hover:underline"
                                onClick={() => {
                                    if (window.confirm("هل انت متأكد من الحذف؟")) {
                                        deleteCategory(category._id)
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
    );
};