import React from 'react';
import Loader from '../../../Loader/Loader';
import Banner from '../Banner/Banner';
import DailyMeals from '../DailyMeals/DailyMeals';
import HowItWorks from '../HowItWorks/HowItWorks';


const Home = () => {
    return (
        <div className=''>
            {/* Banner */}
            <section>
                <Banner></Banner>
            </section>

            {/* Meals */}
            <section className='bg-primary rounded-b-4xl'>
                <DailyMeals></DailyMeals>
            </section>

            <section className='py-20 bg-secondary'>
                <HowItWorks></HowItWorks>
            </section>
            
        </div>
    );
};

export default Home;