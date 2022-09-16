import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import { Delete } from '../../../../ReactRSIcon';
import timeAgoSince from '../../function/timeAgoSince';
import CommentBodyReplies from './CommentBodyReplies';
import Profile from './Profile';

const AllRepliesList = ({ replyBody, comment_id, post_id, refetch }) => {
    const { userID, time, reply, reply_id } = replyBody;
    const timeAgo = timeAgoSince(time);
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);


    // for delete reply 
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteCommentHandle = async (id, comment_id, post_id) => {
        setDeleteLoading(true)
        refetch()
        const { data } = await axios.delete(`/api/post/comments-reply-delete?email=${user_details?.email}&reply_id=${reply_id}&comment_id=${comment_id}&post_id=${post_id}`,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            }
        );
        if (data?.message === 'success') {
            refetch()
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
    return (
        <div className='border-t'>
            <div>
                <div>
                    <Profile timeAgo={timeAgo} user_id={userID} />
                </div>
                <div>
                    <CommentBodyReplies comment={reply} commentBody={replyBody} />
                </div>
                <div>

                    {
                        ((userID == user_details?.userID && user?.user) || (isAdmin?.admin || user_details?.userID === post_id?.split('-')?.[1])) &&
                        <div className='ml-11'>

                            {deleteLoading ||
                                < button
                                    className='link link-hover link-primary text-xs'
                                    onClick={() => deleteCommentHandle(reply_id, comment_id, post_id)}
                                >
                                    <Delete size='18' color='red' />

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

export default AllRepliesList;