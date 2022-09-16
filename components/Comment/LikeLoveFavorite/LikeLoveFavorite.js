import React, { useContext, useEffect, useState } from 'react';
import { BookmarkStar, Comment, EmoticonLove, Like, Share, } from '../../ReactRSIcon/index'
import ShareOption from './ShareOption';
import { useRouter } from 'next/router';
import styles from './LikeTransition.module.css'
import LikeUserList from './LikeUsersList';

import { UserFullInfoProvider } from '../../../pages/_app';
import axios from 'axios';
import BookmarkPost from '../BookmarkPost';
import returnLikeLoveHook from './returnLikeLoveHook';

const LikeLoveFavorite = ({ props: { showCommentHandle, post, refetch, setShowReactUser, setShowComment, showReactUserState } }) => {
    const { post_id } = post;

    const { user, user_details } = useContext(UserFullInfoProvider)

    const [showShareOption, setShowShareOption] = useState(false)
    const router = useRouter()
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
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
    const [reactLoading, setReactLoading] = useState(null)
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
            navigate('/login?')
        }
    }
    // useEffect(() => {
    //     setLikePost(true)
    // }, [])
    const showLikeUnlikeUser = (id) => {
        setShowComment(null)
        setShowReactUser(true)

        try {
            const showLikeUnlikeUser = document.getElementById('showLikeUnlikeUser' + id);
            // -------------------------for comment section 0----------------------------------------
            const showComment = document.getElementById('commentShow' + id)
            const commentForm = document.getElementById('commentForm' + id)
            const showCommentButton = document.getElementById('showCommentButton' + id)
            showComment.style.height = '0px'
            commentForm.style.height = '0px'
            try {
                commentForm.childNodes[0].childNodes[0].style.borderTopWidth = '0px'
            }
            catch {

            }
            showCommentButton.className = ' btn-outline btn btn-xs btn-primary ml-2 '
            //-------------------------------------------------------------------------------------
            if (showLikeUnlikeUser.offsetHeight <= 2) {
                showLikeUnlikeUser.style.height = '500px'
                showLikeUnlikeUser.style.overflow = 'auto'
                showLikeUnlikeUser.style.borderTopWidth = '1px'
            }
            else {
                showLikeUnlikeUser.style.height = '0px'
                showLikeUnlikeUser.style.overflow = 'hidden'
                showLikeUnlikeUser.style.borderTopWidth = '0px'
            }
        }
        catch {

        }
    }

    // FOR ALL REACT LIST FILTERING
    const postReact = post?.react;
    const allReact = postReact?.filter((like, index, arr) => like.rating != '')?.length;

    // FOR ALL REACT COUNT 
    const { like, unlike, love, TotalComment } = returnLikeLoveHook(post)
    // SHARE LINK 
    const sharePath = `story/${post_id}`
    return (
        <div className='relative'>
            <div className='p-1 flex items-center justify-between font-mono' >
                <div className='flex relative cursor-pointer' onClick={() => showLikeUnlikeUser(post_id)} >
                    <button
                        className='bg-[#00ff00] p-1 rounded-[50%] btn-disabled relative w-5 h-5'
                    >
                        <Like color='white' size='12' />
                    </button>
                    <button
                        className='bg-[#ff2020] p-1 rounded-[50%] btn-disabled relative w-5 h-5 left-[-4px]'
                    >
                        <Like color='white' size='12' style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <button
                        onClick={() => LikeUnlikeLovePostHandle('unlike')}
                        className='bg-[#ff00f2] p-1 rounded-[50%] btn-disabled relative w-5 h-5 left-[-6px]'
                    >
                        <EmoticonLove size='12' color='white' />
                    </button>
                    <h1 className='text-gray-500  text-[14px]'>{allReact || 0}</h1>
                </div>

            </div>

            {/* show like love unlike  user list  */}
            <div className={(styles.showLikeUnlikeUser) + ' overflow-hidden ' + (styles.likeUnlikeUserList)} id={'showLikeUnlikeUser' + post_id}>
                {
                    (user?.user && showReactUserState) &&
                    <LikeUserList post={post} />
                }
                {/* {
                    (!user?.user && showReactUserState) &&
                    <Login />
                } */}
            </div>

            <div className='relative border-b p-2 border-t z-50 bg-base-100'>
                <div className='flex items-center justify-between'>
                    <div>
                        {/* ************FOR LIKE *************************** */}
                        {
                            !reactLoading ?
                                <button
                                    onClick={() => LikeUnlikeLovePostHandle('like')}
                                    className='btn relative btn-xs btn-primary ml-2 btn-outline'
                                >
                                    <span className='flex items-center gap-1'>
                                        <Like size='14' color={likePost ? '#00ff00' : 'grey'} />
                                        <p className=' text-[12px] '>
                                            {like?.length}
                                        </p>
                                    </span>
                                </button>
                                :
                                <button
                                    className='btn relative btn-xs btn-primary ml-2 btn-outline'
                                >
                                    <span className='flex items-center gap-1'>
                                        <Like size='14' color={likePost ? '#00ff00' : 'grey'} />
                                        <p className=' text-[12px] '>
                                            {like?.length}
                                        </p>
                                    </span>
                                    <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </button>

                        }
                        {/* ************FOR UNLIKE *************************** */}
                        {
                            !reactLoading ?
                                <button
                                    onClick={() => LikeUnlikeLovePostHandle('unlike')}
                                    className='btn btn-xs btn-primary ml-2 btn-outline'
                                >
                                    <span className='flex items-center gap-1'>
                                        <Like size='14' color={unLikePost ? '#ff2020' : 'grey'} style={{ transform: 'rotate(180deg)' }} />
                                        <p className=' text-[12px] '>
                                            {unlike?.length}
                                        </p>
                                    </span>
                                </button>
                                :
                                <button
                                    className='btn relative btn-xs btn-primary ml-2 btn-outline'
                                >
                                    <span className='flex items-center gap-1'>
                                        <Like size='14' color={unLikePost ? '#ff2020' : 'grey'} style={{ transform: 'rotate(180deg)' }} />
                                        <p className=' text-[12px] '>
                                            {unlike?.length}
                                        </p>
                                    </span>
                                    <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </button>

                        }
                        {/* ************FOR lOVE *************************** */}
                        {
                            !reactLoading ?
                                <button
                                    onClick={() => LikeUnlikeLovePostHandle('love')}
                                    className='btn btn-xs btn-primary ml-2 btn-outline'
                                >
                                    <span className='flex items-center gap-1'>
                                        <EmoticonLove color={lovePost ? '#ff00f2' : 'grey'} size='15' />
                                        <p className=' text-[12px] '>
                                            {love?.length}
                                        </p>
                                    </span>
                                </button>
                                :
                                <button
                                    className='btn relative btn-xs btn-primary ml-2 btn-outline '
                                >
                                    <span className='flex items-center gap-1'>
                                        <EmoticonLove color={lovePost ? '#ff00f2' : 'grey'} size='15' />
                                        <p className=' text-[12px] '>
                                            {love?.length}
                                        </p>
                                    </span>
                                    <p className='absolute border-gray-500 animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </button>

                        }

                    </div>
                    <div className='flex items-center'>
                        <button
                            title='Comment'
                            onClick={() => showCommentHandle(post_id)}
                            id={'showCommentButton' + post_id}
                            className='btn-primary btn-outline btn btn-xs  ml-2'
                        >
                            <span className='flex items-center gap-1'>
                                <Comment size='15' color='currentColor' />
                                <p className=' text-[12px] '>
                                    {TotalComment}
                                </p>
                            </span>
                        </button>
                        {/* <BookmarkPost post={post} refetch={refetch}/> */}
                    </div>
                    <div onMouseEnter={() => setShowShareOption(!showShareOption)} onMouseLeave={() => setShowShareOption(!showShareOption)} >
                        <button
                            className='btn btn-xs btn-primary ml-2 btn-outline w-8 h-5'
                        >
                            <Share size='18' />
                        </button>
                        {
                            showShareOption &&
                            <div className={styles.shareOption}>
                                <ShareOption sharePath={sharePath} id={post_id} />
                            </div>
                        }
                    </div>

                </div>
            </div>



        </div >
    );
};

export default LikeLoveFavorite;