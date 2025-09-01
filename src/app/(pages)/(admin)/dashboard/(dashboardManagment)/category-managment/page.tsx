import GetCategory from "@/app/_adminComponents/Category/GetCategory";

export default function CategoryPage() {
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        إسم الفئة
                    </th>
                    <th scope="col" className="px-6 py-3">
                        عدد الوجبات
                    </th>
                    <th scope="col" className="px-6 py-3">
                        تم الإنشاء في
                    </th>
                    <th scope="col" className="px-6 py-3">
                        تعديل
                    </th>
                    <th scope="col" className="px-6 py-3">
                        حذف
                    </th>
                </tr>
            </thead>
            <GetCategory />
        </table>
    </div>
};