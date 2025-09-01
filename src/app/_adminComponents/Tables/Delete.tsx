"use client";

import { useAllTables, useTableDelete } from "@/lib/queries/tableQuery";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Select, { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";

const customStyles: StylesConfig<Option, false, GroupBase<Option>> = {
    control: (provided: CSSObjectWithLabel) => ({
        ...provided,
        backgroundColor: "#343a40",
        border: "1px solid #495057",
        color: "white",
    }),
    option: (provided: CSSObjectWithLabel, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? "#495057" : "#343a40",
        color: "white",
    }),
    singleValue: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: "white",
    }),
    placeholder: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: "#adb5bd",
    }),
    dropdownIndicator: (provided: CSSObjectWithLabel) => ({
        ...provided,
        color: "white",
        fontSize: "1.2rem",
    }),
    indicatorSeparator: (provided: CSSObjectWithLabel) => ({
        ...provided,
        backgroundColor: "transparent",
    }),
};

type Option = {
    value: string;
    label: string;
};

type Tables = {
    _id: string;
    tableNumber: number;
};

export default function DeleteTable() {
    const { data: tables, isLoading, error } = useAllTables();
    const [tableId, setTableId] = useState<string | null>(null);
    const { mutate: deleteTable } = useTableDelete();
    const route = useRouter();
    const options: Option[] =
        tables?.map((table: Tables) => ({
            value: table._id,
            label: table.tableNumber,
        })) || [];

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ</p>;

    return (
        <div className="my-3 mx-10 ">
            <div className="xl:flex xl:justify-center md:gap-2">
                <div className="xl:w-1/2  md:mt-5 text-center">
                    <Select<Option, false>
                        options={options}
                        styles={customStyles}
                        onChange={(option) => setTableId(option?.value || null)}
                        placeholder="اختر ترابيزة..."
                    />
                    <button
                        className='main-btn my-5'
                        disabled={!tableId}
                        onClick={() => {
                            if (!tableId) return;
                            if (window.confirm("هل انت متأكد من الحذف؟")) {
                                deleteTable(tableId);
                                route.push("/dashboard/tables-managment")
                            }
                        }}
                    >
                        حذف
                    </button>
                </div>
            </div>
        </div>
    )
};