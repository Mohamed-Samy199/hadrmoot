"use client";

import { useOrdersPaginated } from "@/lib/queries/orderQuery";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Pagination from "../Dashboard/Pagination";

type User = {
    _id: string;
    userName: string;
};
type Image = {
    secure_url: string
};
type Menu = {
    _id: string;
    name: string;
    finalPrice: number;
    image: Image;
};
type Menus = {
    _id: string;
    quntity: number;
    menu: Menu | Menu[];
};
type Orders = {
    _id: string;
    userId?: User;
    tableNumber?: number;
    count: number;
    source: string;
    reason?: string;
    phoneCustom?: string;
    address?: string;
    details?: string;
    supTotale: number;
    finalPrice: number;
    paymentType: string;
    status: string;
    menus: Menus[];
    createdAt?: string;
};

export default function GetOrders() {
    const [page, setPage] = useState(1);
    const limit = 4;
    const { data, isLoading, error } = useOrdersPaginated(page, limit);
    const pathName = usePathname();
    const totalPages = Math.ceil(data?.totalCount / limit);

    let sourceFilter: string | null = null;
    if (pathName.includes("delivary")) {
        sourceFilter = "delivary";
    } else if (pathName.includes("table-in-restaurant")) {
        sourceFilter = "table-in-restaurant";
    };
    const filteredOrders =
        (data?.data as Orders[])?.filter((order) =>
            sourceFilter ? order.source === sourceFilter : true
        ) || [];

    if (isLoading) {
        return (
            <tbody>
                <tr>
                    <td colSpan={8} className="text-center py-4">
                        جارٍ التحميل...
                    </td>
                </tr>
            </tbody>
        );
    }

    if (error) {
        return (
            <tbody>
                <tr>
                    <td colSpan={8} className="text-center py-4 text-red-500">
                        حدث خطأ أثناء التحميل
                    </td>
                </tr>
            </tbody>
        );
    }


    return (
        <>
            <tbody>
                {
                    filteredOrders.map((order) => (
                        <tr
                            key={order._id}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                            {
                                order.source === "delivary" &&
                                <>
                                    <td className="px-6 py-4">{order.userId?.userName}</td>
                                    <td className="px-6 py-4">{order.phoneCustom}</td>
                                    <td className="px-6 py-4">{order.address}</td>
                                    <td className="px-6 py-4">{order.details}</td>
                                </>
                            }
                            {
                                order.source === "table-in-restaurant" &&
                                <>
                                    <td className="px-6 py-4 font-bold">{order.tableNumber}</td>
                                </>
                            }
                            <td className="px-6 py-4">{order.finalPrice}</td>

                            <td className="px-6 py-4">
                                {order.menus.map((menu) =>
                                    Array.isArray(menu.menu) ? (
                                        menu.menu.map((item: Menu, i: number) => (
                                            <div
                                                key={item._id}
                                                className={`py-3 ${i !== (menu.menu as Menu[]).length - 1 ? "border-b border-gray-300" : ""
                                                    }`}
                                            >
                                                {item.name}
                                            </div>
                                        ))
                                    ) : (
                                        <div key={menu._id}>{menu.menu?.name}</div>
                                    )
                                )}
                            </td>
                            <td className="px-6 py-4">
                                {order.menus.map((menu) => (
                                    <div className="py-3" key={menu._id}>{menu.quntity}</div>
                                ))}
                            </td>
                            <td className="py-4">
                                {order.createdAt
                                    ? new Date(order.createdAt).toLocaleDateString("ar-EG")
                                    : "—"}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
    )
};