'use client';

import PopupOrder from "@/app/_components/PopupOrder/PopupOrder";
import { useCategoryId } from "@/lib/queries/categoryQuery";
import Image from "next/image";
import { useParams } from "next/navigation";

type ImageType = {
    secure_url: string
}
type MenuItem = {
    _id: string;
    name: string;
    descraption: string;
    price: number;
    discount: number;
    finalPrice: number;
    image: ImageType;
};

export default function CategoryId() {
    const params = useParams();
    const id = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

    const { data, isLoading, error } = useCategoryId(id);

    if (isLoading) return <p className="text-center">جارٍ التحميل...</p>;
    if (error) return <p className="text-center text-red-500">حدث خطأ أثناء التحميل</p>;

    return (
        <section className='category-menu'>
            <div className="relative bg-cover bg-center h-[48vh] w-full  bg-menu flex justify-center items-center">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-white p-6">
                    <h2 className="text-xl md:text-3xl font-bold text-center">قائمة الطعام / menu</h2>
                    <p className="text-sm md:text-xl mt-2 text-center">افضل الوجبات و المشويات حضرموت و مشويات الخليج</p>
                </div>
            </div>

            <div className='menus mx-5 md:mx-20'>
                <>
                    {
                        <div className="mb-6">
                            <div className="flex items-center justify-center gap-4 my-6">
                                <div className="flex-grow border-t-3 border-red-500"></div>
                                <div className="flex items-center gap-2 text-red-600 font-semibold text-lg">
                                    <span>{data.name}</span>
                                </div>
                                <div className="flex-grow border-t-3 border-red-500"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {data.menu.map((item: MenuItem) => (
                                    <div key={item._id} className="relative">
                                        <div className="p-4 bg-gray-200 flex justify-between gap-3 rounded-xl shadow-2xl h-full">
                                            <div className='w-[40%]'>
                                                <div className="w-full aspect-[5/4] overflow-hidden rounded-lg border-2 border-red-400 relative">
                                                    <Image
                                                        src={item.image?.secure_url || '/fallback.png'}
                                                        alt={item.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className='w-[38%] md:w-[45%]'>
                                                <h4 className="text-sm md:text-2xl font-bold mb-3">{item.name}</h4>
                                                <p className="text-sm font-semibold text-gray-600">{item.descraption}</p>
                                            </div>
                                            <div className='w-[22%] md:w-[15%]'>
                                                <div className='flex flex-col justify-between h-full'>
                                                    <div>
                                                        <h5 className="font-bold text-sm md:text-xl">{item.finalPrice} جنيه</h5>
                                                        {
                                                            item.price && item.discount > 0 &&
                                                            <>
                                                                <h6 className='text-sm text-red-400 py-1'>خصم {item.discount}%</h6>
                                                                <h5 className='font-bold text-sm md:text-xl text-gray-600 ' style={{ textDecorationLine: "line-through" }}>{item.price} جنيه</h5>
                                                            </>
                                                        }
                                                    </div>
                                                    <PopupOrder orderName={item.name} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    }
                </>
            </div>
        </section>
    )
}