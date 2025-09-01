"use client";

type PaginationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
};
export default function Pagination({ page, setPage, totalPages }: PaginationProps) {
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="main-btn disabled:opacity-50"
            >
                السابق
            </button>
            <span className="w-25">
                صفحة {page} من {totalPages}
            </span>
            <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="main-btn disabled:opacity-50"
            >
                التالي
            </button>
        </div>
    );
};