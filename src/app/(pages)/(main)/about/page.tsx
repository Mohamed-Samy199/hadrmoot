import Image from "next/image";
import logo from "@image/logo.png";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* العنوان */}
            <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
                عن مطعم حضرموت ومشويات الخليج 🍽️🔥
            </h2>

            <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* الصورة */}
                <div className="flex justify-center">
                    <Image
                        src={logo}
                        alt="حضرموت ومشويات الخليج"
                        width={500}
                        height={400}
                        className="rounded-2xl shadow-lg"
                    />
                </div>

                {/* النص */}
                <div>
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                        مطعم <span className="font-bold">حضرموت ومشويات الخليج</span> بيقدم
                        لك أحلى الأكلات الشرقية الأصيلة، من المندي والمشويات، بجودة عالية
                        وطعم يفضل في الذاكرة.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-700 mb-4">
                        لو بتدور على أكل يشبعك ويجمع بين الطعم الأصيل و الوصفات الشرقية
                        المميزة، فأنت في المكان الصح.
                    </p>

                    {/* العنوان */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">العنوان:</h3>
                        <p className="text-gray-700">
                            الإسماعيلية – 7 شارع عطية – بجوار كازيون ونادي الكهرباء – المرحلة
                            الخامسة
                        </p>
                    </div>

                    {/* أرقام التليفون */}
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold text-gray-900">أرقام التليفون:</h3>
                        <ul className="list-disc pl-5 px-3 text-gray-700">
                            <li>01090814907</li>
                            <li>01143542262</li>
                            <li>01206891908</li>
                            <li>046/3229123</li>
                        </ul>
                    </div>

                    <p className="text-lg text-gray-700">
                        المطعم دايمًا في خدمتك لتوصيل الطلبات ولإستقبالك بأجمل أجواء.
                    </p>
                </div>
            </div>
        </div>
    );
}
