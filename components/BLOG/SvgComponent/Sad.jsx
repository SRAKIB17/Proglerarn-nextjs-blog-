
import React from 'react';

const Sad = ({ color = 'grey',strokeWidth='0', strokeColor='currentColor', size = '64', ...rest }) => {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"

            width={size}
            height={size}
            fill={color}
            stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
            {...rest}

            viewBox="0 0 64 64">
            <g>
	<path d="M32,1.3C15,1.3,1.3,15,1.3,32C1.3,49,15,62.8,32,62.8C49,62.8,62.8,49,62.8,32C62.8,15,49,1.3,32,1.3z M32,59.3
		C17,59.3,4.8,47,4.8,32C4.8,17,17,4.8,32,4.8C47,4.8,59.3,17,59.3,32C59.3,47,47,59.3,32,59.3z"/>
	<path d="M32,38.2c-5.3,0-10.4,2-14.3,5.6c-0.7,0.7-0.8,1.8-0.1,2.5c0.7,0.7,1.8,0.8,2.5,0.1c3.2-3,7.4-4.6,11.9-4.6
		c4.4,0,8.6,1.6,11.9,4.6c0.3,0.3,0.8,0.5,1.2,0.5c0.5,0,0.9-0.2,1.3-0.6c0.7-0.7,0.6-1.8-0.1-2.5C42.4,40.2,37.3,38.2,32,38.2z"/>
	<path d="M20.1,26.7c2.2,0,4-1.8,4-4s-1.8-4-4-4s-4,1.8-4,4S17.9,26.7,20.1,26.7z"/>
	<path d="M43.9,18.8c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S46,18.8,43.9,18.8z"/>
</g>
        </svg>

    );
};
// https://github.com/SRAKIB17/ReactCustomIconsLibrary.git

export default Sad;
    
    