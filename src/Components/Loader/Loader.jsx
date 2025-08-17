import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-screen flex items-center justify-center'>
            <span className="loading loading-spinner text-primary mx-auto mt-10 block" />
        </div>
    );
};

export default Loader;