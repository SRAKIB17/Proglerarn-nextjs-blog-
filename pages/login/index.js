/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import LoadingSpin from '../../components/LoadingSpin';
import { UserFullInfoProvider } from '../_app';
import RegisterFormFixed from '../../components/BLOG/Login/RegisterFormFixed';

const index = () => {
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider)

    const router = useRouter();
    const { return_url } = router.query
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    if (isLoading) {
        return (
            <div className='bg-base-100 h-[100vh] w-full'>
                <div className='mt-40'>
                    <LoadingSpin />
                </div>
            </div>
        )
    }
    if (return_url && user?.user) {
        navigate(return_url)
    }
    else if (!return_url && user?.user) {
        navigate('/')
    }
    return (
        <div className='w-full h-full bg-base-100 m-4'>
            {
                user?.user ||
                <RegisterFormFixed />
            }

        </div>
    );
};

export default index;