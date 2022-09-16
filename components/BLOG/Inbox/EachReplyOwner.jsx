/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../pages/_app';
import timeAgoSince from '../hooks/function/timeAgoSince';

const EachReplyOwner = ({ messageBody }) => {
    const { emoji, replyID, userID, message, time } = messageBody;
    const getTimeSince = timeAgoSince(time)


    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    return (
        <div>
            <div>
                <div className='relative flex w-full justify-end mt-1 mb-1 items-start'>
                    <div className='bg-base-200 flex p-3 shadow-inner w-full max-w-[80%]  rounded-lg rounded-bl-3xl'>
                        {/* <iframe
            onLoad={() => onloadMessageSupport(userID + support_id)}
            scrolling='no'
            className='w-fit overflow-auto'
            id={'supportInboxMsgBody' + (userID + support_id)}
            srcDoc={message}
            src="/api/preview"
            frameBorder="0"
        ></iframe> */}
                        {/* <div dangerouslySetInnerHTML={{ __html: message }}></div> */}
                        <div className='flex justify-end w-full text-right'>
                            <div className='break-words overflow-hidden'>
                                {
                                    messageBody?.emoji &&
                                    <div className='pb-[2px] flex justify-end mr-2'>
                                        <img src={messageBody?.emoji} alt="" className='h-auto max-w-[128px]' />
                                    </div>
                                }
                                {
                                    messageBody?.adminReply ?
                                        <div className='text-sm'>
                                            <div dangerouslySetInnerHTML={{ __html: message }}></div>
                                        </div>
                                        :
                                        <div className='text-sm'>
                                            {message}
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="avatar ml-1 mt-4">
                        <div className="w-5 h-5 border-gray-400 overflow-hidden">
                            {
                                (user_details?.profile == '' || !user_details?.profile) ?
                                    <img
                                        src={user_details?.gender == 'Female' ? 'femaleAvatar.png' : "maleAvatar.png"}
                                        alt=''
                                        className='w-full bg-base-100 rounded-full border-2'
                                    />
                                    :
                                    <img
                                        src={user_details?.profile}
                                        alt=''
                                        className='w-full bg-base-100 rounded-full border-2'
                                    />
                            }
                        </div>
                    </div>
                </div>
                <div className='pl-4 text-right pr-4'>
                    <p className='text-[10px] '>
                        {
                            time && getTimeSince
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EachReplyOwner;