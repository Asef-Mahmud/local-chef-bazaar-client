import React from 'react';
import Loader from '../../../Loader/Loader';
import Banner from '../Banner/Banner';
import DailyMeals from '../DailyMeals/DailyMeals';
import HowItWorks from '../HowItWorks/HowItWorks';
import Reviews from '../Reviews/Reviews';


const Home = () => {
    return (
        <div className=''>
            {/* Banner */}
            <section className='max-w-[1600px] mx-auto'>
                <Banner></Banner>
            </section>

            {/* Meals */}
            <section className='max-w-[1600px] mx-auto bg-primary rounded-b-4xl'>
                <DailyMeals></DailyMeals>
            </section>

            <section className='max-w-[1600px] mx-auto py-20 bg-secondary'>
                <HowItWorks></HowItWorks>
            </section>

            <section className='max-w-[1600px] mx-auto'>
                <Reviews></Reviews>
            </section>
            
        </div>
    );
};

export default Home;