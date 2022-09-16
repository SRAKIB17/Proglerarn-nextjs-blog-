import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import CommentForm from '../comment_replies/CommentForm';

const CommentHandler = ({ post_id, replyNow, refetch, setReplyNow }) => {
    const CommentTextareaRef = useRef();
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);

    const [errMsg, setErrMsg] = useState('')

    const [sendCommentLoading, setSendCommentLoading] = useState(null);

    // FOR GIF EMOJI
    const [selectEmoji, setSelectEmoji] = useState(null)
    const [showEmojiGifSection, setShowEmojiGifSection] = useState(null);


    //*********************************************************** */
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
            <div>
                <CommentForm
                    CommentTextareaRef={CommentTextareaRef}
                    errMsg={errMsg}
                    postCommentHandler={postCommentHandler}
                    post_id={post_id}
                    replyNow={replyNow}
                    selectEmoji={selectEmoji}
                    sendCommentLoading={sendCommentLoading}
                    setSelectEmoji={setSelectEmoji}
                    setShowEmojiGifSection={setShowEmojiGifSection}
                    showEmojiGifSection={showEmojiGifSection}
                    setReplyNow={setReplyNow}
                />
            </div>
        </div>
    );
};

export default CommentHandler;