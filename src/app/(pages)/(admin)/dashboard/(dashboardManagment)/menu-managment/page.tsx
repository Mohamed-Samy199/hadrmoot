import GetMenus from "@/app/_adminComponents/Menu/GetMenus";

export default function MenuPage() {
    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-5 py-3">
                            إسم الوجبة
                        </th>
                        <th scope="col" className="px-5 py-3">
                            وصف
                        </th>
                        <th scope="col" className="px-5 py-3">
                            السعر قبل الخصم
                        </th>
                        <th scope="col" className="px-5 py-3">
                            السعر يعد الخصم
                        </th>
                        <th scope="col" className="px-5 py-3">
                            الخصم
                        </th>
                        <th scope="col" className="px-5 py-3">
                            المخزون
                        </th>
                        <th scope="col" className="px-5 py-3">
                            الصورة
                        </th>
                        <th scope="col" className="px-5 py-3">
                            التاريخ
                        </th>
                        <th scope="col" className="px-5 py-3">
                            تعديل
                        </th>
                        <th scope="col" className="px-5 py-3">
                            حذف
                        </th>
                    </tr>
                </thead>
                <GetMenus />
            </table>
        </div>
    )
};