"use client";
import { useState, useMemo } from "react";
import { useOrders } from "@/lib/queries/orderQuery";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Legend,
} from "recharts";

export default function OrdersBarChart() {
    const { data: orders } = useOrders();
    const [chartType, setChartType] = useState<"count" | "sales">("count");

    const dailyData = useMemo(() => {
        if (!orders) return [];

        const now = new Date();
        // تجهيز آخر 15 يوم
        const days = Array.from({ length: 15 }).map((_, i) => {
            const date = new Date();
            date.setDate(now.getDate() - (14 - i));
            return {
                date: date.toLocaleDateString("ar-EG", { day: "2-digit", month: "2-digit" }),
                count: 0,
                sales: 0,
            };
        });

        // توزيع الطلبات على الأيام
        orders.forEach((order: any) => {
            if (!order.createdAt) return;
            const orderDate = new Date(order.createdAt).toLocaleDateString("ar-EG", {
                day: "2-digit",
                month: "2-digit",
            });

            const day = days.find((d) => d.date === orderDate);
            if (day) {
                day.count += 1;
                day.sales += order.finalPrice || 0;
            }
        });

        return days;
    }, [orders]);

    return (
        <div className="w-full  h-[45vh] bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col">
            <div className="flex justify-between items-center flex-wrap mb-2">
                <h2 className="text-sm md:text-xl font-bold text-white">📊 الطلبات اليومية آخر 15 يوم</h2>
                {/* أزرار التبديل */}
                <div className="flex gap-2 my-2">
                    <button
                        className={`md:px-3 text-sm p-1 rounded ${chartType === "count" ? "bg-red-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => setChartType("count")}
                    >
                        عدد الطلبات
                    </button>
                    <button
                        className={`md:px-3 text-sm p-1 rounded ${chartType === "sales" ? "bg-green-500 text-white" : "bg-gray-200"
                            }`}
                        onClick={() => setChartType("sales")}
                    >
                        المبيعات
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />

                    {chartType === "count" && (
                        <Bar dataKey="count" fill="#f52424" name="عدد الطلبات" />
                    )}

                    {chartType === "sales" && (
                        <Bar dataKey="sales" fill="#4ade80" name="المبيعات (جنيه)" />
                    )}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};