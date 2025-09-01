import GetOrders from "@/app/_adminComponents/Orders/GetOrders";

export default function OrderPage() {
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="text-center">
            <h3 className="heading-admin">طلبات تم الحساب عليها لتاربيزات داخل المطعم</h3>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        رقم الترابيزة
                    </th>
                    <th scope="col" className="px-6 py-3">
                        السعر
                    </th>
                    <th scope="col" className="px-6 py-3">
                        الطلبات
                    </th>
                    <th scope="col" className="px-6 py-3">
                        الكمية
                    </th>
                    <th scope="col" className="px-6 py-3">
                        التاريخ
                    </th>
                </tr>
            </thead>
            <GetOrders />
        </table>
    </div>
};