import React from 'react';
import logo from '../../../assets/logo.jpg'

const Footer = () => {
    return (
        <div>
            <h1>This is Footer</h1>
            <img className='w-8 h-8 rounded-full' src={logo} alt="Logo of the company" />
        </div>
    );
};

export default Footer;