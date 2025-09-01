"use client"

import { useCartDelivary } from '@/lib/queries/cartQuery';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { hostUrl } from "@/utils/hostUrl";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { CartItem } from '@/lib/graphql/cartDelivaryGraph';

type PayOnTableFormValues = {
    source: string;
};

const initialValues: PayOnTableFormValues = {
    source: "table-in-restaurant"
};

const validationSchema = Yup.object({
    source: Yup.string()
});


export default function PayOnTable() {
    const [isOpen, setIsOpen] = useState(false);
    const tblNumber = useParams();
    const tableNumber = Number(tblNumber.cartOfTableNumber);
    const { data } = useCartDelivary({ tableNumber });
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const toggleModal = () => setIsOpen(!isOpen);
    const closeModal = () => setIsOpen(false);
    const formik = useFormik<PayOnTableFormValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const { status } = await axios.post(`${hostUrl}/order/${tableNumber}`, values);
                if (status === 201) {
                    setLoading(false)
                    toast.success("قد تم الطلب بنجاح", {
                        duration: 4000,
                        style: { width: "100%", marginTop: "30px" },
                    });
                    router.push("/");
                }
            } catch (error: any) {
                setLoading(false)
                toast.error(error?.response?.data?.message || "حدث خطأ");
            }
        },
    });

    return (
        <>
            <button
                onClick={toggleModal}
                className='main-btn'
            >
                المطلوب دفعه للكاشير
            </button>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Header */}
                        <div className="flex items-center justify-between border-b pb-3 mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">حساب ترابيزة رقم {tableNumber}</h3>
                            <button
                                onClick={closeModal}
                                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        {/* Body */}
                        <h4 className='font-bold text-xl text-gray-500 dark:text-gray-300 mb-4 text-center'>
                            الحساب الكلي:{" "}
                            <span className="text-red-100">{data?.data?.cart?.menus && data?.data?.cart?.menus?.length > 0
                                ? data?.data?.cart?.menus?.reduce((sum: number, menu: CartItem) => {
                                    return sum + menu.menuId.finalPrice * menu.quntity;
                                }, 0)
                                : "0"}{" "}
                                جنيه</span>
                        </h4>
                        <form onSubmit={formik.handleSubmit} className="space-y-4 mb-4 text-center">
                            <button
                                type="submit"
                                className='main-btn'
                            >
                                تفريغ و دفع طلبات الترابيزة
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
};