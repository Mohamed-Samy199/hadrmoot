"use client";

import { useTablesPaginated } from '@/lib/queries/tableQuery';
import Link from 'next/link';
import React, { useState } from 'react'
import Pagination from '../Dashboard/Pagination';

type Tables = {
    _id: string;
    tableNumber: string;
    qrcode?: string;
};

export default function GetTables() {
    const [page, setPage] = useState(1);
    const limit = 5;
    const { data, isLoading, error } = useTablesPaginated(page, limit);
    if (isLoading) {
        return <p className="text-center">جارٍ التحميل...</p>;
    }
    if (error) {
        return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;
    };
    const totalPages = Math.ceil(data.totalCount / limit);
    return (
        <>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr >
                    {
                        data?.data &&
                        (data?.data as Tables[]).map((table) => (
                            <th scope="col" className="px-6 py-4 min-w-[150px]" key={table._id}>
                                <Link href={`/cart/${table.tableNumber}`} className='main-btn'>{`ترابيزة ${table.tableNumber}`}</Link>
                            </th>
                        ))
                    }
                </tr>
            </thead>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
    )
};