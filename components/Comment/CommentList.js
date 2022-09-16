/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import MoreCommentReply from './MoreCommentReply';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../pages/_app';
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import timeSince from '../Post-NewsFeed/TimeSince';
import WarningProfile from '../hooks/WarningProfile';
import { useRouter } from 'next/router';


const CommentList = ({ comment: commentBody, replySetHandle, post_id, refetch }) => {

    const { userID, comment, time, comment_id, replies } = commentBody;
    const getTimeSince = timeSince(time)
    // GET COMMENT USER DETAILS 
    const commentUserInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));

    const comment_user_details = commentUserInfo?.data?.data?.user_details;
    const commentUserLoading = commentUserInfo?.isLoading;
    const commentUserRefetch = commentUserInfo?.refetch;

    // GET REPLY USER DETAILS 
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);

    // GET ALL REPLY A COMMENT //


    const repliesCount = replies?.length;

    const [showReply, setShowReply] = useState(false);
    const [showFullComment, setFullComment] = useState(comment?.length >= 100 ? comment?.slice(0, 100) : comment)
    const handleShowFullComment = () => {
        if (showFullComment?.length === 100) {
            setFullComment(comment)
        }
        else {
            setFullComment(comment?.slice(0, 100))
        }
    }

    const replyComment = (id, comment_id, name) => {
        try {
            replySetHandle({ name: name, comment_id: comment_id }, id);

            document.getElementById('commentTextArea' + id).focus()
        }
        catch {

        }

    }


    // FOR COMMENT DELETE BY ADMIN POST USER AND USER WHO COMMENT THIS 
    // comment-delete

    const [deleteLoading, setDeleteLoading] = useState(false)
    const deleteCommentHandle = async (id, post_id) => {
        setDeleteLoading(true)

        const { data } = await axios.delete(`/api/post/comment-delete?email=${user_details?.email}&comment_id=${id}&post_id=${post_id}`,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            }
        );
        if (data?.message === 'success') {
            refetch()
            if (data?.result?.acknowledged) {
                refetch()
            }
        }
        else if (data?.message === 'error') {
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
            <div className='border-t' id={post_id}>
                {/* ------------------------------------------for profile picture  ----------------------------*/}
                <div className='mt-2 flex items-center gap-1'>
                    <div className="avatar ">
                        <div className="w-5 rounded-[50%] border-2 border-gray-500  overflow-hidden">

                            {
                                commentUserLoading ?
                                    <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                    :
                                    (comment_user_details?.profile == '' ?
                                        <img
                                            src={(comment_user_details?.gender == 'Female' ? femaleAvatar.src : maleAvatar?.src)}
                                            alt=''
                                            className='w-full bg-base-100'
                                        />
                                        :

                                        <img
                                            src={(!comment_user_details?.gender) ? maleAvatar?.src : comment_user_details?.profile}
                                            alt=''
                                        />)
                            }

                        </div>
                    </div>
                    <div className='text-[12px] font-bold'>
                        <div
                            className='flex cursor-pointer link-primary link-hover'
                            onClick={() => navigate('/profile/' + comment_user_details?.userID)}
                        >
                            <h6 className='m-0'>{comment_user_details?.name || "User"}</h6>
                            <WarningProfile user_details={comment_user_details} size='13' />
                        </div>
                        <p className='text-[8px] text-gray-500'>{getTimeSince}</p>
                    </div>

                </div>
                <div className='rounded-lg rounded-bl-3xl shadow-inner bg-base-200 pt-2 px-3 pb-2 m-1 mr-2'>
                    {/* -----------------------=======================-for comment  -------------------------------*/}
                    <div className=' overflow-auto w-full'>

                        <div className='w-full'>

                            <div className='break-words overflow-hidden text-sm whitespace-pre-wrap font-extraligh font-sans'>
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
                {/*--------------- for reply count and handle show more  reply  -------------------*/}
                <div className='flex items-center'>
                    {
                        repliesCount > 0 &&
                        <div>

                            < button
                                className='link ml-4 link-hover link-primary text-xs'
                                onClick={() => setShowReply(!showReply)}
                            >
                                {repliesCount + ' '}  Reply
                            </button>

                            <b className='text-xs p-1'>|</b>
                        </div>
                    }
                    <div className='pl-1'>
                        < button
                            className='link link-hover link-primary text-xs'
                            onClick={() => replyComment(post_id, comment_id, comment_user_details?.name)}
                        >
                            Reply
                        </button>
                    </div>
                    {
                        ((userID == user_details?.userID && user?.user) || (isAdmin?.admin || user_details?.userID === post_id?.split('-')?.[1])) &&
                        <div>

                            <b className='text-xs p-1'>|</b>
                            {deleteLoading ||
                                < button
                                    className='link link-hover link-primary text-xs'
                                    onClick={() => deleteCommentHandle(comment_id, post_id)}
                                >
                                    delete
                                </button>
                            }
                            {
                                deleteLoading &&
                                < button
                                    className='link link-hover link-primary text-xs'
                                >
                                    <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>

                                </button>
                            }
                        </div>
                    }

                </div>
                {/* -----------------------------------------for show more reply  ----------------*/}
                {

                    (
                        showReply &&
                        <div className='ml-4 border-l-[3px] rounded-bl-3xl mb-3 pl-1 pt-1'>
                            {
                                replies?.map(reply => <MoreCommentReply key={reply?.reply_id} replyComment={reply} refetch={refetch} post_id={post_id} comment_id={comment_id} />)
                            }
                        </div>
                    )
                }
            </div>
        </div >

    );
};

export default CommentList;