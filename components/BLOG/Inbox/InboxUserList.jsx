/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../pages/_app';

const InboxUserList = ({ showSpecificUserMessageHandle, userList = [] }) => {

    return (
        <div className="drawer-side border-r">
            <label htmlFor="settingsMenuContent" className="drawer-overlay"></label>
            <ul
                className="menu p-4 overflow-y-auto w-64 rounded-md shadow-md bg-base-100 gap-1"
            >
                {
                    userList?.map((id, index) => {

                        return (
                            <ShowUser id={id} showSpecificUserMessageHandle={showSpecificUserMessageHandle} key={id} />
                        )
                    })
                }
            </ul>

        </div>
    );
};

export default InboxUserList;

const ShowUser = ({ showSpecificUserMessageHandle, id }) => {
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);


    const { data } = useQuery(['public_profile', id], () => axios.get(`/api/public_user_details/${id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));

    const userInfo = (data?.data?.user_details);

    // const user_details = userInfo?.data?.data?.user_details;
    // const isLoadingAbout = userInfo?.isLoading;
    return (
        <li>
            <button onClick={() => showSpecificUserMessageHandle(id)}>
                <span
                    className="avatar"
                    title='Upload Profile picture'
                >
                    <span className="w-5 h-5 overflow-hidden rounded-full ring ring-inherit ring-offset-base-100 ring-offset-0" >
                        {
                            userInfo?.profile == '' ?
                                <img
                                    src={userInfo?.gender == 'Female' ? '/femaleAvatar.png' : '/maleAvatar.png'}
                                    alt=''
                                    className='w-full bg-base-100'
                                />
                                :
                                <img
                                    src={userInfo?.profile}
                                    alt=''
                                />
                        }
                    </span>
                </span>
                <span>
                    {userInfo?.name || "User"}
                </span>
            </button>
        </li>
    )
}