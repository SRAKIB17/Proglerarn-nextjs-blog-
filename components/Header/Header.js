/* eslint-disable @next/next/no-img-element */
import { useRouter, withRouter } from 'next/router';
import Link from 'next/dist/client/link';
import React, { useContext, useEffect } from 'react';
import ContextMenu from './ContextMenu';
import SideLeftBar from './SideLeftBar';
import { Home, MenuBarCircle, NewsFeed, Video } from '../ReactRSIcon/index'
import Head from 'next/head';
import SearchForm from './SearchForm';
import ProfilePicture from './ProfilePicture';
import DownloadApk from './DownloadApk';
import useCommonWindowResizeHeaderComponent from './CommonWindowResizeHeaderComponent';

import LoginAutoShow from '../BLOG/Login/LoginAutoShow';
import autoJwtTokenGenerateForUserOrGuest from '../hooks/autoJwtTokenGenerateForUserOrGuest';
import { UserFullInfoProvider } from '../../pages/_app';
const Header = () => {

    const { user, user_details } = useContext(UserFullInfoProvider)
    autoJwtTokenGenerateForUserOrGuest()

    const router = useRouter();
    
    // console.log(pathname.route = '/story')

    /*------------------------------------------for header indicator----------------------------------*/
    useEffect(() => {
        const pathname = router.pathname.split('/')[1];

        if (router.pathname === '/') {
            document.getElementById('home').className = 'border-b-2 bg-base-200 border-primary btn-disabled'
        }
        else if (pathname === 'story' && !Object.keys(router.query).includes('cat') && !router.pathname.includes('[post_id]')) {
            document.getElementById('story').className = 'border-b-2 bg-base-200 border-primary btn-disabled'

        }
        else if (pathname === 'videos') {
            document.getElementById('videos').className = 'border-b-2 bg-base-200 border-primary btn-disabled'
        }
        else {
            document.getElementById('videos').className = ''
            document.getElementById('story').className = ''
            document.getElementById('home').className = ''
        }

    }, [router, router.query])

    /* --------------------------path router navigate--------------------*/
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }

    /**----------------------------------------side bar handle for mobile device and tablet mood only------------------------- */
    const showSideLeftBarHandle = () => {
        const sideLeftBar = document.getElementById('sideLeftBar')
        sideLeftBar.style.left = '0px';
        const sideLeftBarTitle = document.querySelectorAll('#sideLeftBarTitle')
        setTimeout(() => {
            sideLeftBarTitle.forEach(title => {
                title.style.display = 'flex'
            })
        }, 50);

    }
    // const getBar = pathname.includes('services')
    //     console.log(getBar)
    useCommonWindowResizeHeaderComponent();
    return (
        <div className='mb-[60px]' id='topHeaderMargin'>
            <div className="h-[60px] w-full border-b-2 bg-base-100 z-[150] fixed top-0" id='header'>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div className='flex items-center md:justify-center pt-1'>
                    <div className="flex justify-between md:justify-center ml-2 mr-2">
                        <ul className="menu menu-horizontal p-0">
                            <li className='md:hidden'> <button id='showSideBarMobileTab' onClick={() => showSideLeftBarHandle()}><MenuBarCircle color='grey' size='25' /></button></li>
                            <li> <button id='home' onClick={() => navigate('/')}><Home color='grey' size='25' /></button></li>
                            <li> <button id='story' onClick={() => navigate('/story')}><NewsFeed color='grey' size='25' /></button></li>
                            <li> <button id='videos' onClick={() => navigate('/videos')}><Video color='grey' size='25' /></button></li>
                        </ul>
                    </div>
                    <div className="flex absolute right-0 top-2px md:static items-center ml-2 mr-2">
                        <SearchForm />
                        <ProfilePicture />
                    </div>
                </div>

                {/**-----------------side bar component------------------ */}
                <SideLeftBar />
                <DownloadApk />
            </div>
            <ContextMenu />

            {/* {
                user?.user ||
                <LoginAutoShow />
            } */}

        </div>



    );
};

export default Header;