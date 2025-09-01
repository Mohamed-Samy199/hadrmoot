"use client";

import { AuthContext } from "@/lib/context/auth";
import { useCategories } from "@/lib/queries/categoryQuery";
import { useMenuId } from "@/lib/queries/menuQuery"
import { headers, hostUrl } from "@/utils/hostUrl";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation"
import { useContext, useRef, useState } from "react"
import toast from "react-hot-toast";
import * as yup from "yup";
import Select, { CSSObjectWithLabel, GroupBase, StylesConfig } from "react-select";


type UpdateMenuId = {
    updateMenuId: string
};

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

type MenuFormValues = {
    name: string;
    descraption: string;
    price: number;
    discount: number;
    stock: number;
};

type Category = {
    _id: string;
    name: string;
};

const validationSchema = yup.object({
    name: yup.string().min(2).required("الاسم مطلوب"),
    descraption: yup.string().min(2).required("الوصف مطلوب"),
    price: yup.number().integer().required("السعر مطلوب"),
    discount: yup.number().integer(),
    stock: yup.number().integer().min(1).required("المخزون مطلوب"),
});

export default function UpdateMenu() {
    const { updateMenuId } = useParams<UpdateMenuId>()
    const { data, isLoading, error } = useMenuId(updateMenuId);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const inputImageClick = useRef<HTMLInputElement | null>(null);
    const [selectImage, setSelectImage] = useState<File | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const authContext = useContext(AuthContext);

    const { data: categories } = useCategories();
    if (!authContext) throw new Error("must be authenticated");

    const handleImageClick = () => inputImageClick.current?.click();
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setSelectImage(e.target.files[0]);
        }
    };

    const initialValues: MenuFormValues = {
        name: data?.name,
        descraption: data?.descraption,
        price: data?.price,
        discount: data?.discount,
        stock: data?.stock,
    };

    const handleSubmit = async (values: MenuFormValues) => {
        if (!categoryId) {
            toast.error("يجب اختيار فئة");
            return;
        }
        if (!selectImage) {
            toast.error("يجب اختيار صورة");
            return;
        }

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("descraption", values.descraption);
        formData.append("price", String(values.price));
        formData.append("discount", String(values.discount));
        formData.append("stock", String(values.stock));
        if (image) {
            formData.append("image", image);
        }

        try {
            setLoading(true);
            const { status } = await axios.patch(
                `${hostUrl}/category/menu/${categoryId}/${updateMenuId}`,
                formData,
                {
                    headers: {
                        ...headers,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (status === 200) {
                toast.success("تم تعديل الوجبة بنجاح");
                router.push("/dashboard/menu-managment");
            }
        } catch (err: any) {
            console.error(err);

            toast.error(err.response?.data?.message || "حدث خطأ");
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: handleSubmit,
    });

    const options: Option[] =
        categories?.map((cat: Category) => ({
            value: cat._id,
            label: cat.name,
        })) || [];

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ</p>;



    return (
        <section className="my-3 mx-10">
            <div className="xl:flex xl:justify-center md:gap-2">
                <form onSubmit={formik.handleSubmit} className="xl:w-1/2 md:mt-5">
                    {/* صورة */}
                    <div onClick={handleImageClick} className="cursor-pointer mb-3">
                        {selectImage ? (
                            <Image
                                src={URL.createObjectURL(selectImage)}
                                alt="image"
                                width={200}
                                height={200}
                            />
                        ) : (
                            <Image src={data.image.secure_url} alt="img" width={200} height={200} />
                        )}
                        <input
                            type="file"
                            ref={inputImageClick}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* categoryId */}
                    <Select<Option, false>
                        options={options}
                        styles={customStyles}
                        onChange={(option) => setCategoryId(option?.value || null)}
                        placeholder={`${data.categoryId.name}`}
                    />

                    {/* name */}
                    <div className="my-3">
                        <input
                            type="text"
                            name="name"
                            placeholder="إسم الوجبة"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* price */}
                    <div className="my-3">
                        <input
                            type="number"
                            name="price"
                            placeholder="السعر"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-red-500 text-sm">{formik.errors.price}</p>
                        )}
                    </div>

                    {/* discount */}
                    <div className="my-3">
                        <input
                            type="number"
                            name="discount"
                            placeholder="خصم"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>

                    {/* stock */}
                    <div className="my-3">
                        <input
                            type="number"
                            name="stock"
                            placeholder="المخزون"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.stock && formik.errors.stock && (
                            <p className="text-red-500 text-sm">{formik.errors.stock}</p>
                        )}
                    </div>

                    {/* descraption */}
                    <div className="my-3">
                        <textarea
                            name="descraption"
                            placeholder="الوصف"
                            className="bg-gray-500 border-gray-300 my-1 rounded-lg w-full p-3 border focus:ring-blue-500"
                            value={formik.values.descraption}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.descraption && formik.errors.descraption && (
                            <p className="text-red-500 text-sm">{formik.errors.descraption}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="my-5 text-center">
                        <button
                            type="submit"
                            className="main-btn"
                            disabled={loading}
                        >
                            {loading ? "جاري التحديث..." : "تتحدث"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
};