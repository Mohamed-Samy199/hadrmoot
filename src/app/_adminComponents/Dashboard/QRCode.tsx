"use client";

import { useQRCode } from "@/lib/queries/qrcodeQuery";
import Image from "next/image";

export default function QRCode() {
    const { data, isLoading, isError } = useQRCode();

    if (isLoading) {
        return (
            <section className="flex justify-center items-center h-64">
                <p className="text-gray-600">جاري تحميل QR Code...</p>
            </section>
        );
    }
    if (isError) {
        return (
            <section className="flex justify-center items-center h-64">
                <p className="text-red-600">فشل في تحميل الـ QR Code</p>
            </section>
        );
    }
    if (!data?.qrCode) return null;

    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
            <Image
                src={data.qrCode}
                alt="QR Code"
                width={250}
                height={250}
                className="rounded-lg border border-gray-200"
            />
            <a
                href={data.qrCode}
                download="(حضرموت-منيو).png"
                className="mt-6 main-btn"
            >
                تحميل الكود
            </a>
        </div>
    );
};