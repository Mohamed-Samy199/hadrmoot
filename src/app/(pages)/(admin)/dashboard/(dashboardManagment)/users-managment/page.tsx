import GetUser from "@/app/_adminComponents/Users/GetUsers";

export default function UsersPage() {
    return (
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-5"></th>
                        <th scope="col" className="px-5 py-3">
                            الإسم
                        </th>
                        <th scope="col" className="px-5 py-3">
                            الإيميل
                        </th>
                        <th scope="col" className="px-5 py-3">
                            الدور
                        </th>
                        <th scope="col" className="px-5 py-3">
                            التاريخ
                        </th>
                        <th scope="col" className="px-5 py-3">
                            حذف
                        </th>
                    </tr>
                </thead>
                <GetUser />
            </table>
        </div>
    )
};