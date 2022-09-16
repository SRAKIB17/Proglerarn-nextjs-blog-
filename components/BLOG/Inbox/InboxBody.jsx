/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';

import { useRouter } from 'next/router'

import { UserFullInfoProvider } from '../../../pages/_app';
import EachMessageBody from './EachMessageBody';
import MessageSentForm from './MessageSentForm.jsx';
import LoadingSpin from '../../LoadingSpin';

const InboxBody = ({ setUserList, specificId }) => {
    const { user, user_details, isLoading: userIsLoading, isAdmin } = useContext(UserFullInfoProvider);



    const { data, refetch, isLoading } = useQuery(['Inbox', user_details], () => axios.get(`/api/inbox?user_id=${user_details?.userID}&email=${user_details?.email}`,
        {
            headers: {
                access_token: sessionStorage.getItem('accessAutoG'),
                token: localStorage.getItem('token')
            }
        }
    ))
    const messages = data?.data;

    // console.log(message)
    //**************************************************************************** */
    const userList = [];
    // let count = 

    const [checkUserFromList, setCheckUserFromList] = useState([])
    useEffect(() => {
        messages?.forEach(message => {
            if (message?.userID == user_details?.userID && !userList?.includes(message?.replyID)) {
                userList?.push(message?.replyID)
            }
            else if (message?.replyID == user_details?.userID && !userList?.includes(message?.userID)) {
                userList?.push(message?.userID)
            }

        })

        setUserList(userList);
        setCheckUserFromList(userList)
    }, [messages])



    const [showSpecificUserMessage, setShowSpecificUserMessage] = useState([])

    useEffect(() => {
        const getMessages = messages?.filter(message => message?.userID == specificId || message?.replyID == specificId);
        setShowSpecificUserMessage(getMessages);
    }, [specificId, messages]);

    //***************************************************************************** */
    const textareaRef = useRef();



    // FOR EMOJI GIF AND OTHER //
    const [selectEmoji, setSelectEmoji] = useState(null)
    const [showEmojiGifSection, setShowEmojiGifSection] = useState(null);
    const [showMenuEmoji, setShowMenuEmoji] = useState(null);


    const handleChatBoxHeight = () => {
        try {
            const sendMessageInboxForm = document.getElementById('sendMessageInboxForm');
            document.getElementById('inboxMessageBody').style.height = document.getElementById('SupportInbox').offsetHeight - (sendMessageInboxForm.offsetHeight + 60) + 'px'
        }
        catch {

        }
    }
    const [messageLoading, setMessageLoading] = useState(null)
    const messagePostHandle = async (event) => {
        setMessageLoading(true)
        event.preventDefault();
        handleChatBoxHeight()
        const body = event.target.supportMessage.value;
        const messageBody = {
            emoji: selectEmoji,
            userID: user_details?.userID,
            adminReply: isAdmin?.admin,
            message: body,
            replyID: specificId,
            time: new Date()
        }
        setShowSpecificUserMessage([...showSpecificUserMessage, messageBody])
        const { data } = await axios.post(`/api/inbox/new?user_id${user_details?.userID}&email=${user_details?.email}`, messageBody,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            });

        if (data?.message === 'success') {
            // setErrMsg(<p className='text-green-600'>Success</p>)
            setMessageLoading(false)
            refetch()
            setSelectEmoji(null)
            setShowMenuEmoji(null)
            setShowEmojiGifSection(null)
            if (data?.result?.acknowledged) {
                refetch()
                event.target.reset()
                setMessageLoading(false)
            }
        }
        else if (data?.message === 'error') {
            refetch();
            alert('Could not send message')
            setShowSpecificUserMessage(showSpecificUserMessage?.slice(0, showSpecificUserMessage?.length - 1))
            // setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            setMessageLoading(false)
        }
        event.target.reset();
        setMessageLoading(false)
        const myDiv = document.getElementById("inboxMessageBody");
        myDiv.scrollTop = myDiv.scrollHeight;
        refetch()
    }
    //************************************************ hide or show all inbox message********************************************** */
    const [showMessageList, setShowMessageList] = useState(true)
    const hideAllInboxMessageForAdmin = () => {
        setShowMessageList(!showMessageList)
    }


    const showMenuEmojiHandle = () => {
        setShowMenuEmoji(!showMenuEmoji)
        setSelectEmoji(null);
        setShowEmojiGifSection(null)
    }

    //for specific user//
    const { data: userSpecific } = useQuery(['public_profile', specificId], () => axios.get(`/api/public_user_details/${specificId}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));

    const userInfo = (userSpecific?.data?.user_details);


    const router = useRouter()
    const newUserCheck = checkUserFromList?.includes(specificId);
    const pathCheck = router.asPath.split('/')?.length == 3;
    return (
        <div>
            <div
                id="SupportInbox"
                style={{ overflow: 'hidden', paddingTop: '0px', width: '100%' }}
                className="bg-base-100 h-[100vh] "
            >
                <div
                    className=' p-4'
                >
                    <div
                        className='w-full bg-base-100 z-20 border-b-2 ' id='topInboxDiv'>
                        <div className='flex justify-between items-center ml-[20px] mr-[20px] relative pb-1 '>
                            <h1 className='font-bold text-primary'>
                                Inbox
                            </h1>

                            {/* ********************************************* ***********************************
                             it show only admin show and it will work for hide all inbox message ..
                             hight 0 to 224px
                            *************************************************************************** */}

                            <div className='mr-20 flex items-center gap-2'>
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
                                <h1
                                    className='font-bold text-primary'
                                >
                                    {userInfo?.name || "User"}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div
                        className=' relative  p-4 overflow-auto overflow-x-hidden  h-full '
                        id='inboxMessageBody'
                    >

                        {/* ********************************************* ***********************************
                             it show only admin show and
                             here setInboxMessage, 
                             1. inboxUserId = set id userId who want massage admin 
                             2. setInboxUserId  = admin click a userId and see message specific userId
                    ****************************************************************************** */}


                        <div className='relative'>

                            {
                                (pathCheck && !newUserCheck) &&
                                <span className='text-center badge btn-primary text-white relative'>
                                    {userInfo?.name || "User"}
                                    <button className=' -top-4 -right-4 absolute text-primary btn btn-xs btn-ghost z-50' onClick={() => router.replace('/inbox')}>
                                        x
                                    </button>
                                </span>
                            }
                            {
                                isLoading ?
                                    <LoadingSpin />
                                    :
                                    showSpecificUserMessage?.map((messageBody, index) => <EachMessageBody
                                        specificId={specificId}
                                        key={index} messageBody={messageBody} />)
                            }
                            {
                                (!showSpecificUserMessage && !isLoading) &&
                                <div className='text-gray-500 text-center text-xl'>
                                    No message
                                </div>
                            }
                        </div>



                    </div>
                    <div className='border-t-2 pt-3' id='sendMessageInboxForm'>

                        <MessageSentForm
                            messageLoading={messageLoading}
                            messagePostHandle={messagePostHandle}
                            selectEmoji={selectEmoji}
                            setSelectEmoji={setSelectEmoji}
                            setShowEmojiGifSection={setShowEmojiGifSection}
                            showEmojiGifSection={showEmojiGifSection}
                            showMenuEmoji={showMenuEmoji}
                            textareaRef={textareaRef}
                            showMenuEmojiHandle={showMenuEmojiHandle}
                        />
                    </div>
                </div>
            </div>

        </div >
    );
};



export default InboxBody;
