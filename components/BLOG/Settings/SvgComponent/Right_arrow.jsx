
import React from 'react';

const Right_arrow = ({ color = 'grey',strokeWidth='0', strokeColor='currentColor', size = '1rem', ...rest }) => {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"

            width={size}
            height={size}
            fill={color}
            stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" 
            {...rest}

            viewBox="0 0 100 100">
            <g>
	<path d="M37.181,82.395c0.383,0.348,0.864,0.519,1.343,0.519c0.545,0,1.087-0.222,1.482-0.657l27.939-30.822
		c0.443-0.49,0.594-1.141,0.471-1.742c0.053-0.602-0.159-1.22-0.641-1.656L36.953,20.097c-0.818-0.742-2.083-0.679-2.825,0.139
		c-0.742,0.818-0.68,2.083,0.139,2.824L63.91,49.93L37.042,79.57C36.301,80.389,36.363,81.653,37.181,82.395z"/>
</g>
        </svg>

    );
};
// https://github.com/SRAKIB17/ReactCustomIconsLibrary.git

export default Right_arrow;
    
    