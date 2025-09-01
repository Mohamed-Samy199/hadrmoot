"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../apollo/ApolloClient";
import { GET_CATEGORIES } from "../graphql/categoryGraph";
import { GET_CATEGORY_BY_ID } from "../graphql/categoyIdGraph";
import { GET_CATEGORIES_PAGINATED } from "../graphql/categoryPagintionGraph";
import axios from "axios";
import { headers, hostUrl } from "@/utils/hostUrl";
import toast from "react-hot-toast";

// ✅ جلب كل الأقسام
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await client.query({ query: GET_CATEGORIES });
      return data.categories.data;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ جلب الأقسام مع Pagination
export const useCategoriesPaginated = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["categoriesPagination", page, limit],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_CATEGORIES_PAGINATED,
        variables: { page, limit },
      });
      return data.categoriesByPagination;
    },
    enabled: typeof window !== "undefined", // ✅ كده مش هيجرب وقت build
  });
};


// ✅ جلب قسم واحد عن طريق ID
export const useCategoryId = (id: string) => {
  return useQuery({
    queryKey: ["categoryId", id],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_CATEGORY_BY_ID,
        variables: { id },
      });
      return data.getCategoryById.data;
    },
    enabled: !!id, // بس لما يكون فيه id
  });
};

// ✅ حذف قسم
export const useCategoryDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axios.delete(`${hostUrl}/category/${id}`, {
        headers,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
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
