import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { hostUrl } from "@/utils/hostUrl";
import toast from "react-hot-toast";

type CartOptions = {
    token?: string | null;
    tableNumber?: number;
};

type AddToCartParams = {
    menuId?: string;
    quntity: number;
    tableNumber?: number | null;
    token?: string | null;
};

type UpdateCartInput = {
    menuId: string;
    action: "increase" | "decrease";
    token?: string | null;
    tableNumber?: number;
};

type DeleteOneItem = {
    menuId: string;
    token?: string | null;
    tableNumber?: number;
};

// 🛒 استرجاع بيانات الكارت
export const useCartDelivary = ({ token, tableNumber }: CartOptions) => {
    return useQuery({
        queryKey: ["CartDelivary", token || tableNumber],
        queryFn: async () => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const url = token ? `${hostUrl}/cart` : `${hostUrl}/cart/${tableNumber}`;
            const { data } = await axios.get(url, { headers });
            return data;
        },
        enabled: !!token || !!tableNumber, // ✅ اتأكد انه مش بيرن لو مفيش بيانات
    });
};

// 🛒 إضافة أو تحديث عنصر في الكارت
export const useCreateOrUpdateCart = (token?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ menuId, quntity, token, tableNumber }: AddToCartParams) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const url = token ? `${hostUrl}/cart` : `${hostUrl}/cart/${tableNumber}`;

            const { data } = await axios.post(url, { menuId, quntity }, { headers });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CartDelivary", `Bearer ${token}`] });

            toast.success("تم حجز الطلب بنجاح", {
                duration: 4000,
                style: { width: "100%", marginTop: "30px" },
            });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "حدث خطأ أثناء الإضافة", {
                duration: 4000,
                style: { width: "100%", marginTop: "30px" },
            });
        },
    });
};

// 🛒 تحديث عنصر (زيادة/نقصان)
export const useUpdateCart = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ menuId, action, token, tableNumber }: UpdateCartInput) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const url = token ? `${hostUrl}/cart` : `${hostUrl}/cart/${tableNumber}`;

            const { data } = await axios.patch(url, { menuId, action }, { headers });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CartDelivary"] });
        },
        onError: () => {
            toast.error("أقل حاجة عنصر واحد", {
                duration: 4000,
                style: { width: "100%", marginTop: "30px" },
            });
        },
    });
};

// 🛒 حذف عنصر واحد
export const useDeleteOneOfMenu = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ menuId, token, tableNumber }: DeleteOneItem) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const url = token
                ? `${hostUrl}/cart/remove/${menuId}`
                : `${hostUrl}/cart/remove/${menuId}/${tableNumber}`;

            const { data } = await axios.patch(url, {}, { headers });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CartDelivary"] });
        },
        onError: () => {
            toast.error("أقل حاجة عنصر واحد", {
                duration: 4000,
                style: { width: "100%", marginTop: "30px" },
            });
        },
    });
};

// 🛒 مسح الكارت بالكامل
export const useDeleteAll = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ token, tableNumber }: CartOptions) => {
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const url = token
                ? `${hostUrl}/cart/clear`
                : `${hostUrl}/cart/clear/table/${tableNumber}`;

            const { data } = await axios.patch(url, {}, { headers });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["CartDelivary"] });
        },
        onError: () => {
            toast.error("حدث خطاء حاول مرة اخري", {
                duration: 4000,
                style: { width: "100%", marginTop: "30px" },
            });
        },
    });
};