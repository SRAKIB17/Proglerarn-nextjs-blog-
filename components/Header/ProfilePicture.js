/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router'
import loginProfile from '../../public/loginAvatar.png'
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import { UserFullInfoProvider } from '../../pages/_app';

const ProfilePicture = () => {
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider)

    const [showMenuProfile, setShowMenuProfile] = useState(false)
    const ProfilePictureHandle = (e) => {
        const getProfileMenu = document.getElementById('profileLogOut');
        getProfileMenu.style.right = '5px'
    }

    const router = useRouter();
    // console.log(pathname.route = '/story')
    // console.log(useRouter())
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    const logOut = () => {
        localStorage.removeItem('token')
        document.cookie = `login=`
        location.reload()
    }
    return (
        <div>
            <div>
                <ul className="menu menu-horizontal p-0 flex items-center md:absolute md:right-0 md:top-0">
                    {
                        user?.user &&

                        <li onMouseEnter={ProfilePictureHandle} onClick={() => navigate('/profile')} data-profile='profileLogOut'>
                            <button data-profile='profileLogOut' onMouseEnter={ProfilePictureHandle} onClick={() => navigate('/profile')} >
                                <div className="avatar " data-profile='profileLogOut' onClick={() => navigate('/profile')} >
                                    <div className="w-[28px] rounded-full ring ring-inherit ring-offset-base-100 ring-offset-1" data-profile='profileLogOut' onClick={() => navigate('/profile')} >
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
                            </button>
                        </li>
                    }
                    {/* ******************************************* for guest***************************************** */}
                    {
                        user?.user ||
                        <li>

                            <button onClick={() => navigate('/login?return_url=' + router.asPath)}>
                                <div className="avatar ">
                                    <div className="w-[28px] rounded-full ring ring-inherit ring-offset-base-100 ring-offset-1" data-profile='profileLogOut'>
                                        <img src={loginProfile.src} alt="" width='30' />
                                    </div>
                                </div>
                            </button>
                        </li>
                    }
                    {/* *********************************************************************************************** */}

                </ul>
            </div>

            {
                user?.user &&
                <div className='border-double onClickProfileMenu right-0 bg-base-100 mt-[70px] rounded-b-lg shadow-2xl' id='profileLogOut'>
                    <div className='p-3'>
                        <ul className="menu bg-base-100 w-56 rounded-box">
                            <li className="hover-bordered"><button onClick={() => navigate('/profile')}>Profile</button></li>
                            <li className="hover-bordered"><button onClick={() => logOut()}>Log out</button></li>
                        </ul>
                    </div>
                </div>
            }
        </div>
    );
};

export default ProfilePicture;