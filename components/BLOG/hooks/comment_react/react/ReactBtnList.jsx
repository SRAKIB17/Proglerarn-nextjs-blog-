import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import { Comment } from '../../../../ReactRSIcon';
import returnLikeLoveCommentHook from '../returnLikeLoveCommentHook';
import CommentBtn from './CommentBtn';
import LikeReact from './LikeReact';
import LoveReact from './LoveReact';
import UnlikeReact from './UnikeReact';


const ReactBtnList = ({ post, refetch }) => {
    const { post_id } = post;


    const { user, user_details } = useContext(UserFullInfoProvider)

    const [showShareOption, setShowShareOption] = useState(false)
    const router = useRouter()
    const navigate = (path) => {
        router.replace(path)
    }
    const [likePost, setLikePost] = useState(false);
    const [unLikePost, setUnLikePost] = useState(false);
    const [lovePost, setLovePost] = useState(false);

    useEffect(() => {
        const getRating = post?.react?.find(react => react.userID == user_details?.userID)
        if (getRating?.rating) {
            const mode = getRating?.rating;
            switch (mode) {
                case 'like':
                    setLovePost(false)
                    setUnLikePost(false)
                    setLikePost(true)
                    break;
                case 'unlike':
                    setLovePost(false)
                    setLikePost(false)
                    setUnLikePost(true)
                    break;
                case 'love':
                    setUnLikePost(false)
                    setLikePost(false)
                    setLovePost(true)
                    break;
                default:
                    break;
            }
        }
    }, [post, user_details?.userID])
    const [reactLoading, setReactLoading] = useState(null);

    const LikeUnlikeLovePostHandle = async (mode) => {

        if (user?.user) {
            setReactLoading(true)
            let rating;
            switch (mode) {
                case 'like':
                    setLovePost(false)
                    setUnLikePost(false)
                    rating = likePost ? '' : 'like'
                    setLikePost(!likePost)
                    break;
                case 'unlike':
                    setLovePost(false)
                    setLikePost(false)
                    rating = unLikePost ? '' : 'unlike'
                    setUnLikePost(!unLikePost)
                    break;
                case 'love':
                    setUnLikePost(false)
                    setLikePost(false)
                    rating = lovePost ? '' : 'love'
                    setLovePost(!lovePost)
                    break;

                default:
                    break;
            }
            const ratingPostId = {
                rating: rating,
                post_id: post_id,
                userID: user_details?.userID
            }

            const { data } = await axios.post(`/api/post/post-react?email=${user_details?.email}`, ratingPostId,
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
                    setReactLoading(null)
                }
            }
            else if (data?.message === 'error') {
                refetch()
                setLovePost(false)
                setUnLikePost(false)
                setLikePost(false)
            }
            setReactLoading(null)
        }
        else {
            navigate(`/login?return_url=/blog/post/${post_id}`)
        }
    }




    // FOR ALL REACT LIST FILTERING
    const postReact = post?.react;

    // FOR ALL REACT COUNT 
    // SHARE LINK 
    const sharePath = `story/${post_id}`


    const { like, unlike, love, TotalComment, allReact, userList, setUserList } = returnLikeLoveCommentHook(post);



    // SET COMMENT BODY AND COUNT TOTAL COMMENT
    const commentBody = post?.comments;
    const pathCheck = router?.asPath?.split('/')

    const showCommentHandle = (id) => {

        const comment_replies = document.getElementById('comment_replies' + id);
        if (comment_replies?.offsetHeight > 1) {
            console.log(comment_replies?.offsetHeight)
            comment_replies.style.height = '0px'
            comment_replies.style.overflow = 'hidden'

        }
        else {
            comment_replies.style.height = '100%'
            comment_replies.style.overflow = 'hidden'
        }

        // showComment.style.height = '0px'
        // commentForm.style.height = '0px'


    }


    return (
        <div className=' pb-2'>

            <div className='flex gap-2 pb-1 pl-1'>
                <div>
                    <LikeReact
                        like={like}
                        likePostColor={likePost}
                        reactLoading={reactLoading}
                        LikeUnlikeLovePostHandle={LikeUnlikeLovePostHandle}
                    />
                </div>
                <div>
                    <UnlikeReact
                        unLikePostColor={unLikePost}
                        unlike={unlike}
                        reactLoading={reactLoading}
                        LikeUnlikeLovePostHandle={LikeUnlikeLovePostHandle}
                    />
                </div>
                <div>
                    <LoveReact
                        lovePostColor={lovePost}
                        love={love}
                        reactLoading={reactLoading}
                        LikeUnlikeLovePostHandle={LikeUnlikeLovePostHandle}
                    />
                </div>
                <div>
                    {
                        pathCheck?.length >= 4 ?
                            <CommentBtn
                                TotalComment={TotalComment}
                                post_id={post?.post_id}
                                showCommentHandle={showCommentHandle}
                            />
                            :
                            <div>
                                <div className='flex items-center'>
                                    <button
                                        onClick={() => navigate(`/blog/post/${post_id}`)}
                                        title='Comment'
                                        id={'showCommentButton' + post?.post_id}
                                        className='btn relative btn-xs bg-[#DDDDDD] rounded-3xl text-[16px]  sm:text-xl'
                                        rel="noreferrer"
                                    >
                                        <span className='flex items-center gap-1'>
                                            <Comment color='currentColor' size='16' />
                                            <p className='font-extralight text-sm'>
                                                {TotalComment}
                                            </p>
                                        </span>
                                    </button>
                                    {/* <BookmarkPost post={post} refetch={refetch}/> */}
                                </div>
                            </div>
                    }
                </div>
            </div>

            <div>

            </div>
        </div>
    );
};


export default ReactBtnList;