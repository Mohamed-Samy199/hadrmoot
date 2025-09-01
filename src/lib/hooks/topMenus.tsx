import { useMemo } from "react";
import { subDays, isAfter } from "date-fns";
import { useOrders } from "../queries/orderQuery";

export const useTopMeals = () => {
    const { data: orders } = useOrders();

    return useMemo(() => {
        if (!orders) return [];

        // التاريخ من آخر 30 يوم
        const lastMonth = subDays(new Date(), 30);

        // فلترة الطلبات للي خلال آخر 30 يوم
        const recentOrders = orders.filter((order: any) =>
            isAfter(new Date(order.createdAt), lastMonth)
        );

        // عدّ الوجبات
        const mealCount: Record<string, number> = {};

        recentOrders.forEach((order: any) => {
            order.menus.forEach((menu: any) => {
                if (Array.isArray(menu.menu)) {
                    menu.menu.forEach((item: any) => {
                        mealCount[item.name] = (mealCount[item.name] || 0) + 1;
                    });
                } else if (menu.menu?.name) {
                    mealCount[menu.menu.name] = (mealCount[menu.menu.name] || 0) + 1;
                }
            });
        });
        // تحويل لهيكل مناسب للـ BarChart
        return Object.entries(mealCount).map(([name, count]) => ({
            name,
            count,
        }));
    }, [orders]);
};
