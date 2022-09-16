
import React from 'react';

const Youtube = ({ color = 'red',strokeWidth='0', strokeColor='currentColor', size = '64', ...rest }) => {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"

            width={size}
            height={size}
            fill={color}
            stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
            {...rest}

            viewBox="0 0 64 64">
            <path d="M61.7,17.1c-0.7-2.7-2.8-4.8-5.5-5.5C51.4,10.3,32,10.3,32,10.3s-19.4,0-24.2,1.3c-2.7,0.7-4.8,2.8-5.5,5.5C1,22,1,32,1,32
	s0,10.1,1.3,14.9c0.7,2.7,2.8,4.8,5.5,5.5c4.8,1.3,24.2,1.3,24.2,1.3s19.4,0,24.2-1.3c2.7-0.7,4.8-2.8,5.5-5.5C63,42.1,63,32,63,32
	S63,22,61.7,17.1z M25.8,41.3V22.7L41.9,32L25.8,41.3z"/>
        </svg>

    );
};
// https://github.com/SRAKIB17/ReactCustomIconsLibrary.git

export default Youtube;
    
    