import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../../pages/_app';
import autoJwtTokenGenerateForUserOrGuest from '../../../hooks/autoJwtTokenGenerateForUserOrGuest';
import { Comment } from '../../../ReactRSIcon';
import AllCommentList from './comment_replies/AllCommentList';


import CommentBtn from './react/CommentBtn';
import CommentHandler from './react/CommentHandler';
import LikeReact from './react/LikeReact';
import LoveReact from './react/LoveReact';
import ReactBtnList from './react/ReactBtnList';
import UnlikeReact from './react/UnikeReact';

import returnLikeLoveCommentHook from './returnLikeLoveCommentHook';

const SinglePostReactBtnListCommentForm = ({ post, refetch }) => {

    const { like, unlike, love, TotalComment, allReact, userList, setUserList } = returnLikeLoveCommentHook(post);
    const reactLoading = false;
    const { user, user_details } = useContext(UserFullInfoProvider)


    // SET COMMENT BODY AND COUNT TOTAL COMMENT
    const commentBody = post?.comments;

    const LikeUnlikeLovePostHandle = (react) => {
        console.log(react)

    }

    const [hideComment, setHideComment] = useState(null)
    const HideShowCommentRepliesHandler = (post_id) => {

    }

    const [replyNow, setReplyNow] = useState(null);
    const router = useRouter()
    const navigate = (path) => {
        router.replace(path)
    }
    return (
        <div className='mb-10'>
            {/**
            * FOR COMMENT, LIKE, UNLIKE, LOVE, SHARE,
            * 1. LIKE 
            * 2. UNLIKE, 
            * 3. LOVE
            * 
            */}
            <div className=' pl-1 mt-2'>
                <ReactBtnList post={post} refetch={refetch} />
            </div>

            <div id={'comment_replies' + post?.post_id} className='h-0 overflow-hidden hideScrollBar border-t'>
                {/**
                 * For comment 
                 * for react 
                 * for comment box
                 * for replies
                 */}
                {
                    user?.user &&
                    <div>
                        {hideComment ||
                            <div className='mt-1'>
                                {
                                    commentBody?.map((comment) => <AllCommentList
                                        key={comment?.comment_id}
                                        comment={comment}
                                        post_id={post?.post_id}
                                        refetch={refetch}
                                        replySetHandle={setReplyNow}
                                    />)
                                }
                            </div>
                        }
                    </div>
                }
            </div>
            {
                user?.user ?
                    <div className='relative'>
                        <div className=''>
                            {hideComment || <CommentHandler post_id={post?.post_id} replyNow={replyNow} setReplyNow={setReplyNow} refetch={refetch} />}
                        </div>
                    </div>
                    :
                    <div className='relative p-10 '>
                        <span className='text-red-600'>
                            Show Comment and Access All. Please
                        </span>
                        <button
                            className='btn btn-sm ml-1 btn-ghost font-light text-primary link-hover '
                            onClick={() => navigate('/login?return_url=' + router.asPath)}
                        >
                            Login
                        </button>
                    </div>
            }

        </div>
    );
};

export default SinglePostReactBtnListCommentForm;