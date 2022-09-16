/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../pages/_app';
import LoadingSpin from '../LoadingSpin';
import maleAvatar from '../../public/maleAvatar.png'
import femaleAvatar from '../../public/femaleAvatar.png'
import { Delete } from '../ReactRSIcon';


const AdminSupportInbox = ({ setInboxMessage: { setInboxMessage, inboxUserId, setInboxUserId } }) => {

    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    const { data, isLoading: adminInboxLoading, refetch } = useQuery(['SupportInboxAdmin', user_details], () => axios.get(`/api/inbox/support/?email=${user_details?.email}`,
        {
            headers: {
                access_token: sessionStorage.getItem('accessAutoG'),
                token: localStorage.getItem('token')
            }
        }
    ))
    const messageALl = data?.data?.result || []

    const uniqueUserId = [];
    messageALl?.forEach(message => {
        if (!uniqueUserId.includes(message?.userID)) {
            uniqueUserId.push(message?.userID)
        }
    });
    const showInboxSpecific = (id) => {
        setInboxUserId(id)
    }
    return (
        <div>
            <div>
                {
                    adminInboxLoading &&
                    <div>
                        <LoadingSpin />
                    </div>
                }
                <div className='flex gap-3 flex-col'>
                    {
                        uniqueUserId?.map((userID, index) =>
                            <UserListComponent refetch={refetch} userID={userID} setInboxUserId={setInboxUserId} key={index} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};



const UserListComponent = ({ userID, setInboxUserId, refetch }) => {
    // GET INBOX USER DETAILS 
    const inboxUserInfo = useQuery(['supportInboxMessageUserID', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));

    const inbox_user_details = inboxUserInfo?.data?.data?.user_details;

    //*********GET USER DETAILS  */
    const { user, user_details, isAdmin } = useContext(UserFullInfoProvider);

    const isLoading = inboxUserInfo.isLoading;
    const [deleteSupportInboxLoading, setDeleteSupportInboxLoading] = useState(false)
    const deleteInboxSupportHandle = async (id) => {
        setDeleteSupportInboxLoading(true)
        const { data } = await axios.delete(`/api/inbox/support/?userID=${id}&email=${user_details?.email}`,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            }
        )
        if (data?.message === 'success') {
            alert('success')
            setDeleteSupportInboxLoading(false)
            refetch()
            if (data?.result?.acknowledged) {
                refetch()
            }
        }
        else if (data?.message === 'error') {
            alert(data?.error)
        }
        setDeleteSupportInboxLoading(false)
    }
    return (
        <div className='' onClick={() => setInboxUserId(userID)}>
            {
                isLoading ?
                    <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                    </p>
                    :
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center'>
                            <div className="avatar ml-2">
                                <div className="w-[20px] rounded-full">
                                    {
                                        (inbox_user_details?.profile == '' || !inbox_user_details?.profile) ?
                                            <img
                                                src={inbox_user_details?.gender == 'Female' ? femaleAvatar.src : maleAvatar?.src}
                                                alt=''
                                                className='w-full bg-base-100'
                                            />
                                            :
                                            <img
                                                src={inbox_user_details?.profile}
                                                alt=''
                                            />
                                    }
                                </div>
                            </div>
                            <div className='ml-1 w-full '>
                                <div
                                    className='break-words overflow-hidden text-sm cursor-pointer font-extralight '

                                >
                                    {
                                        inbox_user_details?.name || 'User'
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                deleteSupportInboxLoading ?
                                    <button className='btn btn-warning btn-outline btn-xs'>
                                        <Delete />
                                        <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                        </p>
                                    </button>
                                    :
                                    <button className='btn btn-warning btn-outline btn-xs' onClick={() => deleteInboxSupportHandle(userID)}>
                                        <Delete />
                                    </button>
                            }
                        </div>
                    </div>
            }

        </div >
    )
}
export default AdminSupportInbox;
