/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import usePrivatePageCheckUser from '../../hooks/checkUser/privatePageCheckUser';
import { useRouter } from 'next/router'

const DeletePost = ({ props: { deletePost, setDeletePost, refetch } }) => {

    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);
    const asPath = useRouter()?.asPath
    usePrivatePageCheckUser(asPath)
    const [errMsg, setErrMsg] = useState('')

    const [deleteLoading, setDeleteLoading] = useState(null)
    const deletePostHandler = async (id) => {
        setDeleteLoading(true)
        const { post_id, userID } = deletePost
        const { data } = await axios.delete(`/api/post/delete-post?email=${user_details?.email}&post_id=${post_id}&user_id=${userID}`,
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            });
        if (data?.message === 'success') {
            setErrMsg(<p className='text-green-600'>Success</p>)
            setDeleteLoading(null)
            refetch()
            if (data?.result?.acknowledged) {
                refetch()
                setDeletePost(null)
                setDeleteLoading(null)
            }
        }
        else if (data?.message === 'error') {
            setDeleteLoading(null)
            setErrMsg(<p className='text-red-600'>{data?.error}</p>)
        }

    }
    return (
        <div className='h-60 w-full z-[30] absolute top-0 left-0 rounded-lg bg-base-300'>
            <div className='relative flex flex-col items-center justify-between mx-auto mt-20'>

                <h1 className='text-xl md:text-2xl text-warning flex'>
                    Are You Sure? Delete {deletePost?.post_title}
                </h1>
                <p className='text-red-600 text-center'>
                    {
                        errMsg
                    }
                </p>
                <div className='flex gap-4 mt-9'>
                    {
                        deleteLoading ?
                            <>
                                <button
                                    className='btn btn-sm bg-[#ff0000] text-white hover:bg-red-500'
                                >
                                    Delete
                                    <p className='absolute animate-spin border-b-2 border-red-900 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </button>
                            </>
                            :
                            <>
                                <button className='btn btn-sm bg-[#ff0000] hover:bg-red-500 text-white' onClick={deletePostHandler}>
                                    Delete
                                </button>

                            </>
                    }

                    <button className='btn btn-sm bg-[#00ff00] text-white' onClick={() => setDeletePost(null)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DeletePost;