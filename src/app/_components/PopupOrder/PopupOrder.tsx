"use client";

import { useCreateOrUpdateCart } from '@/lib/queries/cartQuery';
import { useAllTables } from '@/lib/queries/tableQuery';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Select, { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";
import { safeLocalStorage } from "@/utils/safeLocalStorage";

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
type TableNumber = {
    tableNumber: number | null;
};

type Option = {
    value: number;
    label: string | number;
};


type PopupOrderProps = {
    menuId?: string;
    orderName: string;
};

export default function PopupOrder({ menuId, orderName }: PopupOrderProps) {



    const [isOpen, setIsOpen] = useState(false);
    const [isTable, setIsTable] = useState(false);
    const [tableNumber, setTableNumber] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const toggleModal = () => setIsOpen(!isOpen);
    const closeModal = () => setIsOpen(false);
    const toggleTable = () => setIsTable(!isTable);
    const router = useRouter();
    const { mutate: addToCart } = useCreateOrUpdateCart();
    const { data } = useAllTables();
    const options: Option[] = data?.map((option: TableNumber) => ({
        value: option.tableNumber ?? 0,
        label: option.tableNumber ?? "غير متاح"
    })) || [];


    useEffect(() => {
        setToken(safeLocalStorage.get("hadramoot"));
    }, []);

    return (
        <div>
            <button
                onClick={toggleModal}
                className='main-btn'
                type="button"
            >
                طلب
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{orderName}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <p className="text-gray-500 dark:text-gray-300 mb-4">حدد مكان الطلب:</p>
                        <ul className="space-y-4 mb-4">
                            <li>
                                <Link
                                    href="/cart"
                                    className="block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        addToCart(
                                            { menuId, quntity: 1, token: safeLocalStorage.get("hadramoot") },
                                            {
                                                onSuccess: () => {
                                                    router.push('/cart');
                                                },
                                            }
                                        );
                                    }}
                                >
                                    <div className="w-full text-lg font-semibold bg-gray-50 rounded-xl p-3 hover:bg-gray-300">ديلفري</div>
                                </Link>
                            </li>
                            <li>
                                <div className="block mb-3 cursor-pointer" onClick={toggleTable}>
                                    <div className="w-full text-lg font-semibold bg-gray-50 rounded-xl p-3 hover:bg-gray-300">ترابيزة في المطعم</div>
                                </div>
                                {
                                    isTable && (
                                        <>
                                            <Select
                                                options={options}
                                                styles={customStyles}
                                                onChange={(option) => setTableNumber(option ? option.value : null)}
                                                placeholder="اختر..."
                                            />
                                            <button
                                                className='main-btn'
                                                disabled={!tableNumber}
                                                //onClick={()=> router.push("/cart")}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(
                                                        { menuId, quntity: 1, tableNumber },
                                                        {
                                                            onSuccess: () => {
                                                                router.push(`/cart/${tableNumber}`);
                                                            },
                                                        }
                                                    );
                                                }}
                                            >
                                                حجز
                                            </button>
                                        </>
                                    )
                                }
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};