"use client";

import { hostUrl } from "@/utils/hostUrl";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import * as Yup from "yup";
import plat from "@image/plate.png";
import { useState } from "react";

type RegisterFormValues = {
    userName: string;
    email: string;
    password: string;
};

const initialValues: RegisterFormValues = {
    userName: "",
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    userName: Yup.string().min(2).max(20).required("اسم المستخدم مطلوب"),
    email: Yup.string().email("البريد غير صحيح").required("البريد مطلوب"),
    password: Yup.string().required("كلمة السر مطلوبة"),
});

export default function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false)


    const formik = useFormik<RegisterFormValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true)
            try {
                const { status } = await axios.post(`${hostUrl}/auth/register`, values);
                if (status === 201) {
                    setLoading(false)
                    toast.success("تم إنشاء الحساب بنجاح", {
                        duration: 4000,
                        style: { width: "100%", marginTop: "30px" },
                    });
                    router.push("/login");
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
                <h2 className="my-3 font-bold text-red-400 text-xl md:text-3xl">إنشاء حساب جديد</h2>
            </div>

            <div className="xl:flex xl:justify-center md:gap-2">
                <form onSubmit={formik.handleSubmit} className="xl:w-1/2  md:mt-5">
                    {/** Username */}
                    <div className="my-3">
                        <input
                            type="text"
                            name="userName"
                            placeholder="إسم المستخدم"
                            className="bg-gray-500 border-gray-300 rounded-lg my-1 w-full p-3 border-4 focus:ring-blue-500"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.userName && formik.errors.userName && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.userName}
                            </div>
                        )}
                    </div>

                    {/** Email */}
                    <div className="my-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="حساب البريد"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.email}
                            </div>
                        )}
                    </div>

                    {/** Password */}
                    <div className="my-3">
                        <input
                            type="password"
                            name="password"
                            placeholder="كلمة السر"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                                {formik.errors.password}
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
                                !loading ? "إنشاء حساب" :
                                    <div role="status">
                                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-red-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
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