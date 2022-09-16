/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import ShareOption from '../../Comment/LikeLoveFavorite/ShareOption';
import timeSince from '../../Post-NewsFeed/TimeSince';
import { CDN, Copy, Delete, Link, Share, Writing } from '../../ReactRSIcon';
import DeleteCode from './DeleteCode';
import EditCode from './EditCode';
import styles from '../../Comment/LikeLoveFavorite/LikeTransition.module.css'
import { useQuery } from 'react-query';
import axios from 'axios';
import WarningProfile from '../../hooks/WarningProfile';
import maleAvatar from '../../../public/maleAvatar.png'
import femaleAvatar from '../../../public/femaleAvatar.png'
import { useRouter } from 'next/router';
import { UserFullInfoProvider } from '../../../pages/_app';

const CdnCodeList = ({ cdn, index, refetch }) => {
    const { user, isAdmin, user_details } = useContext(UserFullInfoProvider);

    const { code, code_id, userID, time, content_type, code_title, code_des } = cdn;
    const getTimeSince = timeSince(time)


    const copyCdnLink = `${(typeof window !== 'undefined' && window.location.origin) ? window.location.origin : ''}/${userID}/cdn/${code_id}`.trim();
    const cdn_id = code_id?.split('-')[0]
    const copyCodeLink = `${(typeof window !== 'undefined' && window.location.origin) ? window.location.origin : ''}/${userID}/cdn/?cdn_id=${cdn_id}`.trim();


    const codePublishUserInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const code_Publish_User_details = codePublishUserInfo?.data?.data?.user_details;
    const replyIsLoading = codePublishUserInfo?.isLoading;
    const refetchReply = codePublishUserInfo?.refetch;


    const copyCodeHandle = (id) => {
        const codeLink = document.getElementById(id)
        codeLink.select()
        document.execCommand('copy')
    }


    const [showCode, setShowCode] = useState(null);
    const [deleteCode, setDeleteCode] = useState(null);
    const [editCode, setEditCode] = useState(null);
    const [showShareCode, setShareCode] = useState(null)
    const [showShareCDN, setShareCDN] = useState(null)

    const sharePath = `${userID}/cdn/${code_id}`
    const router = useRouter()
    const navigate = (path) => {
        router.replace(path)
    }
    return (
        <div className='border-b relative border-gray-500 p-2'>
            <div>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-1'>
                        <p className='ml-1'>
                            {
                                index + 1 + '.'
                            }
                        </p>
                        <p>
                            {
                                code_title
                            }
                        </p>
                    </div>
                    {
                        (user_details?.userID === userID || isAdmin?.admin) &&
                        <div className='flex items-center gap-1'>
                            <button

                                // className={(editPost ? ' text-white ' : 'btn-outline') + ' btn btn-info  btn-xs'}
                                onClick={() => setEditCode(cdn)}
                                className='btn btn-success btn-outline btn-xs p-1'
                            >

                                <Writing />
                            </button>
                            {/* Delete User */}

                            <button
                                className='btn btn-warning btn-outline btn-xs p-1'
                                onClick={() => setDeleteCode(cdn)}
                            >
                                <Delete />
                                {/* <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                        </p> */}
                            </button>
                            {/* <button className='btn btn-warning btn-outline btn-xs' onClick={() => setDeletePost({ post_id, userID, post_title })}>
                        <Delete />
                    </button> */}
                        </div>
                    }
                </div>
                <div>
                    <table className='text-xs text-left table table-zebra'>

                        <tbody>
                            <tr>
                                <td>
                                    <b>
                                        ID
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    {
                                        code_id
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Title
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    {
                                        code_title
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Content_type
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    {
                                        content_type
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Type
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    <CodeType type={content_type} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Time
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    {
                                        getTimeSince
                                    }
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Publisher
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    <div
                                        className='flex cursor-pointer link-primary link-hover'
                                        onClick={() => navigate('/profile/' + code_Publish_User_details?.userID)}
                                        S>
                                        <h6 className='m-0'>{code_Publish_User_details?.name || "User"}</h6>
                                        <WarningProfile user_details={code_Publish_User_details} size='13' />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <b>
                                        Description
                                    </b>
                                </td>
                                <td className='pl-1 pr-1'>
                                    :
                                </td>
                                <td className='text-gray-500'>
                                    <p className='whitespace-pre-wrap break-words'>
                                        {
                                            code_des
                                        }
                                    </p>
                                </td>
                            </tr>

                        </tbody>
                    </table>

                    <div className='pl-2'>
                        {/* *******FOR CODE VIEW LINK************* */}
                        <div>
                            <div className='text-gray-500 pt-4'>
                                <div className="p-1" >
                                    <Link size='18' />
                                </div>
                                <div className='flex items-center flex-wrap gap-[2px]'>
                                    <input
                                        readOnly='true'
                                        id={'codeLink' + code_id}
                                        type="text"
                                        className='input input-success font-mono input-sm w-fit'
                                        defaultValue={copyCodeLink}
                                    />
                                    <button
                                        onClick={() => copyCodeHandle('codeLink' + code_id)}
                                        className='btn btn-sm btn-outline btn-secondary'
                                    >
                                        <Copy />
                                    </button>
                                    <div
                                        onMouseEnter={() => setShareCode(!showShareCode)}
                                        onMouseLeave={() => setShareCode(!showShareCode)} className='relative'
                                    >
                                        <button
                                            className='btn btn-primary btn-sm btn-outline '
                                        >
                                            <Share />
                                        </button>
                                        {
                                            showShareCode &&
                                            <div className={styles.shareOption}>
                                                <ShareOption sharePath={sharePath} id={code_id} />
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <a href={copyCodeLink} target='_blank' className='btn btn-sm btn-outline btn-info' rel="noreferrer">
                                            visit
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* *********FOR CDN LINK *******************/}
                            <div className='text-gray-500 pt-2'>

                                <div className="p-1" >
                                    <CDN size='22' />
                                </div>
                                <div className='flex items-center flex-wrap gap-[2px]'>
                                    <input
                                        readOnly='true'
                                        id={'cdnLink' + code_id}
                                        type="text"
                                        className='input input-success font-mono input-sm w-fit'
                                        defaultValue={copyCdnLink}
                                    />
                                    <button
                                        onClick={() => copyCodeHandle('cdnLink' + code_id)}
                                        className='btn btn-sm btn-outline btn-secondary'
                                    >
                                        <Copy />
                                    </button>
                                    <div
                                        onMouseEnter={() => setShareCDN(!showShareCDN)}
                                        onMouseLeave={() => setShareCDN(!showShareCDN)} className='relative'
                                    >
                                        <button
                                            className='btn btn-primary btn-sm btn-outline '
                                        >
                                            <Share />
                                        </button>
                                        {
                                            showShareCDN &&
                                            <div className={styles.shareOption}>
                                                <ShareOption sharePath={sharePath} id={code_id} />
                                            </div>
                                        }
                                    </div>
                                    <a href={copyCdnLink} target='_blank' className='btn btn-sm btn-outline btn-info' rel="noreferrer">
                                        visit
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-1'>
                            <button
                                className='btn btn-xs btn-outline p-1 btn-info mt-2'
                                onClick={() => setShowCode(!showCode)}
                            >
                                {showCode ? 'Hide ' : 'view '} code
                            </button>

                        </div>
                        <div>
                            {
                                showCode &&
                                <div className='pt-2'>
                                    <button
                                        onClick={() => copyCodeHandle("codeView" + code_id)}
                                        className='btn btn-xs btn-outline btn-secondary'
                                    >
                                        <Copy />
                                    </button>
                                    <textarea
                                        className='textarea textarea-primary mt-2 w-full whitespace-pre'
                                        name=""
                                        defaultValue={code}
                                        id={"codeView" + code_id}
                                        cols="30"
                                        rows="10"
                                        readOnly
                                    >
                                    </textarea>
                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
            <div>
                {
                    user?.user &&
                    <>
                        {
                            deleteCode &&
                            <div>
                                <DeleteCode props={{ deleteCode, refetch, setDeleteCode }} />
                            </div>
                        }
                        {
                            editCode &&
                            <div className='absolute top-0 overflow-auto h-full w-full'>
                                <EditCode editCode={editCode} setEditCode={setEditCode} refetch={refetch} />
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
};

export default CdnCodeList;

const CodeType = ({ type }) => {
    switch (type) {
        case "text/plain":
            return "Plain Text"
            break;
        case "text/html":
            return "Html"
            break;
        case "text/css":
            return "CSS"
            break;
        case "text/javascript":
            return "Javascript"
            break;
        case "application/xml":
            return "XML"
            break;
        case "application/json":
            return "JSON"
            break;

        default:
            break;
    }
}

