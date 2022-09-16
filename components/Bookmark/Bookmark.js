/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios'
import { useQuery } from 'react-query';
import { useRouter } from 'next/router'
import LoadingSpin from '../../components/LoadingSpin';
import { UserFullInfoProvider } from '../../pages/_app';
import BookmarkView from './BookmarkView';

const Bookmark = () => {
    const router = useRouter()
    const { user, user_details } = useContext(UserFullInfoProvider);

    const userID = user_details?.userID

    const [shows, setShowPosts] = useState(10)
    const [getPage, setGetPage] = useState(1)

    const pageHandle = () => {
        router.query.page = getPage + 1;
        setGetPage(getPage + 1)
        router.push(router)
        router.prefetch(router);
    }
    const { data, isLoading, refetch } = useQuery(['getBookmarkUser', userID], () => axios.get(`/api/bookmark/get-bookmark-db-user?email=${user_details?.email}&user_id=${userID}`,
        {
            headers: {
                access_token: sessionStorage.getItem('accessAutoG'),
                token: localStorage.getItem('token')
            }
        }));
    const bookmark = data?.data?.result || []
    const [getBookmark, setPost] = useState([]);
    useEffect(() => {
        if (bookmark?.length > 0) {
            setPost(bookmark)
        }
    }, [bookmark])

    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }

    const get = [

    ]
    return (
        <div className='h-[100vh]'>
            <div className='bg-base-100 h-full w-full lg:ml-16 p-2 mr-2 p-4'>
                {
                    isLoading ?
                        <LoadingSpin />
                        :
                        <ul className=" p-0 flex-col gap-1">
                            {
                                getBookmark?.map((bookmark, index) =>
                                    <BookmarkView key={index} bookmark={bookmark} refetch={refetch} />
                                )
                            }
                        </ul>

                }
                {
                    getBookmark?.length == 0 &&
                    <div>
                        <p className='font-bold text-gray-500 text-2xl link'>
                            No bookmarks yet
                        </p>
                    </div>
                }
            </div>
            <div className=" p-4 mt-2 text-center w-full bg-base-100">
                <button
                    className='btn btn-primary lg:btn-sm btn-xs w-32 btn-outline mb-4'
                    onClick={() => pageHandle()}
                >
                    Next
                </button>
            </div>
        </div>
    );
};




export default Bookmark;