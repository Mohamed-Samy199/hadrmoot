import Image from 'next/image'
import img1 from '@image/c1.jpg'
import img2 from '@image/c2.jpg'
import img3 from '@image/c3.jpg'
import img4 from '@image/c4.jpg'
import img5 from '@image/c5.jpg'
import logo from '@image/logo.png'

export default function Card() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-5 gap-3'>
            {
                [img1, img2, img3, img4, img5].map((img, i) => (
                    <div key={i} className='overflow-hidden rounded-sm border-6 border-red-500 relative group'>
                        <Image src={img} alt='حضرموت و مشويات الخليج' className='animate-zoom-smooth' />
                        <div className='absolute inset-0 bg-black/70 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <Image src={logo} alt='logo' className='w-[50%]' />
                        </div>
                    </div>
                ))
            }
        </div>
    )
};