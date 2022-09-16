/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import React, { useContext, useState } from 'react';

import { useRouter } from 'next/router'
import { UserFullInfoProvider } from '../../../pages/_app';

const DeleteCode = ({ props: { deleteCode, setDeleteCode, refetch } }) => {
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);
    const asPath = useRouter()?.asPath
    // usePrivatePageCheckUser(asPath)
    const [errMsg, setErrMsg] = useState('')

    const [deleteLoading, setDeleteLoading] = useState(null)
    const deleteCodeHandler = async (id) => {
        setDeleteLoading(true)
        const { code_id, userID } = deleteCode
        const { data } = await axios.delete(`/api/services/cdn/code_delete?email=${user_details?.email}&code_id=${code_id}&user_id=${userID}`,
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
                setDeleteCode(null)
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
                    Are You Sure? Delete {deleteCode?.code_title}
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
                                <button className='btn btn-sm bg-[#ff0000] hover:bg-red-500 text-white' onClick={deleteCodeHandler}>
                                    Delete
                                </button>

                            </>
                    }

                    <button
                        className='btn btn-sm bg-[#00ff00] text-white'
                        onClick={() => setDeleteCode(null)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div >
    );
};

export default DeleteCode;