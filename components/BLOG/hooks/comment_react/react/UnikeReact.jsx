import React from 'react';
import { Like } from '../../../../ReactRSIcon';

const UnlikeReact = ({ reactLoading, unlike, unLikePostColor, LikeUnlikeLovePostHandle }) => {
    return (
        <div>
            {
                !reactLoading ?
                    <button
                        onClick={() => LikeUnlikeLovePostHandle('unlike')}
                        className='btn relative btn-xs bg-[#DDDDDD] rounded-3xl text-sm sm:text-[18px]'
                    >
                        <span className='flex items-center gap-1'>
                            <Like color={unLikePostColor ? '#FE3C71' : 'grey'} size='14' style={{ transform: 'rotate(180deg)' }} />
                            <p className='font-extralight text-sm'>
                                {unlike?.length}
                            </p>
                        </span>
                    </button>
                    :
                    <button
                        className='btn relative btn-xs  bg-[#DDDDDD] rounded-3xl text-sm sm:text-[18px]'
                    >
                        <span className='flex items-center gap-1'>
                            <Like color={unLikePostColor ? '#FE3C71' : 'grey'} style={{ transform: 'rotate(180deg)' }} size='14'/>
                            <p className='font-extralight text-sm'>
                                {unlike?.length}
                            </p>
                        </span>
                        <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                        </p>
                    </button>

            }
        </div>
    );
};

export default UnlikeReact;