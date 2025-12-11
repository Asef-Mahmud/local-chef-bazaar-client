import React from 'react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";



const reviews = [
    {
        id: 1,
        name: "Ariana Sultana",
        image: "https://i.ibb.co/sample-user1.jpg",
        rating: 5,
        comment: "The food was absolutely delicious! Fast delivery and authentic flavors. Highly recommend!",
        date: "2025-12-01",
    },
    {
        id: 2,
        name: "Rahim Uddin",
        image: "https://i.ibb.co/sample-user2.jpg",
        rating: 4.5,
        comment: "Amazing experience! Loved the home-cooked meals. Will definitely order again.",
        date: "2025-12-03",
    },
    {
        id: 3,
        name: "Farzana Akter",
        image: "https://i.ibb.co/sample-user3.jpg",
        rating: 5,
        comment: "Fresh, tasty, and delivered on time. Local chefs are doing an incredible job!",
        date: "2025-12-05",
    },
    {
        id: 4,
        name: "Imran Hossain",
        image: "https://i.ibb.co/sample-user4.jpg",
        rating: 5,
        comment: "Absolutely loved it! The taste was authentic and reminds me of homemade meals. Highly recommended!",
        date: "2025-12-07",
    },
    {
        id: 5,
        name: "Shamima Khatun",
        image: "https://i.ibb.co/sample-user5.jpg",
        rating: 4.8,
        comment: "The service was excellent, and the food was fresh. I’m definitely ordering again from LocalChefBazaar.",
        date: "2025-12-08",
    },
    {
        id: 6,
        name: "Nayeem Ahmed",
        image: "https://i.ibb.co/sample-user6.jpg",
        rating: 5,
        comment: "Perfect portion, delicious flavors, and quick delivery. Local chefs are doing a fantastic job!",
        date: "2025-12-09",
    },
];

const Reviews = () => {

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
                                src={review.image}
                                alt={review.name}
                                className="rounded-full w-24 h-24 object-cover border-2 border-[#C9A86A] mb-3"
                            />
                            <h3 className="font-semibold text-gray-900">{review.name}</h3>
                            <p className="text-gray-600 text-sm mt-2">{review.comment}</p>
                            <p className="text-accent font-semibold text-sm mt-2">{review.date}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;