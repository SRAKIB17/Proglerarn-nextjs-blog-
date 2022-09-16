import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';
import { useQuery } from 'react-query';
import { Line } from '../../../ReactRSIcon';
import timeAgoSince from '../../hooks/function/timeAgoSince';
import OptionList from './Option/OptionList';

const TitleCat = ({ post, refetch }) => {
    const router = useRouter()
    const { post_title, category, time, userID, post_id } = post
    const timeAgo = timeAgoSince(time)


    const badge = [' btn-primary', ' btn-secondary', ' btn-accent', ' btn-info', ' btn-warning', ' btn-accent', ' btn-success'];
    const navigate = (path) => {
        router.replace(path)
    }

    const userInfo = useQuery(['public_profile', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const comment_user_details = userInfo?.data?.data?.user_details;
    const commentUserLoading = userInfo?.isLoading;
    const path = router?.asPath?.split('/')
    const pathCheck = (path?.length == 4 && path[2] == 'post')

    return (
        <div className='flex flex-col justify-start items-start md:green'>
            <div className='flex items-center gap-[2px] sm:gap-1 flex-wrap pl-1 text-secondary'>
                <button className='btn btn-ghost btn-xs  link-hover   '
                    onClick={() => {
                        if (pathCheck) {
                            navigate(`/blog/post/?cat=${category}`);

                        }
                        else {
                            navigate(`?cat=${category}`);
                        }
                    }}
                >
                    {category}
                </button>


                <span className='flex flex-wrap text-xs gap-1'>
                    {
                        (typeof post?.tags?.split === 'function') &&

                        post?.tags?.split(',')?.map((tag, index) =>
                            <>
                                <p className='font-extrabold font-extrabold'>
                                    .
                                </p>
                                <button
                                    key={index + tag + category}
                                    className=' btn btn-ghost btn-xs   link-hover  '
                                    onClick={() => {
                                        if (pathCheck) {
                                            navigate(`/blog/post/?cat=${category}&tag=${tag}`)

                                        }
                                        else {
                                            navigate(`?cat=${category}&tag=${tag}`)
                                        }
                                    }}
                                >
                                    {
                                        tag
                                    }
                                </button>
                            </>
                        )
                    }
                </span>
            </div>
            <div className='flex justify-between items-center w-full'>
                <div className='p-2'>
                    <button
                        onClick={() => navigate(`/blog/post/${post_id}`)}
                        target='_blank'
                        className='sm:text-lg xl:text-xl text-left link-hover text-blue-600' rel="noreferrer"
                    >
                        {post_title}
                    </button>
                    <div className='mt-1 opacity-80 text-2xs sm:text-sm flex items-center gap-2'>
                        <span>
                            {timeAgo}
                        </span>
                        <b className='font-extrabold'>.</b>
                        <span className='flex items-center'>
                            posted by
                            <p className='ml-1 link-primary link-hover text-blue-800'>
                                <button onClick={() => navigate('/profile/' + comment_user_details?.userID)}>
                                    {comment_user_details?.name ? comment_user_details?.name : 'User'}
                                </button>
                            </p>
                        </span>
                    </div>
                </div>

                <div>
                    <OptionList post={post} refetch={refetch} />
                </div>
            </div>
        </div >
    );
};

export default TitleCat;