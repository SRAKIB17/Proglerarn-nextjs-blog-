/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import { useQuery } from 'react-query';
import axios from 'axios';
import LoadingFlowCircle from '../../components/LoadingFlowCircle';
import timeSince from '../../components/Post-NewsFeed/TimeSince';
import { Announcement, ArrowsRight, Camera, Line } from '../../components/ReactRSIcon';
import Head from 'next/head';
import PageTitle from '../../components/hooks/PageTitle';
import Pagination from '../../components/BLOG/hooks/Pagination';
import LoadingSpin from '../../components/LoadingSpin';
import Sad from '../../components/BLOG/SvgComponent/Sad';
import PostBody from '../../components/BLOG/post/PostBody';

const Search = () => {

    const router = useRouter()
    const { cat, tag, page, query } = router.query;
    const [shows, setShowPosts] = useState(4)
    const [getPage, setGetPage] = useState(1);

    useEffect(() => {
        if (page) {
            setGetPage(eval(page));
        }
    }, [page])
    // const { data, refetch, isLoading } = useQuery(['userPost_id', cpage], () => axios.get(`/api/test?cat=${cat}&show=${shows}`))

    const { data, refetch, isLoading } = useQuery(['SearchPost', cat, shows, tag, getPage, page, query], () => axios.get(`/api/post/search?cat=${cat}&show=${shows}&tag=${tag}&page=${getPage}&query=${query}`,
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


    const { title } = PageTitle()

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-12  lg:col-span-8  2xl:col-span-8 mb-20'>
                <div className='flex flex-col gap-4 min-h-screen'>

                    {
                        (isLoading && posts?.length > 0) ?
                            <div>
                                <LoadingSpin />
                            </div>
                            :
                            <>
                                {
                                    getPost?.map((post, index) => <PostBody post={post} key={index} refetch={refetch} />)
                                }
                                <div className={((isLoading && getPost?.length == 0) ? " " : ' shadowEachPost ') + ' rounded-sm     p-4'}>

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
            <div className='hidden ml-2 pl-4 shadow-md lg:block col-span-12 lg:col-span-4  2xl:col-span-4 text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quidem neque numquam eaque magnam cupiditate labore corporis quo totam, temporibus quibusdam eligendi cum possimus laudantium illum laborum. Est, aperiam sed.
                Provident itaque repellat quas reprehenderit quae est doloribus optio expedita, vitae, odio eos error, deserunt at cumque explicabo. Consequuntur vel quas repudiandae dignissimos nostrum officiis laboriosam debitis eos labore. Aspernatur?
                Quasi eum ipsum ut earum totam ullam, quisquam consectetur illo. Pariatur amet commodi eos fuga porro ipsa tenetur consequatur dignissimos, distinctio id debitis, optio explicabo corporis voluptates provident saepe accusamus.
                Fuga reprehenderit velit aliquid placeat commodi sed aspernatur necessitatibus ducimus error quibusdam quis quia temporibus cumque natus dolorem quod quam laudantium amet maiores, sapiente neque laboriosam! Delectus modi voluptatem repellendus!
                Saepe nulla iure libero pariatur in eligendi quam distinctio, eum eos quisquam! Vero similique suscipit totam praesentium beatae aliquam fugit quos dolorum, provident illum quas voluptates, nihil dignissimos accusantium quae?
                Mollitia alias asperiores error sequi quas commodi ut non velit esse eaque vitae vel quasi, blanditiis repudiandae omnis fugiat? Eligendi quia quae sit labore laboriosam? Veniam error quae explicabo molestiae!
                Voluptas iure facilis a et. Cumque vitae exercitationem excepturi eum eligendi eos, officia repellendus quibusdam officiis optio est cupiditate inventore placeat sequi. Voluptatum repudiandae vel nostrum dolor dolorum! Animi, molestias!
                Dicta quo numquam, harum voluptate adipisci illum repellat quae, id necessitatibus itaque sequi ipsa exercitationem eligendi soluta culpa aspernatur incidunt. Recusandae, maiores. Recusandae asperiores suscipit itaque reprehenderit mollitia quasi et?
                Ea officiis reiciendis, nulla nobis unde iure aliquam nam deleniti neque quibusdam saepe at ut ratione. Dolor, vel non repellat consequuntur ipsum perferendis, harum nostrum earum maiores iste, ea velit?
                Explicabo aut quod dignissimos necessitatibus harum corrupti odit praesentium nihil quam deserunt sunt inventore reprehenderit eos adipisci quaerat laboriosam asperiores neque earum quis rem, unde eum? Aliquid perspiciatis sit aliquam!
            </div>
        </div>
    );
};

export default Search;

