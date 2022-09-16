import React from 'react';
import { Like } from '../../../../ReactRSIcon';

const LikeReact = ({ reactLoading, like, likePostColor, LikeUnlikeLovePostHandle }) => {
    return (
        <div>
            {
                !reactLoading ?
                    <button
                        onClick={() => LikeUnlikeLovePostHandle('like')}
                        className='btn relative btn-xs bg-[#DDDDDD] rounded-3xl text-sm sm:text-[18px]'
                    >
                        <span className='flex items-center gap-1 '>
                            <Like color={likePostColor ? '#0081FE' : 'grey'} size='14' />
                            <p className='font-extralight text-sm'>
                                {like?.length}
                            </p>
                        </span>
                    </button>
                    :
                    <button
                        className='btn relative btn-xs bg-[#DDDDDD] rounded-3xl text-sm sm:text-[18px]'
                    >
                        <span className='flex items-center gap-1'>
                            <Like size='14' color={likePostColor ? '#0081FE' : 'grey'} />
                            <p className='font-extralight text-sm'>
                                {like?.length}
                            </p>
                        </span>
                        <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                        </p>
                    </button>

            }
        </div>
    );
};

export default LikeReact;