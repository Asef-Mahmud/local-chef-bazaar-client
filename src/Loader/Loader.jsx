import React from 'react';
import { Rings } from 'react-loader-spinner';



const Loader = () => {
    return (
        <div className='flex min-h-screen items-center justify-center'>
            <Rings
                visible={true}
                height="120"
                width="120"
                color="#1A1A1A"
                ariaLabel="rings-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>

    );
};

export default Loader;