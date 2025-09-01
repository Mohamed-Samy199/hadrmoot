
"use client";

import { useUserDelete, useUsersPaginated } from "@/lib/queries/usersQuery";
import { useState } from "react";
import Pagination from "../Dashboard/Pagination";

type User = {
    _id: string;
    userName: string;
    email: string;
    role: string;
    createdAt?: string;
};

export default function GetUser() {
    const [page, setPage] = useState(1);
    const limit = 4;
    const { data, isLoading, error } = useUsersPaginated(page, limit);
    const { mutate: deleteUser } = useUserDelete();
    if (isLoading) {
        return <p className="text-center">جارٍ التحميل...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;
    }
    const totalPages = Math.ceil(data.totalCount / limit);
    return (
        <>
            <tbody>
                {data.data &&
                    (data.data as User[]).map((user, idx) => (
                        <tr
                            key={user._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            <td className="px-6 py-4">{idx + 1}</td>
                            <td
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hover:text-blue-500 hover:underline"
                            >
                                {user.userName}
                            </td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4">
                                {user.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString("ar-EG")
                                    : "—"}
                            </td>
                            <td className="px-6 py-4 cursor-pointer text-red-500 hover:underline"
                                onClick={() => {
                                    if (window.confirm("هل انت متأكد من الحذف؟")) {
                                        deleteUser(user._id)
                                    }
                                }}
                            >
                                حذف
                            </td>
                        </tr>
                    ))}
            </tbody>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
    );
};