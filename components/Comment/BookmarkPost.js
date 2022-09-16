import React, { useContext, useEffect, useId, useState } from 'react';
import { UserFullInfoProvider } from '../../pages/_app';
import { ArrowsCheck, BookmarkStar } from '../ReactRSIcon';
import { useRouter } from 'next/router';
import axios from 'axios';

const BookmarkPost = ({ post, refetch }) => {
    const { user, user_details } = useContext(UserFullInfoProvider);

    const router = useRouter()
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    // console.log(post_id?.split('-')?.[1])
    // console.log(post)
    const [checkBookmarkPost, setCheckBookmarkPost] = useState(null)
    const userID = user_details?.userID
    const post_id = post?.post_id
    const bookmarkUserID = post?.bookmarkUserID?.includes(userID)

    useEffect(() => {
        if (bookmarkUserID) {
            setCheckBookmarkPost(true)
        }
        else {
            setCheckBookmarkPost(false)
        }
    }, [bookmarkUserID, userID])
    const [bookmarkLoading, setBookmarkLoading] = useState(false);

    const [editTitle, setEditTitle] = useState(null)
    const bookmarkPostHandle = async (e, id) => {
        e.preventDefault()
        setBookmarkLoading(true)
        setEditTitle(null)
        if (user?.user) {
            const bookmarkPost = {
                post_id: id,
                userID: userID,
                bookmark: null,
                title: e.target.bookmark.value,
                date: new Date(),
            }
            checkBookmarkPost ? (bookmarkPost.bookmark = false) : (bookmarkPost.bookmark = true);
            setCheckBookmarkPost(!checkBookmarkPost);
            try {
                const { data } = await axios.put(`/api/bookmark/bookmark-post?email=${user_details?.email}&post_id=${post_id}`, bookmarkPost,
                    {
                        headers: {
                            access_token: sessionStorage.getItem('accessAutoG'),
                            token: localStorage.getItem('token')
                        }
                    });
                if (data?.message === 'success') {
                    refetch()
                    setBookmarkLoading(false)
                    if (data?.result?.acknowledged) {
                        refetch()
                        setBookmarkLoading(false)
                    }
                }
                else if (data?.message === 'error') {
                    if (bookmarkPost?.bookmark) {
                        setCheckBookmarkPost(null)
                    }
                    alert('something is wrong')
                    setBookmarkLoading(false)
                }
            }
            finally {
                setBookmarkLoading(false)

            }
            setBookmarkLoading(false)
        }
        else {
            navigate('/login?return_url=/' + router?.asPath)
        }

    }
    return (
        <>

            {
                editTitle &&
                <div className='absolute top-[-30px] left-[10%] bg-base-100'>
                    <form onSubmit={(e) => bookmarkPostHandle(e, post_id)} className='flex items-center gap-1'>
                        <input
                            type="text"
                            name='bookmark'
                            defaultValue={post?.post_title}
                            className="input input-sm input-primary pl-1 ml-1"
                        />
                        <button className='btn btn-sm btn-primary'>
                            <ArrowsCheck size='20' className='font-extrabold' />
                        </button>
                    </form>
                </div>
            }
            {bookmarkLoading ?
                <button
                    title='Comment'
                    id={'showCommentButton' + post_id}
                    className={(checkBookmarkPost ? 'bg-purple-600 text-white ' : 'btn-outline ') + ' relative btn-primary btn btn-xs  ml-2 h-5 w-8 '}


                >
                    <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                    </p>
                    <BookmarkStar size='18' />
                </button>
                :
                <button
                    title='Comment'
                    // onClick={() => bookmarkPostHandle(post_id)}
                    onClick={(e) => {
                        // check user and navigate login page
                        checkBookmarkPost ? bookmarkPostHandle(e, post_id) : (user?.user ? setEditTitle(post_id) : navigate('/login?return_url=/' + router?.asPath));
                    }}
                    id={'showCommentButton' + post_id}
                    className={(checkBookmarkPost ? 'bg-purple-600 text-white ' : 'btn-outline ') + ' btn-primary btn btn-xs  ml-2 h-5 w-8 '}
                >
                    <BookmarkStar size='18' />
                </button>
            }
        </>
    );
};

export default BookmarkPost;