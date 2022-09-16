/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import { UserFullInfoProvider } from '../../pages/_app';
import timeSince from '../Post-NewsFeed/TimeSince';
import WarningProfile from '../hooks/WarningProfile';
import { useRouter } from 'next/router';


const MoreCommentReply = ({ replyComment, isLoading, refetch, post_id, comment_id }) => {
    const { userID, time, reply, reply_id } = replyComment;
    const getTimeSince = timeSince(time)
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);

    const replyUserInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const reply_user_details = replyUserInfo?.data?.data?.user_details;
    const replyIsLoading = replyUserInfo?.isLoading;
    const refetchReply = replyUserInfo?.refetch;

    const [showFullReply, setFullReply] = useState(reply?.length >= 100 ? reply?.slice(0, 100) : reply)
    const handleShowFullReply = () => {
        if (showFullReply?.length === 100) {
            setFullReply(reply)
        }
        else {
            setFullReply(reply?.slice(0, 100))
        }
    }



    // for delete reply 
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteCommentHandle = async (id, comment_id, post_id) => {
        setDeleteLoading(true)
        refetch()
        refetchReply()
        const { data } = await axios.delete(`/api/post/comments-reply-delete?email=${user_details?.email}&reply_id=${id}&comment_id=${comment_id}&post_id=${post_id}`,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            }
        );
        if (data?.message === 'success') {
            refetch()
            refetchReply()
            // setErrMsg(<p className='text-green-600'>Success</p>)
            if (data?.result?.acknowledged) {
                refetch()
                // location.reload()
            }
        }
        else if (data?.message === 'error') {
            // setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            alert('something is wrong')
        }
        setDeleteLoading(false)
    }
    const router = useRouter()
    const navigate = (path) => {
        router.replace(path)
    }


    return (
        <div>
            <div>
                <div className='pt-2 flex items-center border-t gap-1'>
                    <div className="avatar ">
                        <div className="w-5 rounded-full border-2 border-gray-500  overflow-hidden">
                            {
                                replyIsLoading ?
                                    <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                    :
                                    (reply_user_details?.profile == '' ?
                                        <img
                                            src={(reply_user_details?.gender == 'Female' ? femaleAvatar.src : maleAvatar?.src)}
                                            alt=''
                                            className='w-full bg-base-100'
                                        />
                                        :

                                        <img
                                            src={(!reply_user_details?.gender) ? maleAvatar?.src : reply_user_details?.profile}
                                            alt=''
                                        />)
                            }
                        </div>
                    </div>
                    <div className='text-[12px] font-bold'>
                        <div
                            className='flex cursor-pointer link-primary link-hover'
                            onClick={() => navigate('/profile/' + reply_user_details?.userID)}
                        >
                            <h6 className='m-0'>{reply_user_details?.name || "User"}</h6>
                            <WarningProfile user_details={reply_user_details} size='13' />
                        </div>
                        <p className='text-[8px] text-gray-500'>{getTimeSince}</p>
                    </div>

                </div>
                <div className='rounded-lg rounded-bl-3xl shadow-inner bg-base-200 pt-2 px-3 pb-2 m-1 mr-2'>
                    {/* -----------------------=======================-for comment  -------------------------------*/}
                    <div className=' overflow-auto w-full'>

                        <div className='w-full p-1'>
                            {
                                (<div className='break-words overflow-hidden text-sm whitespace-pre-wrap font-extraligh font-sans'>
                                    {(replyComment?.emoji) &&
                                        <div>
                                            <img src={replyComment?.emoji} alt="" className='h-auto max-w-[128px]' />
                                        </div>
                                    }
                                    {showFullReply}
                                </div>)
                            }


                            {/* <div className=' text-[15px]' dangerouslySetInnerHTML={{ __html: showFullReply }}></div> */}

                        </div>
                        {
                            reply?.length >= 100 &&
                            <button
                                onClick={handleShowFullReply}
                                className='text-xs link-hover link-primary'
                            >
                                show
                                {
                                    showFullReply?.length === 100 ? ' more' : ' less'
                                }
                            </button>
                        }
                    </div>

                    {
                        ((userID == user_details?.userID && user?.user) || (isAdmin?.admin || user_details?.userID === post_id?.split('-')?.[1])) &&
                        <div>

                            {deleteLoading ||
                                < button
                                    className='link link-hover link-primary text-xs'
                                    onClick={() => deleteCommentHandle(reply_id, comment_id, post_id)}
                                >
                                    delete
                                </button>
                            }
                            {
                                deleteLoading &&
                                < button
                                    className='link link-hover link-primary text-xs'
                                >
                                    <p className='animate-spin border-b-2 border-r-2 border-red-200 w-4 h-4 rounded-[50%]'>
                                    </p>

                                </button>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default MoreCommentReply;