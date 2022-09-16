import React from 'react';
import Header from './Header/Header';

const LoadingSpin = () => {
    return (
        <div>
            <div className='flex justify-center pt-8 mb-8 overflow-hidden'>
                <div className='animate-spin text-center  border-l-4 w-28 h-28 rounded-[50%] border-primary'>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpin;