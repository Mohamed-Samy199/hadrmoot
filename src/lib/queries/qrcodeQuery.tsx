import { hostUrl } from "@/utils/hostUrl";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type QRCodeResponse = {
  message: string;
  qrCode: string;
};

export const useQRCode = () => {
  return useQuery<QRCodeResponse>({
    queryKey: ["QRCODE"],
    queryFn: async () => {
      const url = `${hostUrl}/category/menu/qrcode`;
      const { data } = await axios.get<QRCodeResponse>(url);
      return data;
    },
    enabled: typeof window !== "undefined", // ✅ يتأكد إننا شغالين على المتصفح
  });
};
