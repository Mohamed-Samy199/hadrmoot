"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useOrders } from "@/lib/queries/orderQuery";

const COLORS = ["#0088FE", "#FF8042"]; 

export default function OrdersPieChart() {
    const { data, isLoading, error } = useOrders();

    if (isLoading) return <p>جارٍ تحميل البيانات...</p>;
    if (error) return <p className="text-red-500">حدث خطأ أثناء تحميل البيانات</p>;

    const orders = data || [];

    // احسب عدد الطلبات لكل نوع
    const restaurantOrders = orders.filter((o: any) => o.source === "table-in-restaurant").length;
    const deliveryOrders = orders.filter((o: any) => o.source === "delivary").length;

    const chartData = [
        { name: "طلبات المطعم", value: restaurantOrders },
        { name: "طلبات الدليفري", value: deliveryOrders },
    ];

    return (
        <div className="flex justify-center items-center p-2 dark:bg-gray-200 w-full h-full">
            <ResponsiveContainer
                width="100%"
                height="100%"
                className="sm:w-[400px] sm:h-[250px] w-[250px] h-[180px]" // 👈 صغير على الموبايل
            >
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        // label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        label={({ name, percent }) =>`${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                        outerRadius="70%" // 👈 صغير أكتر على الموبايل
                        dataKey="value"
                    >
                        {chartData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};