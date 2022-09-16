import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import { Delete } from '../../../../ReactRSIcon';
import timeAgoSince from '../../function/timeAgoSince';
import CommentBodyReplies from './CommentBodyReplies';

import Profile from './Profile';
import AllRepliesList from './AllRepliesList';
import Reply from './svg/Reply';
import Comments_reply from './svg/Comments_reply';

const AllCommentList = ({ comment: commentBody, replySetHandle, post_id, refetch }) => {
    const { userID, comment, time, comment_id, replies } = commentBody;
    const timeAgo = timeAgoSince(time)


    // GET COMMENT USER DETAILS 
    const commentUserInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const comment_user_details = commentUserInfo?.data?.data?.user_details;
    const commentUserLoading = commentUserInfo?.isLoading;


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
        console.log(data)
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
            <div className='border-b' id={post_id}>
                {/* ------------------------------------------for profile picture  ----------------------------*/}
                <Profile user_id={userID} timeAgo={timeAgo} />

                {/* **************for comment body ********** */}
                <CommentBodyReplies comment={comment} commentBody={commentBody} />

                {/*--------------- for reply count and handle show more  reply  -------------------*/}
                <div className='flex items-center ml-11 p-1'>
                    {
                        repliesCount > 0 &&
                        <>

                            < button
                                className='link link-hover link-primary flex items-center gap-1 rounded-3xl btn btn-ghost btn-sm  text-secondary'
                                onClick={() => setShowReply(!showReply)}
                            >
                                {repliesCount + ' '}  <Comments_reply size='19' strokeWidth='1.2' />
                            </button>

                            <b className='font-extrabold p-1'>.</b>

                        </>
                    }

                    {/* **********REPLY ********** */}
                    <button
                        className='link link-hover link-primary text-xs btn btn-sm btn-ghost rounded-3xl'
                        onClick={() => replyComment(post_id, comment_id, comment_user_details?.name)}
                    >
                        <Reply size='20' color='#2BD566' />
                    </button>

                    {/* ***************************FOR DELETE COMMENT ************************ */}

                    {
                        ((userID == user_details?.userID && user?.user) || (isAdmin?.admin || user_details?.userID === post_id?.split('-')?.[1])) &&
                        <>
                            <b className='font-extrabold p-1'>.</b>
                            {deleteLoading ||
                                <button
                                    className='link btn btn-sm btn-ghost rounded-3xl link-hover link-primary text-xs'
                                    onClick={() => deleteCommentHandle(comment_id, post_id)}
                                >
                                    <Delete size='18' color='red' />
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
                        </>
                    }

                </div>
                {/* -----------------------------------------for show more reply  ----------------*/}
                {

                    (
                        showReply &&
                        <div className='ml-11 border-l-[3px] rounded-bl-3xl mb-3 pl-1 pt-1'>
                            {
                                replies?.map(reply => <AllRepliesList
                                    key={reply?.reply_id}
                                    replyBody={reply}
                                    comment_id={comment_id}
                                    post_id={post_id}
                                    refetch={refetch}
                                />)
                            }
                        </div>
                    )
                }
            </div>

        </div >
    );
};

export default AllCommentList;