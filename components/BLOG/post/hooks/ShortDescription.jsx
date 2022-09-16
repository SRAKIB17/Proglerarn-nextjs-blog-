/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Camera } from '../../../ReactRSIcon';

const ShortDescription = ({ postRefMode, thumbnail, short_description, postBody }) => {
    return (
        <div className='p-5 text-justify'>
            <div className='w-full'>
                <div className='sm:float-left'>
                    {/* ----thumbnail------------ */}
                    {
                        <div className='sm:mr-4'>
                            <figure>
                                <img
                                    src={Boolean(thumbnail) ? thumbnail : '/blogThumbnailDefault.svg'}
                                    alt=""
                                    className='postBodyThumbnail'
                                />
                            </figure>
                        </div>
                    }
                </div>
                {/* style={{ width: '100%', wordWrap: "break-word", whiteSpace: 'pre-line' }} */}
                <div className='clear-both pt-4 sm:pt-0 sm:clear-none '>
                    {
                        short_description?.slice(0, 1000)
                    }
                </div>
                <div className='clear-both'>

                </div>
            </div>
        </div>
    );
};

export default ShortDescription;