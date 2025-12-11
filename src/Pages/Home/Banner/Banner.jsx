import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Autoplay } from 'swiper/modules';
import useAxios from '../../../hooks/useAxios';
import Loader from '../../../Loader/Loader';


const Banner = () => {

    const axiosInstance = useAxios()
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosInstance.get('/banners')
        .then(res => {
            setBanners(res.data)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [axiosInstance])

    if(loading){
        return <Loader></Loader>
    }





    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={0}
            loop={true}
            modules={[Autoplay, Pagination]}
            autoplay={{
                delay: 4000,
            }}
            pagination={{
                clickable: true,
            }}
            className="mySwiper"

        >
            {banners.map(slide => (
                <SwiperSlide key={slide._id}>
                    <div className="relative w-full min-h-screen lg:min-h-[530px]">
                        {/* Background Image */}
                        <img
                            src={slide.img}
                            className="w-full h-full object-cover absolute"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/50"></div>

                        {/* Motion Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-center text-center px-5"
                        >
                            <h1 className="text-3xl md:text-6xl lg:text-5xl font-extrabold text-accent">
                                {slide.title}
                            </h1>

                            <p className="mt-5 mx-6 text-gray-300 font-extrabold max-w-xl">
                                {slide.subtitle}
                            </p>

                        </motion.div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Banner;