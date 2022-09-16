/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../pages/_app';
import LoadingSpin from '../../LoadingSpin';
import { Camera, FacebookSquare, GithubSquare, LinkedinSquare, Writing } from '../../ReactRSIcon';
import Message_Filled from '../Header/SVG/Message_Filled';
import PageDetailsSEO from '../hooks/PageDetailsSEO';
import AboutUser from './AboutUser';
import PostSvg from './SvgComponent/PostSvg';
import Twitter_shadow_social_tweet_media_square_blue from './SvgComponent/Twitter_shadow_social_tweet_media_square_blue';
import Web from './SvgComponent/Web';
import Youtube from './SvgComponent/Youtube';

const ProfileInfoSection = ({ user_id, setShowPage = () => { }, user = false }) => {

    const userInfo = useQuery(['ProfileUser', user_id], () => axios.get(`/api/public_user_details/${user_id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const user_info = userInfo?.data?.data?.user_details;
    const isLoadingAbout = userInfo?.isLoading;
    const router = useRouter()

    const { user_details, isLoading: userIsLoading, isAdmin } = useContext(UserFullInfoProvider);
    const { title } = PageDetailsSEO()
    return (
        <div className='p-4'>
            <Head>
                <title>
                    {
                        title
                    }
                    &nbsp;||&nbsp;
                    {
                        userInfo?.name || "User"
                    }

                </title>
            </Head>
            <div>
                <div>
                    {/* Profile Cover */}
                    <div>
                        <figure >
                            <img src={user_info?.cover ? user_info?.cover : '/cover.png'}
                                alt=""
                                className='rounded-md sm:h-48 w-full h-40 md:h-36 2xl:h-44 shadow-md' />
                        </figure>
                    </div>
                    <div className='relative  xl:h-20 w-24 sm:h-16 h-10'>
                        <div className='absolute top-[-60px] left-[36px] 2xl:top-[-64px] '>
                            <div className="avatar ">
                                <div
                                    className="w-24 sm:w-28 rounded-full md:w-24 xl:w-32 ring ring-gray-300 ring-offset-base-100 "
                                >
                                    <img src={user_info?.profile ? user_info?.profile : '/maleAvatar.png'} alt="profile" className='w-full h-auto bg-base-100' />
                                </div>
                            </div>
                            {
                                user &&
                                <div className='relative right-0 '>
                                    <button className='absolute top-[-55px] right-[-10px] 2xl:top-[-64px] bg-gray-500 rounded-full w-6 h-6 text-white pl-1 p-[2px]  ring-primary '
                                        onClick={() => setShowPage('uploadPhoto')}
                                    >
                                        <Camera />
                                    </button>
                                </div>
                            }
                        </div>

                        {/* <div className="avatar offline">
                            <div className="w-24 rounded-full">
                                <img src="https://placeimg.com/192/192/people" />
                            </div>
                        </div> */}
                    </div>
                    {
                        isLoadingAbout ?
                            <LoadingSpin />
                            :
                            <div className='ml-2'>
                                <div>
                                    <h1 className='text-xl mb-6 font-extralight ml-4 mt-4'>{user_info?.name}</h1>

                                </div>
                                {
                                    user &&
                                    <div className='flex items-center gap-2 m-2'>
                                        {
                                            <>
                                                <button
                                                    onClick={() => { setShowPage('editProfile') }}
                                                    className='btn btn-ghost'

                                                >
                                                    <Writing size='30' />
                                                </button>
                                                <button
                                                    onClick={() => { setShowPage('post') }}
                                                    className='btn btn-ghost'
                                                >
                                                    <PostSvg size='28' />
                                                </button>
                                            </>
                                        }
                                    </div>
                                }
                                {/* SOCIAL LINK */}
                                {
                                    user_details?.userID !== user_id &&
                                    <div>
                                        <button
                                            onClick={() => router.replace('/inbox/' + user_id)}
                                            className='flex items-center gap-2 btn btn-primary btn-sm text-white  '
                                        >
                                            <Message_Filled size='20' color='currentColor' />
                                            <span>
                                                Send Message
                                            </span>
                                        </button>
                                    </div>
                                }
                                <div className='flex gap-2 items-center m-4'>
                                    {
                                        Boolean(user_info?.facebook) &&
                                        <a href={user_info?.facebook} target="_blank" rel="noreferrer">
                                            <FacebookSquare color='#0674E1' size='16' className="rounded-sm" />
                                        </a>
                                    }

                                    {/* **********LINKEDIN******* */}
                                    {
                                        Boolean(user_info?.linkedin) &&
                                        <a href={user_info?.linkedin} target="_blank" rel="noreferrer">
                                            <LinkedinSquare color='#0674E1' size='16' className="rounded-sm" />
                                        </a>
                                    }

                                    {/* **********github******* */}
                                    {
                                        Boolean(user_info?.github) &&
                                        <a href={user_info?.github} target="_blank" rel="noreferrer">
                                            <GithubSquare color='currentColor' size='16' />
                                        </a>
                                    }



                                    {/* **********twitter******* */}
                                    {
                                        Boolean(user_info?.twitter) &&
                                        <a href={user_info?.twitter} target="_blank" rel="noreferrer">
                                            <Twitter_shadow_social_tweet_media_square_blue size='16' className="rounded-sm" />
                                        </a>
                                    }


                                    {/* **********youtube******* */}
                                    {
                                        Boolean(user_info?.youtube) &&
                                        <a href={user_info?.youtube} target="_blank" rel="noreferrer">
                                            <Youtube size='21' />
                                        </a>
                                    }

                                    {/* **********portfolio******* */}
                                    {
                                        Boolean(user_info?.portfolio) &&
                                        <a href={user_info?.portfolio} target="_blank" rel="noreferrer">
                                            <Web size='17' color='gray' />
                                        </a>
                                    }
                                    {/* **********instagram******* */}
                                    {
                                        Boolean(user_info?.instagram) &&
                                        <a href={user_info?.instagram} target="_blank" rel="noreferrer">
                                            <img src="/svg/Instagram.svg" alt="" className='w-4 h-4' />
                                        </a>
                                    }


                                </div>

                                <div>
                                    <AboutUser user_details={user_info} />
                                </div>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default ProfileInfoSection;