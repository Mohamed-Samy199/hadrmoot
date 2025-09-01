import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../apollo/ApolloClient";
import { GET_MENUS } from "../graphql/menuGraph";
import { GET_MENU_BY_ID } from "../graphql/menuIdGraph";
import { GET_MENUS_PAGINATION } from "../graphql/menuPagination";
import toast from "react-hot-toast";
import axios from "axios";
import { headers, hostUrl } from "@/utils/hostUrl";

// ✅ جلب كل المنيوهات
export const useMenus = () => {
  return useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const { data } = await client.query({ query: GET_MENUS });
      return data.menuList.data;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ جلب المنيوهات بالصفحات
export const useMenusPaginated = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["menusPagination", page, limit],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_MENUS_PAGINATION,
        variables: { page, limit },
        // fetchPolicy: "no-cache", // لو مش عايز كاش
      });
      return data.menusByPagination;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ جلب منيو واحد بالـ ID
export const useMenuId = (id: string) => {
  return useQuery({
    queryKey: ["menuId", id],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_MENU_BY_ID,
        variables: { id },
      });
      return data.menuById.data;
    },
    enabled: !!id,
  });
};

// ✅ حذف منيو من كاتيجوري
export const useMenuDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ catId, menuId }: { catId: string; menuId: string }) => {
      const { data } = await axios.delete(
        `${hostUrl}/category/menu/${catId}/${menuId}`,
        { headers }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
      toast.success("تم الحذف بنجاح", {
        duration: 4000,
        style: { width: "100%", marginTop: "30px" },
      });
    },
    onError: (error) => {
      console.error(error);
      toast.error("حدث خطأ حاول مرة اخرى", {
        duration: 4000,
        style: { width: "100%", marginTop: "30px" },
      });
    },
  });
};