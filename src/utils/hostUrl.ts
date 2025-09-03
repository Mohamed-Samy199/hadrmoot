import { safeLocalStorage } from "@/utils/safeLocalStorage";

// ✅ رابط الـ Backend
// export const hostUrl = "https://restaurant-backend-778b.vercel.app";

// ✅ الهيدرز اللي هيتبعت مع كل request
export const hostUrl = "https://restaurant-backend-iz1gb9ph0-restaurants-projects-a64d6409.vercel.app";
export const headers = {
  "Content-Type": "application/json; charset=utf-8",
  ...(typeof window !== "undefined" && {
    Authorization: `Bearer ${safeLocalStorage.get("hadramoot")}`,
  }),
};