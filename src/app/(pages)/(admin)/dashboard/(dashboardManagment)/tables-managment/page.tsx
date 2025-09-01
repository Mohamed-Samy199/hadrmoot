import GetTables from "@/app/_adminComponents/Tables/GetTables";

export default function TablePage() {
    return <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <GetTables />
        </table>
    </div>
};