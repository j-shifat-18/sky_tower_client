import React from 'react';
import { Link } from 'react-router';

const BackToHomeButton = () => {
    return (
        <Link to="/" className='btn bg-primary hover:bg-secondary font-bold text-lg rounded-2xl text-white'>Go To Home </Link>
    );
};

export default BackToHomeButton;