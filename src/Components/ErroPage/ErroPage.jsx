import React from 'react';
import errorSvg from '../../assets/404.png';
import BackToHomeButton from '../BackToHomeButton/BackToHomeButton';

const ErroPage = () => {
    return (
        <div className='min-w-screen flex flex-col justify-center items-center'>
            <img src={errorSvg} className=' ' alt="404 Error svg" />
            <p className='text-2xl font-bold text-gray-600 mb-5'>Opps! Page Not Found</p>
            <BackToHomeButton></BackToHomeButton>
        </div>
    );
};

export default ErroPage;