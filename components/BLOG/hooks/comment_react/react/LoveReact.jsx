import React from 'react';
import { EmoticonLove, Like } from '../../../../ReactRSIcon';

const LoveReact = ({ reactLoading, love, lovePostColor, LikeUnlikeLovePostHandle }) => {
    return (
        <div>
            {
                !reactLoading ?
                    <button
                        onClick={() => LikeUnlikeLovePostHandle('love')}
                        className='btn relative btn-xs   bg-[#DDDDDD] rounded-3xl text-[16px] sm:text-xl'
                    >
                        <span
                            className='flex items-center gap-1'
                        >
                            <EmoticonLove
                                color={lovePostColor ? 'red' : 'grey'}
                                size='16'
                            />
                            <p className='font-extralight text-sm'>
                                {love?.length}
                            </p>
                        </span>
                    </button>
                    :
                    <button
                        className='btn relative btn-xs   bg-[#DDDDDD] rounded-3xl text-[16px]  sm:text-xl'
                    >
                        <span className='flex items-center gap-1'>
                            <EmoticonLove color={lovePostColor ? 'red' : 'grey'} size='16' />
                            <p className='font-extralight text-sm'>
                                {love?.length}
                            </p>
                        </span>
                        <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                        </p>
                    </button>

            }
        </div>
    );
};

export default LoveReact;