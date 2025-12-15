import React from 'react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../Loader/Loader';
import useAxios from '../../../hooks/useAxios';


const Reviews = () => {

    const axiosInstance = useAxios()

    const { data: reviews = [], isLoading} = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosInstance.get('reviews')
            return res.data
        }
    })

    if(isLoading){
        return <Loader></Loader>
    }


    return (
        <div className=" bg-secondary py-25">
            <div className="px-5 pt-5 md:pt-0 text-center mb-10">
                <h1 className="text-2xl md:text-4xl font-bold text-primary mb-5">
                    What Our Customers Are Saying
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    See why food lovers are raving about LocalChefBazaar. From fresh flavors to heartfelt service, our customers share their experiences enjoying home-cooked meals made with passion.
                </p>
            </div>

            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                loop={true}
                navigation={true}
                coverflowEffect={{
                    rotate: 30,
                    stretch: "40%",
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                modules={[Navigation, EffectCoverflow, Autoplay]}
                autoplay={{
                    delay: 3000,
                }}
                className="mySwiper w-full md:max-w-6xl mx-auto py-10"
            >
                {reviews.map((review) => (
                    <SwiperSlide
                        key={review.id}
                        className="flex justify-center w-full"
                    >
                        <div className="bg-base-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg hover:shadow-xl transition duration-300 max-w-md flex-1 justify-between h-[350px] md:h-auto">
                            <img
                                src={review.reviewerImage}
                                alt={review.reviewerName}
                                className="rounded-full w-24 h-24 p-3 object-cover border-2 border-[#C9A86A] mb-3"
                            />
                            <h3 className="font-semibold text-gray-900">{review.reviewerName}</h3>
                            <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                            <p className="text-accent font-semibold text-sm mt-2">{new Date(review.timestamp).toLocaleDateString()}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;