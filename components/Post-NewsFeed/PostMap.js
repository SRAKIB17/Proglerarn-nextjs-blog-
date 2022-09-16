/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useId, useState } from 'react';
import Comment_textarea from '../Comment/Comment_textarea';
import { useRouter, withRouter } from 'next/router';
import styles from './PostMap.module.css'
import EditDeleteComponentMenu from './EditPostByUserAndAdmin/EditDeleteComponentMenu';
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import { useQuery } from 'react-query'
import axios from 'axios';
import TextPost from './TextPost';
import VideoPost from './VideoPost'
import { Announcement, ArrowsRight, Line } from '../ReactRSIcon';
import AdsStory from '../Ads/AdsStory';
import timeSince from './TimeSince';
import WarningProfile from '../hooks/WarningProfile';
const PostMap = ({ post, refetch }) => {
    const { _id, category, image, postBodyCss, postBodyJs, postBody, postRefMode, post_id, post_title, short_description, thumbnail, time, userID } = post

    const [showCommentState, setShowComment] = useState(null);


    const getTimeSince = timeSince(time)

    const router = useRouter();
    const path = router?.pathname?.split('/')
    const pathname = path[path?.length - 1];
    const pathCheck = pathname == '[post_id]';
    const navigate = (path) => {

        router.push(path)
        router.prefetch(path)
        refetch()
    }
    const profileNavigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }


    useEffect(() => {
        window.onresize = (e) => {
            const iframes = document.getElementsByTagName('iframe')
            for (const iframe of iframes) {
                try {
                    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
                }
                catch {

                }
            }
        }
    }, []);


    const userInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const user_details = userInfo?.data?.data?.user_details;
    console.log(user_details)
    return (
        <div>
            <div className=" card w-full bg-base-100 shadow-md md:rounded-md mt-2 rounded-none" id={'postMap' + post_id}>
                {/* -------------------------------------- for user configure --------------------------------------------- */}

                <div className='flex justify-between  border-b-[1px] m-3 items-center'>

                    <div>
                        <div>
                            <h1 className='text-xl font-extrabold text-gray-600'>
                                <a
                                    href={'/story/' + post_id}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {post_title}
                                </a>
                                {
                                    post?.postBy === 'admin' &&
                                    <Announcement size='13' className="badge h-[14px] p-0 ml-1 text-white badge-secondary pl-[2px] pr-[2px] text-[10px] font-extralight" />
                                }
                            </h1>

                        </div>
                        {/* ***************PROFILE NAME ******** */}
                        <div className='flex flex-col gap-1'>
                            <span className='flex items-center text-2xs'>
                                <button
                                    className='link-primary link-hover '
                                    onClick={() => {
                                        if (pathCheck) {
                                            navigate(`/story/?cat=${category}`)
                                        }
                                        else {
                                            navigate(`?cat=${category}`)
                                        }

                                    }}>
                                    {
                                        category
                                    }
                                </button>
                                {/* ***************FOR TAG SERIAL************ */}
                                <ArrowsRight size='14' className='font-extrabold' />
                                <span className='flex flex-wrap text-2xs'>
                                    {
                                        (typeof post?.tags?.split === 'function') &&

                                        post?.tags?.split(',')?.map((tag, index) =>
                                            <>
                                                {
                                                    index > 0 && <Line />
                                                }
                                                <button
                                                    key={index + tag + category}
                                                    className='link-primary link-hover '
                                                    onClick={() => {
                                                        if (pathCheck) {
                                                            navigate(`/story/?cat=${category}&tag=${tag}`)

                                                        }
                                                        else {
                                                            navigate(`?cat=${category}&tag=${tag}`)

                                                        }
                                                    }}
                                                >
                                                    {
                                                        tag
                                                    }
                                                </button>
                                            </>
                                        )
                                    }
                                </span>
                            </span>
                            <span className='flex gap-1'>
                                <p
                                    onClick={() => profileNavigate(`/profile/${userID}`)}
                                    className="flex text-[10px] mb-[2px] items-start gap-[1px] cursor-pointer  "
                                >

                                    <span className='link-primary'>
                                        by 
                                        {" "}
                                        {
                                            ( user_details?.name) || 'User'
                                        }
                                    </span>
                                    <WarningProfile user_details={user_details} size='12' />
                                </p>
                                <span className='text-[10px] font-extralight text-gray-500'>
                                    Last Updated : {getTimeSince}
                                </span>
                            </span>
                        </div>

                    </div>


                    {
                        <EditDeleteComponentMenu post={post} refetch={refetch} />
                    }
                </div>
                {/* --------------------------------------------------------------------------------------------------- */}
                <div className='card-body pb-2 pt-3 p-5' id={'postBodyCode' + post_id}>


                    {
                        postRefMode === 'video' &&
                        <>
                            <VideoPost
                                setShowComment={setShowComment}
                                showCommentState={showCommentState}
                                postBody={postBody} post_id={post_id}
                                short_description={short_description}
                                key={post_id} />
                        </>
                    }

                    {
                        postRefMode === 'text' &&
                        <>
                            <TextPost
                                postBody={postBody}
                                postBodyJs={postBodyJs}
                                postBodyCss={postBodyCss}
                                post_id={post_id}
                                postRefMode={postRefMode}
                                short_description={short_description}
                                key={post_id}
                                setShowComment={setShowComment}
                                showCommentState={showCommentState}
                                thumbnail={thumbnail}
                            />
                        </>

                    }

                    <div>
                        <AdsStory />
                    </div>
                    <div className='relative bg-base-100'>
                        <Comment_textarea post={post} refetch={refetch} setShowComment={setShowComment} showCommentState={showCommentState} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostMap;

