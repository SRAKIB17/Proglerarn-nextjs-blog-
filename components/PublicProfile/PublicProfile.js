/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

import { useQuery } from 'react-query';
import axios from 'axios';
import About from './About';
import Post from '../Post-NewsFeed/Post';
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import { useRouter } from 'next/router';
import PostMap from '../Post-NewsFeed/PostMap';
import LoadingFlowCircle from '../LoadingFlowCircle';
import Head from 'next/head';
import PageTitle from '../hooks/PageTitle';
import { WarningTriangle } from '../ReactRSIcon';
import WarningProfile from '../hooks/WarningProfile';

const PublicProfile = () => {
    const router = useRouter()
    const user_id = router?.query?.user_id;
    const userInfo = useQuery(['public_profile', user_id], () => axios.get(`/api/public_user_details/${user_id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const user_details = userInfo?.data?.data?.user_details;
    const isLoadingAbout = userInfo?.isLoading;


    const { cat, tag, page } = router.query;
    const [shows, setShowPosts] = useState(10)
    const [getPage, setGetPage] = useState(1)

    const pageHandle = () => {
        router.query.page = getPage + 1;
        setGetPage(getPage + 1)
        router.push(router)
        router.prefetch(router);
    }
    // const { data, refetch, isLoading } = useQuery(['userPost_id', cpage], () => axios.get(`/api/test?cat=${cat}&show=${shows}`))

    const { data, refetch, isLoading } = useQuery(['userPostSpecificPublic', cat, shows, tag, page], () => axios.get(`/api/post/user-post?userID=${user_details?.userID}&cat=${cat}&show=${shows * getPage}&tag=${tag}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))

    // const posts = data?.data?.result
    const posts = data?.data || []
    const [getPost, setPost] = useState([]);
    useEffect(() => {
        if (posts?.length > 0) {
            setPost(posts)
        }
    }, [posts])

    const { title } = PageTitle()
    return (
        <div className='lg:ml-[64px] lg:mr-[64px]'>
            <Head>
                <title>
                    {title} 🡂 {user_details?.name}
                    {
                        cat && " 🡂 " + cat
                    }
                    {
                        (cat && tag) &&
                        " 🡂 " + cat + " 🡂 " + tag
                    }
                </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div id='stickyTop' className='bg-base-100 rounded-lg m-2 pb-4 md:pb-6'>
                <div className=' rounded-lg relative bg-base-100'>
                    {/* ------------------------------for cover photo ------------------------------------ */}
                    <label
                        htmlFor="openModalUploadProfilePicture"
                        title='Upload cover photo'
                    >
                        <div className='cursor-pointer relative'>
                            {/* //****************************FOR COVER PHOTO SET CONDITION******************************  */}
                            {
                                (user_details?.cover == '' || !user_details?.cover) ?
                                    <img
                                        src="https://images.unsplash.com/photo-1655465184678-548fb85fa74a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80"
                                        alt=""
                                        className='h-[200px] w-full sm:h-[300px] rounded-t-lg'
                                    />
                                    :
                                    <img
                                        src={user_details?.cover}
                                        alt=''
                                        className='h-[200px] w-full sm:h-[300px] rounded-t-lg'
                                    />
                            }

                        </div>
                    </label>

                    {/* ------------------------------for profile photo ------------------------------------ */}

                    <div
                        className='absolute bottom-[-48px] sm:bottom-[-52px] left-[50%] ml-[-55px] md:left-[100px] md:bottom-[-120px]'
                    >   <label
                        htmlFor="openModalUploadProfilePicture"
                        title='Upload cover photo'
                    >
                            <div
                                className="avatar"
                                title='Upload Profile picture'
                            >
                                <div className="w-28 sm:w-32 md:w-36 rounded-full ring ring-inherit ring-offset-base-100 ring-offset-1" >
                                    {
                                        user_details?.profile == '' ?
                                            <img
                                                src={user_details?.gender == 'Female' ? femaleAvatar.src : maleAvatar?.src}
                                                alt=''
                                                className='w-full bg-base-100'
                                            />
                                            :
                                            <img
                                                src={user_details?.profile}
                                                alt=''
                                            />
                                    }
                                </div>
                            </div>
                        </label>
                    </div>
                    {/* ---------------------------------------------------------------------------------------- */}
                </div>
                {/* for profile info */}
                <div className='relative md:mt-[10px] md:left-[250px] md:border-b-2 md:mr-[260px] md:pb-[10px]'>
                    <div className='flex flex-col mt-[60px] md:mt-[20px]  items-center md:justify-between md:flex-row'>
                        <div className='text-center'>
                            <div className='flex items-center gap-[2px]'>
                                <h1 className='text-2xl sm:text-3xl'>
                                    {user_details?.name}
                                </h1>
                                <WarningProfile user_details={user_details} size="16" />

                            </div>
                            <h1 className='text-orange-500'>Total Point: 300</h1>
                        </div>
                    </div>
                </div>
            </div>





            {/* about me section  */}
            <div className='grid grid-cols-12 gap-5 text-justify'>
                <div className='col-span-12 md:col-span-5 sm:border-r-2 md:p-2'>
                    <div className='bg-base-100 p-4 md:p-2 rounded-t-lg'>
                        <About props={{ isLoadingAbout, user_details }} />
                    </div>
                </div>

                <div className='col-span-12 md:col-span-7 sticky' id='post'>
                    {
                        // isLoading || typeof getPost?.map === 'function'
                        // ?
                        getPost?.map((post, index) => <PostMap key={post?._id} post={post} refetch={refetch} />)
                        // :
                        // ''
                    }
                    {
                        (getPost?.length === 0 && !isLoading) &&
                        <div className='text-center h-full bg-base-100 text-xl font-extrabold text-gray-500 pt-10'>
                            No post found. please reload
                        </div>
                    }
                    {
                        isLoading ||
                        <div className=" p-4 mt-2 text-center w-full bg-base-100">
                            <button
                                className='btn btn-primary lg:btn-sm btn-xs w-32 btn-outline mb-4'
                                onClick={() => pageHandle()}
                            >
                                Next
                            </button>
                        </div>
                    }
                    {
                        (isLoading && getPost.length === 0) &&
                        <div className='flex flex-col justify-between pt-40 bg-base-100 h-[100vh] items-center'>
                            <div>
                                <LoadingFlowCircle />
                            </div>
                        </div>
                    }
                    {
                        (isLoading && getPost.length !== 0) && <div className='flex flex-col justify-between pt-4 bg-base-100 pb-4 items-center'>

                            <div>
                                <LoadingFlowCircle />
                            </div>
                        </div>
                    }
                </div>
            </div>


        </div>
    );
};


export default PublicProfile;