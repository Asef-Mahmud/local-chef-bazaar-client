import React from 'react';
import Loader from '../../../Loader/Loader';
import Banner from '../Banner/Banner';
import DailyMeals from '../DailyMeals/DailyMeals';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';


const Home = () => {
    return (
        <div className='bg-secondary'>
            {/* Banner */}
            <section className='max-w-[1600px] mx-auto'>
                <Banner></Banner>
            </section>


            <section className='max-w-[1600px] mx-auto py-10 bg-secondary px-5 md:px-10'>
                <HowItWorks></HowItWorks>
            </section>

            {/* Meals */}
            <section className='max-w-[1600px] mx-auto bg-primary py-10'>
                <DailyMeals></DailyMeals>
            </section>


            {/* Review Section */}
            <section className='max-w-[1600px] bg-secondary mx-auto px-5 md:px-10'>
                <Reviews></Reviews>
            </section>

        </div>
    );
};

export default Home;