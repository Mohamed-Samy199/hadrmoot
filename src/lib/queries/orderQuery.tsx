import { useQuery } from "@tanstack/react-query";
import client from "../apollo/ApolloClient";
import { GET_ORDERS } from "../graphql/ordersGraph";
import { GET_ORDERS_BY_PAGINATION } from "../graphql/ordersPaginationGraph";

// ✅ كل الأوردرات
export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await client.query({ query: GET_ORDERS });
      return data.orderList.data;
    },
    enabled: typeof window !== "undefined",
  });
};

// ✅ الأوردرات بالصفحات
export const useOrdersPaginated = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["ordersPagination", page, limit],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_ORDERS_BY_PAGINATION,
        variables: { page, limit },
      });
      return data.ordersListByPagination;
    },
    enabled: typeof window !== "undefined",
  });
};
