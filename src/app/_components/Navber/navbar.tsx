import Image from "next/image";
import logo from "@image/logo.png";
import NavToggle from "./NavToggel";
import Link from "next/link";
import NavAuth from "./NavAuth";
import NavCart from "./NavCart";

export default function Navbar() {
    return (
        <nav className="bg-white border-gray-200 dark:bg-red-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-1">
                <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image src={logo} alt="Logo" className="w-28" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        حضرموت
                    </span>
                </Link>

                <NavToggle>
                    <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
                        <li><Link href="/" className="block dark:text-white py-2 px-3 hover:text-red-300">الصفحة الرئيسية</Link></li>
                        <li><Link href="/menu" className="block dark:text-white py-2 px-3 hover:text-red-300">المينو</Link></li>
                        <NavCart />
                        <NavAuth />
                    </ul>
                </NavToggle>
            </div>
        </nav>
    );
};