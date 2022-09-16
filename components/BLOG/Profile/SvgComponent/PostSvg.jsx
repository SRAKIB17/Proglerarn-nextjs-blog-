
import React from 'react';

const PostSvg = ({ color = 'currentColor', strokeWidth = '0', strokeColor = 'currentColor', size = '64', ...rest }) => {
    return (
        <svg

            xmlns="http://www.w3.org/2000/svg"

            width={size}
            height={size}
            fill={color}
            stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
            {...rest}

            viewBox="0 0 24 24">
            <g><path d="M20.9,0H1.1C0.5,0,0,0.5,0,1.1v21.8C0,23.5,0.5,24,1.1,24h19.8c0.6,0,1.1-0.5,1.1-1.1V1.1C22,0.5,21.5,0,20.9,0z M20,22H2   V2h18V22z" /><rect height="1" width="12" x="5" y="12" /><rect height="1" width="12" x="5" y="14" /><rect height="1" width="12" x="5" y="16" /><rect height="1" width="12" x="5" y="18" /><path d="M5,5v6h12V5H5z M16,10H6V6h10V10z" /></g>
        </svg>

    );
};
// https://github.com/SRAKIB17/ReactCustomIconsLibrary.git

export default PostSvg;

