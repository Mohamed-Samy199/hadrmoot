"use client";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import img1 from "@image/c1.jpg";
import img2 from "@image/c2.jpg";
import img3 from "@image/c3.jpg";
import img4 from "@image/c4.jpg";
import img5 from "@image/c5.jpg";
import Image from "next/image";

export default function Carousel() {
    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: { perView: 1 },
        created(s) {
            setInterval(() => {
                s.next();
            }, 6000);
        },
    });

    return (
        <div ref={sliderRef} className="keen-slider w-full h-[400px] overflow-hidden">
            {[img1, img2, img3, img4, img5].map((img, i) => (
                <div key={i} className="keen-slider__slide flex items-center justify-center">
                    <Image src={img} alt={`slide-${i}`} width={800} height={400} className="object-cover w-full h-full animate-zoom-smooth" />
                </div>
            ))}
        </div>
    );
};