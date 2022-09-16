import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import CoverPhoto from './profilePicUpload/CoverPhoto';
import ProfilePic from './profilePicUpload/ProfilePic';

const UpdateProfilePicture = ({ setShowPage }) => {
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider);
    const router = useRouter()
    const [ThumbnailData, setThumbnailData] = useState('');

    const [coverThumbnail, setCoverThumbnail] = useState('')
    const [profileThumbnail, setProfileThumbnail] = useState('')


    const [errMsg, setErrMsg] = useState('');
    const [uploading, setUploading] = useState(false)
    const uploadCoverProfilePicHandler = async (e) => {
        e.preventDefault()
        setUploading(true)

        const updateForm = {
            userID: user_details?.userID,
            cover: coverThumbnail || user_details?.cover,
            profile: profileThumbnail || user_details?.profile
        }

        // PUT SERVER AND SAVE USER COVER AND PROFILE PICTURE//
        const { data } = await axios.put('/api/profile/update_profile', updateForm, {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        });

        if (data?.message === 'success') {
            setErrMsg('')
            setShowPage('post');
            router.reload()
        }
        if (data?.message === 'error') {
            setErrMsg(data?.error)
        }
        setUploading(false)
    }
    return (
        <div>

            <div className='relative'>


                <div className="mt-10">
                    <h1 className='text-primary text-xl font-bold text-center mb-1'>
                        Update Profile Photo
                    </h1>
                    <form onSubmit={uploadCoverProfilePicHandler} className='flex flex-col items-center w-full'>
                        <div>
                            <ProfilePic profileThumbnail={profileThumbnail} setProfileThumbnail={setProfileThumbnail} />
                        </div>
                        <div>
                            <CoverPhoto coverThumbnail={coverThumbnail} setCoverThumbnail={setCoverThumbnail} />
                        </div>
                        <button className='btn btn-sm m-4 btn-primary text-white'>Save</button>
                    </form>
                </div>
                {
                    uploading &&
                    <div>
                        <div className='flex justify-center pt-8 mb-8 overflow-hidden'>
                            <div className='animate-spin text-center absolute top-60 border-l-4 w-28 h-28 rounded-[50%] border-primary'>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};


export default UpdateProfilePicture;




