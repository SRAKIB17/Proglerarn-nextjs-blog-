/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import classTagShortcutInput from '../hooks/hooks/useFindClassAttr';
import { MenuBarCircle, SendShare } from '../ReactRSIcon';
import AdminSupportInbox from './AdminSupportInbox';
import MessageBody from './MessageBody';
import inbox from './SupportInbox.module.css'
import style from './Admin.module.css'
import { UserFullInfoProvider } from '../../pages/_app';
import usePrivatePageCheckUser from '../hooks/checkUser/privatePageCheckUser';
import { useRouter } from 'next/router'
import EmojiGifIndex from '../Comment/EmojiGif/EmojiGifIndex';
import LoadingSpin from '../LoadingSpin';

const SupportInbox = () => {

    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    // const asPath = useRouter()?.asPath
    // usePrivatePageCheckUser(asPath)

    const router = useRouter()



    const textareaRef = useRef();
    const onchangeInput = (e) => {
        heightAutoHandle(e)
        classTagShortcutInput(e, textareaRef)
    }

    //********************************************** set auto height support inbox box*************************** */
    const handleChatBoxHeight = () => {
        try {
            const sendMessageSupportInboxForm = document.getElementById('sendMessageSupportInboxForm');
            document.getElementById('supportMessageBody').style.height = document.getElementById('SupportInbox').offsetHeight - (sendMessageSupportInboxForm.offsetHeight + 100) + 'px'
        }
        catch {

        }
    }
    useEffect(() => {
        handleChatBoxHeight()
        document.body.onresize = () => {
            handleChatBoxHeight()
        }
    }, [])

    //***(*************************************************************** auto matic high increase for inbox ***************************) */
    const heightAutoHandle = (e) => {
        handleChatBoxHeight()
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < 150) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = 150 + 'px'
        }
    }



    const [inboxMessage, setInboxMessage] = useState([]);
    const [inboxUserId, setInboxUserId] = useState(null);
    const { userID } = router.query;
    useEffect(() => {
        if (isAdmin?.admin && userID) {
            setInboxUserId(userID)
        }
        else {
            setInboxUserId(user_details?.userID)
        }
    }, [user_details])


    const { data, refetch, isLoading: InboxLoading } = useQuery(['SupportInbox', inboxUserId, user_details], () => axios.get(`/api/inbox/support/${inboxUserId}?email=${user_details?.email}`,
        {
            headers: {
                access_token: sessionStorage.getItem('accessAutoG'),
                token: localStorage.getItem('token')
            }
        }
    ))
    const message = data?.data?.result;
    console.log(message)
    useEffect(() => {
        setInboxMessage(message)
    }, [message])


    // FOR EMOJI GIF AND OTHER //
    const [selectEmoji, setSelectEmoji] = useState(null)
    const [showEmojiGifSection, setShowEmojiGifSection] = useState(null);
    const [showMenuEmoji, setShowMenuEmoji] = useState(null);

    const [messageLoading, setMessageLoading] = useState(null)
    const messagePostHandle = async (event) => {
        setMessageLoading(true)
        event.preventDefault();
        handleChatBoxHeight()
        const body = event.target.supportMessage.value;
        const messageBody = {
            emoji: selectEmoji,
            userID: inboxUserId,
            adminReply: isAdmin?.admin,
            adminId: isAdmin?.admin ? user_details?.userID : '',
            message: body,
            time: new Date()
        }

        const { data } = await axios.post(`/api/inbox/support/${inboxUserId}?email=${user_details?.email}`, messageBody,
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
            refetch()
            alert('something is wrong')
            // setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            setMessageLoading(false)
        }
        event.target.reset()
        setMessageLoading(false)
        setInboxMessage([...inboxMessage, messageBody])

        const myDiv = document.getElementById("supportMessageBody");
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
        setSelectEmoji(null)
        setShowEmojiGifSection(null)
    }
    return (
        <div>
            <div
                id="SupportInbox"
                style={{ overflow: 'hidden', paddingTop: '0px', width: '100%' }}
                className="bg-base-100 h-[100vh]"
            >
                <div
                    className='max-w-xl mx-auto shadow-2xl p-4'
                >
                    <div
                        className='w-full bg-base-100 z-20 border-b-2 ' id='topSupportInboxDIV'>
                        <div className='flex justify-between items-center ml-[20px] mr-[20px] relative pb-1 '>
                            <h1>
                                Support Inbox
                            </h1>

                            {/* ********************************************* ***********************************
                             it show only admin show and it will work for hide all inbox message ..
                             hight 0 to 224px
                            *************************************************************************** */}
                            {
                                isAdmin?.admin &&
                                <div className='mr-20'>
                                    <button
                                        onClick={hideAllInboxMessageForAdmin}
                                        className='font-bold btn btn-xs btn-outline text-white btn-warning'
                                    >
                                        All Message
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                    <div
                        className={(inbox.inboxHideScrollBar) + ' relative  p-4 overflow-auto overflow-x-hidden  h-full '}
                        id='supportMessageBody'
                    >

                        {/* ********************************************* ***********************************
                             it show only admin show and
                             here setInboxMessage, 
                             1. inboxUserId = set id userId who want massage admin 
                             2. setInboxUserId  = admin click a userId and see message specific userId
                    ****************************************************************************** */}

                        {
                            (isAdmin?.admin && showMessageList) &&
                            <div className={' overflow-auto  border-b-primary sticky top-[-16px] w-full  z-40 bg-base-100'}
                                id='adminAllInboxMessage'
                            >
                                <div className=' absolute right-0 z-[30] top-[2px]'>
                                    <button className='btn btn-sm btn-secondary btn-outline text-right' onClick={hideAllInboxMessageForAdmin}>
                                        X
                                    </button>
                                </div>
                                <div className='rounded-lg border-b overflow-auto h-56 hideScrollBar mt-4'>
                                    <AdminSupportInbox setInboxMessage={{ setInboxMessage, inboxUserId, setInboxUserId }} />
                                </div>
                            </div>

                        }

                        <div className='relative'>

                            {
                                InboxLoading && <LoadingSpin />
                            }
                            {
                                inboxMessage?.map((messageBody, index) => <MessageBody key={messageBody?.support_id} messageBody={messageBody} />)
                            }
                            {
                                inboxMessage?.length === 0 &&
                                <div className='text-gray-500'>
                                    No message
                                </div>
                            }
                        </div>



                    </div>
                    <div className='border-t-2 pt-3' id='sendMessageSupportInboxForm'>

                        <form action="" onSubmit={messagePostHandle} className='flex flex-col ml-1 mr-1 relative'>
                            {
                                showMenuEmoji &&
                                <div className={(showEmojiGifSection ? 'top-[-150px] h-[150px]' : ' top-[-55px]') + ' absolute left-0 bg-base-100 w-full mb-1 z-20'}>
                                    <EmojiGifIndex props={{ selectEmoji, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection }} />
                                </div>

                            }

                            <div className='flex items-end w-full gap-2'>
                                <span
                                    className='btn btn-sm btn-outline w-8 p-1 h-8 outline-none'
                                    onClick={() => showMenuEmojiHandle()}
                                >
                                    <MenuBarCircle size='20' />
                                </span>
                                <textarea ref={textareaRef}
                                    id='textForm'
                                    className='input input-success font-mono  w-full'
                                    name="supportMessage"
                                    onBlur={onchangeInput}
                                    onKeyUp={handleChatBoxHeight}
                                    onChange={onchangeInput}
                                    onInput={onchangeInput}
                                    onCut={heightAutoHandle}
                                    onPaste={heightAutoHandle}
                                    onDrop={heightAutoHandle}
                                    onKeyDown={heightAutoHandle}
                                    required={selectEmoji ? false : true}
                                >
                                </textarea>
                                <div>
                                    {
                                        messageLoading ?
                                            <span className='btn btn-sm btn-primary text-xs relative'>
                                                <SendShare size='25' />
                                                <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                                </p>
                                            </span>
                                            :
                                            <button className='btn btn-sm btn-primary text-xs'><SendShare size='25' /></button>
                                    }


                                </div>
                            </div>
                            {/* <TextArea /> */}
                        </form>
                    </div>
                </div>
            </div>

        </div >
    );
};



export default SupportInbox;
