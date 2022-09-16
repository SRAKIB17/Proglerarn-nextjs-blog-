/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { UserFullInfoProvider } from '../../../pages/_app';
import LoadingFlowCircle from '../../LoadingFlowCircle';
import LoadingSpin from '../../LoadingSpin';
import CdnCodeList from './CdnCodeList';

const PublicCdnCode = () => {
    const { user, user_details } = useContext(UserFullInfoProvider);
    const router = useRouter()

    const [shows, setShowPosts] = useState(10)
    const [getPage, setGetPage] = useState(1)

    const pageHandle = () => {
        router.query.page = getPage + 1;
        setGetPage(getPage + 1)
        router.push(router)
        router.prefetch(router);
    }
    const { data, isLoading, refetch } = useQuery(['CDN_CODE', shows, getPage], () => axios.get(`/api/services/cdn/cdn?email=${user_details?.email}&show=${shows * getPage}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))
    const codeBody = data?.data?.result
    const [getCODE, setCODE] = useState([]);
    useEffect(() => {
        if (codeBody?.length > 0) {
            setCODE(codeBody)
        }
    }, [codeBody]);

    return (
        <div>
            <div>
                <div className='p-1'>
                    <div>
                        {
                            getCODE?.map((cdn, index) => <CdnCodeList
                                key={index}
                                cdn={cdn}
                                index={index}
                                refetch={refetch}
                            />)
                        }

                    </div>
                    {
                        (getCODE?.length === 0 && !isLoading) &&
                        <div className='text-center h-full bg-base-100 text-xl font-extrabold text-gray-500 pt-10'>
                            No Code found. Please Reload
                        </div>
                    }
                    {
                        isLoading ||
                        <div className=" p-4 mt-2 text-center w-full bg-base-100">
                            <button
                                className='btn btn-primary lg:btn-sm btn-xs w-32 btn-outline mb-4'
                                onClick={() => pageHandle()}
                            >
                                Next
                            </button>
                        </div>
                    }
                    {
                        (isLoading && getCODE.length === 0) &&
                        <div className='flex flex-col justify-between pt-40 bg-base-100 h-[100vh] items-center'>
                            <div>
                                <LoadingSpin />
                            </div>
                        </div>
                    }
                    {
                        (isLoading && getCODE.length !== 0) && <div className='flex flex-col justify-between pt-4 bg-base-100 pb-4 items-center'>

                            <div>
                                <LoadingFlowCircle />
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    );
};


export default PublicCdnCode;