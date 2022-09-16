/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from 'react';
import classTagShortcutInput from '../hooks/hooks/useFindClassAttr';
import styles from './Comment.module.css'
import LikeLoveFavorite from './LikeLoveFavorite/LikeLoveFavorite';
import CommentList from './CommentList';
import { UserFullInfoProvider } from '../../pages/_app';
import axios from 'axios';
import EmojiGifIndex from './EmojiGif/EmojiGifIndex';

const Comment_textarea = ({ post, refetch, showCommentState, setShowComment }) => {
    // POST INFO AND USER INFO
    const { post_id } = post;
    const CommentTextareaRef = useRef();
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);


    // SET COMMENT BODY AND COUNT TOTAL COMMENT
    const commentBody = post?.comments;
    



    // AUTO HEIGHT TEXTAREA FORM
    const shortcutKeyboard = (e) => {
        // classTagShortcutInput(e, textareaRef)
    }
    const onchangeInput = (e) => {
        heightAutoHandle(e)
        classTagShortcutInput(e, CommentTextareaRef)
    }
    const heightAutoHandle = (e) => {
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < 200) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = 200 + 'px'
        }
    }
    //FOR SHOW COMMENT TOGGLE AND AUTO HEIGHT INCREASE

    const [showReactUserState, setShowReactUser] = useState(null);
    const showCommentHandle = (id) => {
        setShowComment(true)
        setShowReactUser(null)
        try {

            const showComment = document.getElementById('commentShow' + id)
            const commentForm = document.getElementById('commentForm' + id)
            const showCommentButton = document.getElementById('showCommentButton' + id)
            //---------------------------------for like comment hide =============-----------------------
            const showLikeUnlikeUser = document.getElementById('showLikeUnlikeUser' + id);
            showLikeUnlikeUser.style.height = '0px'
            showLikeUnlikeUser.style.overflow = 'hidden'
            showLikeUnlikeUser.style.borderTopWidth = '0px'
            //----------------------------------------------------------------------------------
            if (showComment.offsetHeight <= 2) {
                commentForm.style.height = '100%'
                try {
                    commentForm.childNodes[0].childNodes[0].style.borderTopWidth = '1px'
                }
                catch {

                }
                showComment.style.height = '500px'
                // document.getElementById('commentTextArea' + id).focus()
                showCommentButton.className = 'btn-primary btn btn-xs  ml-2 '
            }
            else {
                showComment.style.height = '0px'
                commentForm.style.height = '0px'
                showCommentButton.className = ' btn-outline btn btn-xs btn-primary ml-2 '
                commentForm.childNodes[0].childNodes[0].style.borderTopWidth = '0px'
            }
        }
        catch {

        }
    }

    // FOR REPLY A COMMENT A AUTO SHOW NAME
    const [replyNow, setReplyNow] = useState(null)
    const replySetHandle = (targetComment, id) => {
        try {
            document.getElementById('commentTextArea' + id).focus()
        }
        catch {

        }
        setReplyNow(targetComment)
    }

    const [errMsg, setErrMsg] = useState('')
    const [sendCommentLoading, setSendCommentLoading] = useState(null);


    // FOR GIF EMOJI
    const [selectEmoji, setSelectEmoji] = useState(null)
    const [showEmojiGifSection, setShowEmojiGifSection] = useState(null);

    const postCommentHandler = async (e) => {
        e.preventDefault()
        setSendCommentLoading(true);
        if (replyNow?.comment_id) {
            const replyBody = {
                post_id: post_id,
                userID: user_details?.userID,
                time: new Date(),
                comment_id: replyNow?.comment_id,
                reply: CommentTextareaRef.current.value,
                emoji: selectEmoji
            }

            const { data } = await axios.put(`/api/post/comments-reply?email=${user_details?.email}`, replyBody,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                }
            );

            if (data?.message === 'success') {
                refetch()
                setSelectEmoji(null)
                setShowEmojiGifSection(null)
                setErrMsg(<p className='text-green-600'>Success</p>)
                if (data?.result?.acknowledged) {
                    refetch()
                    setShowEmojiGifSection(null)
                    setSelectEmoji(null)
                    e.target.reset();
                    setReplyNow(null)
                }
            }
            else if (data?.message === 'error') {
                setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            }
        }

        // **************************************FOR COMMENT ******************************
        else {
            const comment = {
                post_id: post_id,
                userID: user_details?.userID,
                comment: CommentTextareaRef.current.value,
                time: new Date(),
                comment_id: 2,
                replies: [],
                emoji: selectEmoji
            }
            // FETCH POST AXIOS METHOD
            const { data } = await axios.post(`/api/post/post-comments?email=${user_details?.email}`, comment,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                }
            );

            if (data?.message === 'success') {
                refetch()
                setSelectEmoji(null)
                setShowEmojiGifSection(null)
                setErrMsg(<p className='text-green-600'>Success</p>)
                if (data?.result?.acknowledged) {
                    refetch()
                    setSelectEmoji(null)
                    setShowEmojiGifSection(null)
                    e.target.reset()
                }
            }
            else if (data?.message === 'error') {
                refetch()
                setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            }
        }

        // for loading 
        setSendCommentLoading(null)
    }


    return (
        <div>
            <div className='mb-1'>
                {/* -------------------------------------like unlike and show user who like this post---------------------------- */}
                <LikeLoveFavorite props={{ showCommentHandle, post, refetch, setShowReactUser, setShowComment, showReactUserState }} />
            </div>

            {/* =--------------------------------------------for comment list and reply component---------------------------- */}
            <div id={'commentShow' + post_id} className={styles.showComment + ' overflow-auto hideScrollBar'}>
                <div className='ml-2 overflow-auto '>
                    {
                        // FOR ALL COMMENT GET AND SEND LIKE PROPS COMMENT COMPONENT
                        (user?.user && showCommentState) &&
                        <div className='border-l-[3px] rounded-bl-3xl p-1'>
                            {
                                commentBody?.map(comment => <CommentList key={comment?.comment_id} post_id={post_id} replySetHandle={replySetHandle} comment={comment} refetch={refetch} />)
                            }
                        </div>
                    }
                    <div className='pl-1'>
                        {/* {
                            (!user?.user && showCommentState) &&
                            <Login />
                            // <GuestCommentLikeLogin />
                        } */}
                    </div>
                </div>
            </div>

            {/* -----------------------------for comment form and comment auto hight----------------------------- */}
            <div id={'commentForm' + post_id} className={styles.showComment}>

                {
                    user?.user &&
                    <form className=' pt-4 mb-4' onSubmit={postCommentHandler} >
                        {/****************** for reply section when a user reply other this name show display ************************ */}


                        {/* *********FOR GIF EMOJI************* */}
                        <div>
                            <EmojiGifIndex props={{ selectEmoji, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection }} />
                            <div className='flex items-center gap-2'>
                                <div>
                                    {
                                        replyNow &&
                                        <div className='mt-3 flex items-center mb-2 pl-3 pr-3 text-secondary bg-gray-100 w-fit rounded-3xl'>
                                            <h1 className='text-xs'>@{replyNow?.name}</h1>
                                            <div>
                                                <a href="#" onClick={() => setReplyNow(null)} className=' text-xl ml-2 hover:text-[grey]'>&times;</a>
                                            </div>
                                        </div>
                                    }
                                </div>
                               
                            </div>
                        </div>
                        <p className='text-red-600 text-xs p-1'>
                            {
                                errMsg
                            }
                        </p>

                        <div className="relative flex items-end pt-1 pl-3 mt-1 ">
                            <textarea ref={CommentTextareaRef}
                                id={'commentTextArea' + post_id}
                                className='input input-success w-full font-mono'
                                name="commentBody"
                                onBlur={onchangeInput}
                                onKeyUp={(e) => shortcutKeyboard(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={heightAutoHandle}
                                onPaste={heightAutoHandle}
                                onDrop={heightAutoHandle}
                                onKeyDown={heightAutoHandle}
                                required={selectEmoji ? false : true}
                            >
                            </textarea>
                            <div className='align-bottom left-[50%] bottom-0'>
                                <button className='btn btn-sm btn-primary ml-2 text-xs w-fit text-white'>
                                    {
                                        sendCommentLoading ||
                                        (replyNow?.comment_id ? "Reply" : "Comment")
                                    }
                                    {
                                        sendCommentLoading &&
                                        <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                        </p>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                }

            </div>
        </div>
    );
};

export default Comment_textarea;
