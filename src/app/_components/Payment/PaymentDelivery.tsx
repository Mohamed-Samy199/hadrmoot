"use client";

import { headers, hostUrl } from "@/utils/hostUrl";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import plat from "@image/plate.png";
import { useState } from "react";

type PayDeliveryFormValues = {
    address: string;
    phoneCustom: string;
    details: string;
    source: string;
};

const initialValues: PayDeliveryFormValues = {
    address: "",
    phoneCustom: "",
    details: "",
    source: "delivary"
};

const validationSchema = Yup.object({
    address: Yup.string().min(2).required("عنوان العميل مطلوب"),
    phoneCustom: Yup.string()
        .matches(/^01[0-2,5][0-9]{8}$/, "رقم الهاتف يجب أن يكون صحيح").required("رقم التلفون مطلوب"),
    details: Yup.string().required("هل عندك أي تفاصيل عايز تضفها؟"),
    source: Yup.string()
});

export default function PaymentDelivery() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)


    const formik = useFormik<PayDeliveryFormValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const { status } = await axios.post(`${hostUrl}/order/`, values, { headers });
                if (status === 201) {
                    setLoading(false)
                    toast.success("قد تم الطلب و جاري عملية التوصيل", {
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
        <div className="register my-3 mx-10 ">
            <div className="text-center">
                <h2 className="my-3 font-bold text-red-400 text-xl md:text-3xl">الطلب ديلفري</h2>
            </div>
            <div className="xl:flex xl:justify-center md:gap-2">
                <form onSubmit={formik.handleSubmit} className="xl:w-1/2  md:mt-5">
                    {/** address */}
                    <div className="my-3">
                        <input
                            type="text"
                            name="address"
                            placeholder="العنوان"
                            className="bg-gray-500 border-gray-300 rounded-lg my-1 w-full p-3 border-4 focus:ring-blue-500"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.address && formik.errors.address && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.address}
                            </div>
                        )}
                    </div>

                    {/** phoneCustom */}
                    <div className="my-3">
                        <input
                            type="tel"
                            dir="rtl"
                            name="phoneCustom"
                            placeholder="رقم التلفون"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.phoneCustom}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phoneCustom && formik.errors.phoneCustom && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.phoneCustom}
                            </div>
                        )}
                    </div>

                    {/** details */}
                    <div className="my-3">
                        <textarea
                            name="details"
                            placeholder="المزيد من التفاصيل..."
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.details}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.details && formik.errors.details && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.details}
                            </div>
                        )}
                    </div>
                    <div className="my-5 text-center">
                        <button
                            type="submit"
                            className="main-btn"
                            disabled={!(formik.dirty && formik.isValid && !loading)}
                        >
                            {
                                !loading ? "طلب" :
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">تحميل...</span>
                                    </div>
                            }
                        </button>
                    </div>
                </form>
                <div className="xl:w-1/2 text-center">
                    <Image src={plat} alt="hadramoot حضرموت" className="w-1/2 mx-auto rotate-animation xl:mt-15" />
                </div>
            </div>
        </div>
    );
};