"use client";

import { useAllTables } from "@/lib/queries/tableQuery";
import { useCartDelivary } from "@/lib/queries/cartQuery";
import Link from "next/link";

type MenuItem = {
    _id: string;
    menuId: {
        name: string;
    };
    quntity: number;
};

type TableItems = {
    _id: string;
    tableNumber: number;
};

function TableStatusCard({ tableNumber }: { tableNumber: number }) {
    const { data, isLoading } = useCartDelivary({ tableNumber });
    if (isLoading) {
        return (
            <div className="p-4 rounded-lg shadow bg-gray-100 text-center">
                <p>ترابيزة {tableNumber} ... جاري التحميل</p>
            </div>
        );
    }
    const hasOrders = data?.data?.cart?.menus?.length > 0;
    return (
        <div
            className={`px-2 flex flex-col justify-between py-1 rounded-lg shadow ${hasOrders
                ? "bg-red-200 border border-red-500"
                : "bg-green-200 border border-green-500"
                }`}
        >
            <h3 className="text-lg font-bold mb-1">ترابيزة {tableNumber}</h3>
            {hasOrders ? (
                <ul className="text-sm space-y-1">
                    {data.data.cart.menus.map((item: MenuItem) => (
                        <li key={item._id} className="border-b border-gray-300 py-1">
                            {item.menuId.name} × {item.quntity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>فاضية ✅</p>
            )}
            <Link
                href={`/cart/${tableNumber}`}
                className="inline-block text-blue-500 hover:underline text-sm font-bold"
            >
                عرض التفاصيل
            </Link>
        </div>
    );
}

export default function TablesStatus() {
    const { data, isLoading, error } = useAllTables();
    if (isLoading) return <p>جارٍ تحميل الترابيزات...</p>;
    if (error) return <p className="text-red-500">فشل تحميل البيانات</p>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-1 h-[38vh]">
            {data?.map((table: TableItems) => (
                <TableStatusCard
                    key={table?._id}
                    tableNumber={Number(table.tableNumber)}
                />
            ))}
        </div>
    );
};