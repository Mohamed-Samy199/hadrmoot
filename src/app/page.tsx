import Image from "next/image";
import img1 from "@image/img1.png";
import Carousel from "./_components/HomeSlider/HomeSlider";
import Card from "./_components/Card/Card";
import Menu from "./_components/Menu/Menu";

export default function Home() {
  return (
    <div className="home">
      <div className="relative h-screen w-full">
        <div className="absolute bg-cover bg-center opacity-20 inset-0 bg-home bg-white/10 z-0"></div>
        <div className=" relative z-20">
          <div className="flex justify-center items-center">

            <div className="text-center">
              <div className="image-home flex justify-center">
                <Image src={img1} alt="حضرموت" />
              </div>
              <div>
                <h1 className="dark:text-red-600 font-bold text-xl md:text-4xl py-2">مطعم حضرموت و مشويات الخليج</h1>
                <h5 className="text-2sm md:text-xl">أشهى المأكولات الشرقية و بأقل أسعار</h5>
              </div>
            </div>
          </div>

          <div className=" h-4 mx-auto my-8 md:my-6 flex justify-center">
            <div className="h-[15rem] md:h-[22rem] relative  rounded-4xl xl:w-[72rem] md:rounded-[11rem] overflow-hidden">
              <div className="absolute inset-0 bg-black/60 z-30"></div>
              <Carousel />
            </div>
          </div>
        </div>
      </div>

      <div className="m-5 md:mx-20 md:my-15">
        <Card />
      </div>

      <div>
        <Menu />
      </div>
    </div>
  );
}
