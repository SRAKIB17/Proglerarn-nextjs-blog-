import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import PageTitle from '../../hooks/PageTitle';
import LoadingSpin from '../../LoadingSpin';
import Pagination from '../hooks/Pagination';
import PostBody from '../post/PostBody';
import Sad from '../SvgComponent/Sad';

const UserPost = ({ user_id }) => {

    const router = useRouter()
    const { cat, tag, page } = router.query;
    const [shows, setShowPosts] = useState(4)
    const [getPage, setGetPage] = useState(1);

    useEffect(() => {
        if (page) {
            setGetPage(eval(page));
        }
    }, [page])

    // const { data, refetch, isLoading } = useQuery(['userPost_id', cpage], () => axios.get(`/api/test?cat=${cat}&show=${shows}`))

    const { data, refetch, isLoading } = useQuery(['userPostSpecific', user_id, cat, shows, tag, getPage, page], () => axios.get(`/api/post/user-post?cat=${cat}&show=${shows}&tag=${tag}&page=${getPage}&userID=${user_id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))

    // const posts = data?.data?.result
    const posts = data?.data?.posts || [];

    const count = data?.data?.count;

    const [getPost, setPost] = useState([]);
    useEffect(() => {
        if (posts?.length > 0) {
            setPost(posts)
        }
    }, [posts])
    const { title } = PageTitle()

    const [lastPage, setLastPage] = useState(4)
    useEffect(() => {
        const divided = Math.ceil(count / shows);
        setLastPage(divided);
    }, [count, shows])

    const pageHandle = (jump) => {
        router.query.page = jump;
        router.push(router)
        setGetPage(eval(jump))
        router.push(router)
        router.prefetch(router);
    }

    return (
        <div>
            <div className='flex flex-col gap-4'>

                {
                    (isLoading && posts?.length > 0) ?
                        <div>
                            <LoadingSpin />
                        </div>
                        :
                        <>
                            {
                                getPost?.map((post, index) => <PostBody post={post} key={index} refetch={refetch}/>)
                            }
                            <div className={((isLoading && getPost?.length == 0) ? " " : ' shadow-md  ') + ' rounded-md     p-4'}>

                                {/* ********** NOT FOUND ************ */}
                                {
                                    !isLoading && getPost?.length == 0 &&
                                    <div className='text-2xl flex justify-center items-center text-gray-400 h-80'>
                                        <div className='flex items-center gap-4'>
                                            <Sad />
                                            <span>
                                                No post found
                                            </span>
                                        </div>
                                    </div>
                                }
                                {/* *******************PAGINATION************ */}
                                {
                                    isLoading ?
                                        <div className='mt-10'>
                                            <LoadingSpin />
                                        </div>
                                        :
                                        getPost?.length == 0 ||
                                        <Pagination
                                            lastPage={lastPage}
                                            page={getPage}
                                            pageHandle={pageHandle}
                                        />
                                }
                            </div>
                        </>
                }

            </div>
        </div>
    );
};

export default UserPost;