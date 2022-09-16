/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React from 'react';
import { useQuery } from 'react-query';
import WarningProfile from '../../../../hooks/WarningProfile';


const Profile = ({ user_id, timeAgo }) => {

    const userInfo = useQuery(['public_profile', user_id], () => axios.get(`/api/public_user_details/${user_id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const comment_user_details = userInfo?.data?.data?.user_details;
    const commentUserLoading = userInfo?.isLoading;

    return (
        <div>
            {/* ------------------------------------------for profile picture  ----------------------------*/}
            <div className='mt-2 flex items-center gap-1'>
                <div className="avatar ">
                    <div className="w-12 rounded-full border-2  overflow-hidden">

                        {
                            commentUserLoading ?
                                <p className='animate-spin border-b-2 border-primary border-r-2 w-11 h-11 rounded-[50%]'>
                                </p>
                                :
                                (comment_user_details?.profile == '' ?
                                    <img
                                        src={(comment_user_details?.gender == 'Female' ? '/femaleAvatar.png' : '/maleAvatar.png')}
                                        alt=''
                                        className='w-full bg-base-100'
                                    />
                                    :

                                    <img
                                        src={(!comment_user_details?.gender) ? "/maleAvatar.png" : comment_user_details?.profile}
                                        alt=''
                                    />)
                        }

                    </div>
                </div>
                <div className='text-sm font-bold'>
                    <div
                        className='flex cursor-pointer link-primary link-hover'
                        onClick={() => navigate('/profile/' + comment_user_details?.userID)}
                    >
                        <h6 className='m-0'>{comment_user_details?.name || "User"}</h6>
                        <WarningProfile user_details={comment_user_details} size='13' />
                    </div>
                    <p className='text-[10px] text-gray-500'>{timeAgo}</p>
                </div>

            </div>
        </div>
    );
};

export default Profile;