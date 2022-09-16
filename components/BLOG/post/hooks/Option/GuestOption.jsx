import React from 'react';
import { Copy } from '../../../../ReactRSIcon';

const GuestOption = ({ post }) => {
    const { post_id } = post
    const CopyUrlHandle = (id, e) => {
        e.preventDefault();
        const getInput = e.target.getElementsByTagName('input')[0];
        getInput.select()
        document.execCommand('copy')

        const copiedMsg = e.target.getElementsByTagName('p')[0];
        copiedMsg.style.display = 'block'
        setTimeout(() => {
            copiedMsg.style.display = 'none'
        }, 1000);
    }

    const copyLink = `
    ${typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''}/blog/post/${post_id}
    `;
    const apiCodeCopy = `
    <iframe 
        src="${typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''}/api/preview/${post_id}" 
        width="100%"
        height="300" 
        style="border:1px solid black;"
     >
     </iframe>`
    return (
        <>
            {/* Url copy */}
            <li
                onClick={(e) => CopyUrlHandle(post_id, e)}
                className="tooltip"
            >
                <a>
                    <Copy size='20' className="pr-1" />
                    Copy Url
                    <p className="tooltiptext hidden">
                        Copied
                    </p>
                    <input
                        type="text"
                        value={copyLink}
                        className="absolute top-[-100000px] left-0"
                    />
                </a>
            </li>

            {/* API CODE */}
            <li
                onClick={(e) => CopyUrlHandle(post_id, e)}
                className='tooltip'
            >
                <a>
                    <Copy size='20' className="pr-1" />
                    Api Code
                    <p className='tooltiptext hidden'>
                        Copied
                    </p>
                    <input
                        type="text"
                        value={apiCodeCopy}
                        className="absolute top-[-100000px] left-0"
                    />
                </a>
            </li>



            {/* <li
                        className=' btn btn-outline btn-primary text-left rounded-md btn-xs'
                    //  onClick={() => setDeletePost(post_id)}
                    >
                        <Delete size='17' />Delete Post
                        Shorten Url
                    </li> */}
        </>
    );
};

export default GuestOption;