/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

const CommentBodyReplies = ({ commentBody, comment }) => {

    const [showFullComment, setFullComment] = useState('')
    useEffect(() => {
        setFullComment(comment?.length >= 100 ? comment?.slice(0, 100) : comment)
    }, [comment])

    const handleShowFullComment = () => {
        setFullComment(showFullComment?.length == 100 ? comment : comment?.slice(0, 100))
    }
   
    return (
        <div>
            <div className='rounded-lg rounded-br-3xl  ml-11 shadow-inner bg-base-200 pt-2 px-3 pb-2 m-1 mr-2'>
                {/* -----------------------=======================-for comment  -------------------------------*/}
                <div className=' overflow-auto w-full'>
                    <div className='w-full'>

                        <div className='break-words overflow-hidden text-sm sm:text-[1rem] whitespace-pre-wrap font-extraligh font-sans'>
                            {(commentBody?.emoji) &&
                                <div>
                                    <img src={commentBody?.emoji} alt="" className='h-auto max-w-[128px]' />
                                </div>
                            }
                            {showFullComment}
                        </div>
                        {
                            comment?.length >= 100 && <button
                                onClick={handleShowFullComment}
                                className='text-xs link-hover link-primary'>
                                show
                                {
                                    showFullComment?.length === 100 ? ' more' : ' less'
                                }
                            </button>
                        }
                    </div>

                </div>

            </div>
        </div>
    );
};

export default CommentBodyReplies;