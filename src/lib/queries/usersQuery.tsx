import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../apollo/ApolloClient";
import { GET_USERS } from "../graphql/usersGraph";
import { GET_USERS_PAGINATED } from "../graphql/userPaginationGraph";
import axios from "axios";
import { headers, hostUrl } from "@/utils/hostUrl";
import toast from "react-hot-toast";

// ✅ كل المستخدمين
export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const { data } = await client.query({ query: GET_USERS });
            return data.users.data; // كان مكتوب uesrs بالغلط
        },
        enabled: typeof window !== "undefined",
    });
};

// ✅ المستخدمين بالصفحات
export const useUsersPaginated = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["usersPagination", page, limit],
        queryFn: async () => {
            const { data } = await client.query({
                query: GET_USERS_PAGINATED,
                variables: { page, limit },
                // fetchPolicy: "no-cache",
            });

            return data.uesrsByPagintion;
        },
        enabled: typeof window !== "undefined",
    });
};

// ✅ حذف مستخدم
export const useUserDelete = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const { data } = await axios.delete(`${hostUrl}/auth/${id}`, { headers });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.success("تم الحذف بنجاح", {
                duration: 4000,
                style: {
                    width: "100%",
                    marginTop: "30px",
                },
            });
        },
        onError: (error) => {
            console.error(error);
            toast.error("حدث خطأ، حاول مرة أخرى", {
                duration: 4000,
                style: {
                    width: "100%",
                    marginTop: "30px",
                },
            });
        },
    });
};
