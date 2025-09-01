"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../apollo/ApolloClient";
import { GET_TABLE } from "../graphql/tableGraph";
import { GET_TABLES_PAGINATION } from "../graphql/tablePaginationGraph";
import axios from "axios";
import { headers, hostUrl } from "@/utils/hostUrl";
import toast from "react-hot-toast";

// ✅ جلب كل الطاولات
export const useAllTables = () => {
  return useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      const { data } = await client.query({ query: GET_TABLE });
      return data.tableList.data;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ جلب الطاولات بالـ Pagination
export const useTablesPaginated = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["tablesPagination", page, limit],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_TABLES_PAGINATION,
        variables: { page, limit },
      });
      return data.tableListByPagination;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ حذف طاولة
export const useTableDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`${hostUrl}/table/${id}`, {
        headers,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tables"] });
      toast.success("تم الحذف بنجاح", {
        duration: 4000,
        style: { width: "100%", marginTop: "30px" },
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حدث خطأ حاول مرة أخرى", {
        duration: 4000,
        style: { width: "100%", marginTop: "30px" },
      });
    },
  });
};
