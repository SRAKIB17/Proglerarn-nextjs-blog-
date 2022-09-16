/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import { Announcement, Setting, SupportInbox, Writing } from '../../ReactRSIcon';
import Message_Filled from './SVG/Message_Filled';

const ProfilePicHeader = () => {
    const router = useRouter()
    const navigate = path => {
        router.replace(path)
    }

    const { user, user_details, isLoading } = useContext(UserFullInfoProvider);

    const logOut = () => {
        localStorage.removeItem('token')
        document.cookie = `login=`
        location.reload()
    }

    return (
        <div>
            <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
                {
                    user?.user ||
                    <div className="w-10 rounded-full">

                        <button onClick={() => navigate('/login?return_url=' + router.asPath)}>
                            <img
                                src='/maleAvatar.png'
                                alt=''
                                className='w-full bg-base-100'
                            />
                        </button>
                    </div>
                }
                {
                    user?.user &&
                    <div className="w-10 rounded-full">
                        {
                            (user_details?.profile == '') ?
                                <img
                                    src={(user_details?.gender == 'Female' ? '/femaleAvatar.png' : '/maleAvatar.png')}
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
                }
            </label>
            {
                user?.user &&
                <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <button
                            className='flex gap-2 '
                            onClick={() => navigate('/profile')}
                        >
                            <span>
                                <img src="/svg/profile.svg" alt="" className='w-4' />
                            </span>
                            <span>
                                Profile
                            </span>
                        </button>
                    </li>

                    <li>
                        <button
                            className=' flex gap-2'
                            onClick={() => navigate('/inbox')}
                        >
                            <span>
                                <Message_Filled size='15' color='currentColor' />
                            </span>
                            <span>
                                Inbox (1)
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            className=' flex gap-2 '
                            onClick={() => navigate('/blog/post/new')}
                        >
                            <span>
                                <Writing size='17' />
                            </span>
                            <span>
                                New Post
                            </span>
                        </button>
                    </li>

                    <li>
                        <button
                            className=' flex gap-2 '
                            onClick={() => navigate('/announcement')}
                        >
                            <span>
                                <Announcement size='16.5' />
                            </span>
                            <span>
                                Announcement
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            className='buttonSpin flex gap-2 '
                            onClick={() => navigate('/settings')}
                        >
                            <span>
                                <img src="/svg/setting_interface_gear.svg" alt="" className='w-4' />
                            </span>
                            <span>
                                Settings
                            </span>
                        </button>
                    </li>
                    <li>
                        <button
                            className=' flex gap-2 '
                            onClick={() => logOut()}
                        >
                            <span>
                                <img src="/svg/log-out.svg" alt="" className='w-4' />
                            </span>
                            <span>
                                Log out
                            </span>
                        </button>
                    </li>

                </ul>
            }
        </div>
    );
};

export default ProfilePicHeader;