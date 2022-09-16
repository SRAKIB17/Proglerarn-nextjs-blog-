/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';

const returnLikeLoveCommentHook = (post) => {
    const { post_id } = post
    const postReact = post?.react;


    const allReact = postReact?.filter((like, index, arr) => like.rating != '')?.length
    const [userList, setUserList] = useState([])

    useEffect(() => {
        setUserList(postReact?.filter((like, index, arr) => like.rating != ''));
    }, [postReact])
    const like = postReact?.filter((like, index, arr) => like.rating === 'like');
    const unlike = postReact?.filter((like, index, arr) => like.rating === 'unlike');
    const love = postReact?.filter((like, index, arr) => like.rating === 'love');

    // SET COMMENT BODY AND COUNT TOTAL COMMENT
    const commentBody = post?.comments;
    //COUNT TOTAL REPLIES
    const totalReplies = eval(commentBody?.map(reply => (reply?.replies?.length))?.join('+'))
    const TotalComment = post?.comments?.length + totalReplies || 0;
    return { like, unlike, love, TotalComment, allReact, userList, setUserList }
};

export default returnLikeLoveCommentHook;