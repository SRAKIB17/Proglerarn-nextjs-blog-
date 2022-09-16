import axios from 'axios';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router'
import LoadingFlowCircle from '../LoadingFlowCircle';
import PostMap from '../Post-NewsFeed/PostMap';
import NoticeLeft from './NoticeLeft';


const Notice = () => {
    const router = useRouter()
    const { cat, tag, page } = router.query;
    const navigate = (path) => {
        router.push(path);
        router.prefetch(path);
    }
    const [shows, setShowPosts] = useState(1)
    const [getPage, setGetPage] = useState(1)


    const { data, refetch, isLoading } = useQuery(['adminNoticeOneShow', cat, shows, tag, page], () => axios.get(`/api/post/admin-post?cat=${cat}&show=${shows * getPage}&tag=${tag}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))

    const adminPost = data?.data;

    return (

        <div className='grid grid-cols-12 gap-2'>
            <div className='hidden sm:block sm:col-span-3 lg:col-span-7 text-justify p-1 relative bg-base-100'>
                <div className='absolute h-[100vh] overflow-auto sm:w-[200px] md:w-full lg:pr-[2rem] sm:pr-[1rem]'>
                    {/* <NoticeLeft /> */}
                </div>
            </div>
            <div className='col-span-12 md:pr-4 sm:mr-3 md:mr-0 sm:col-start-5 sm:col-end-[-1] md:col-span-9 lg:col-span-5' id='noticeHome'>
                <h1 className='text-2xl font-extrabold font-sans text-center m-4 border-b-4 w-fit'>Notice</h1>
                {
                    isLoading || typeof adminPost?.map === 'function'
                        ?
                        adminPost?.map((post, index) => <PostMap key={post?._id} post={post} refetch={refetch} />)
                        :
                        ''
                }

                {
                    isLoading ||
                    <div className=" p-4 mt-2 text-center w-full bg-base-100">
                        <button
                            className='btn btn-primary lg:btn-sm btn-xs w-32 btn-outline mb-4'
                            onClick={() => navigate('/admin/')}
                        >
                            See All
                        </button>
                    </div>
                }
                {
                    (isLoading && adminPost?.length === 0) &&
                    <div className='flex flex-col justify-between pt-40 bg-base-100 h-[100vh] items-center'>
                        <div>
                            <LoadingFlowCircle />
                        </div>
                    </div>
                }
                {
                    (isLoading && adminPost?.length !== 0) && <div className='flex flex-col justify-between pt-4 bg-base-100 pb-4 items-center'>

                        <div>
                            <LoadingFlowCircle />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default Notice;