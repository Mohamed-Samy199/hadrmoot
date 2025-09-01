import QRCode from "@/app/_adminComponents/Dashboard/QRCode";

export default function QrCodePage() {
    return (
        <section className="flex flex-col items-center justify-center py-10">
            <div className="text-center mb-6">
                <h3 className="heading-admin font-bold">
                    الحصول علي QR-Code
                </h3>
                <p className="text-gray-500 mt-2">امسح الكود لعرض المنيو مباشرة</p>
            </div>
            <QRCode />
        </section>
    )
};