/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useEffect, useId, useState } from 'react';
import { useQuery } from 'react-query';
import { EmoticonLove, Like } from '../../ReactRSIcon/index'
import maleAvatar from '../../../public/maleAvatar.png'
import femaleAvatar from '../../../public/femaleAvatar.png'
import { useRouter } from 'next/router';
import WarningProfile from '../../hooks/WarningProfile';


const LikeUsersList = ({ post }) => {
    const { post_id } = post
    const postReact = post?.react;


    const allReact = postReact?.filter((like, index, arr) => like.rating != '')?.length
    const [userList, setUserList] = useState([])
    useEffect(() => {
        setUserList(postReact?.filter((like, index, arr) => like.rating != ''));
    }, [postReact])
    const like = postReact?.filter((like, index, arr) => like.rating === 'like');
    const unlike = postReact?.filter((like, index, arr) => like.rating === 'unlike');
    const love = postReact?.filter((like, index, arr) => like.rating === 'love');

    return (
        <div>
            <div className='font-bold mb-2 '>
                <div className=' flex items-center gap-1 justify-end border-b p-1'>
                    <button
                        className='btn-primary btn-xs btn-outline btn flax gap-1 items-center '
                        onClick={() => setUserList(postReact?.filter((like, index, arr) => like.rating))}
                    >
                        <p className='font-mono text-xs'>
                            All {allReact}
                        </p>
                    </button>
                    <button
                        className='btn-primary btn-xs btn-outline btn flax gap-1 items-center '
                        onClick={() => setUserList(like)}
                    >
                        <Like color='#00ff00' />
                        <p className='font-mono text-xs'>
                            {
                                like?.length
                            }
                        </p>
                    </button>

                    <button
                        className='btn-primary btn-xs btn-outline btn flax gap-1 items-center'
                        onClick={() => setUserList(unlike)}
                    >
                        <Like color='#ff2020' style={{ transform: 'rotate(180deg)' }} />
                        <p className='font-mono text-xs'>
                            {
                                unlike?.length
                            }
                        </p>
                    </button>

                    <button
                        className='btn-primary btn-xs btn-outline btn flax gap-1 items-center'
                        onClick={() => setUserList(love)}
                    >
                        <EmoticonLove color='#ff00f2' />
                        <p className='font-mono text-xs'>
                            {
                                love?.length
                            }
                        </p>
                    </button>

                </div>
                <h6 className='m-0'></h6>
                {
                    userList?.map((likeUnlike, index) => <GetUserNameAndLikeUnlike key={index} likeUnlike={likeUnlike} />)
                }
            </div>
        </div>
    );
};

const GetUserNameAndLikeUnlike = ({ likeUnlike }) => {
    const router = useRouter()
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    const { userID, rating } = likeUnlike

    const rating_user = useQuery(['rating_user', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const rating_user_info = rating_user?.data?.data?.user_details;
    const rating_user_loading = rating_user?.isLoading;
    return (
        <div>
            <div className='flex items-center justify-between gap-1 mb-1 mt-1'>
                <div className='flex items-center gap-2 cursor-pointer' onClick={() => navigate(`/profile/${userID}`)}>
                    <div className="avatar  ">
                        <div className="w-5 border-2 border-gray-500 rounded-full">
                            {
                                rating_user_loading ?
                                    <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                    :
                                    (rating_user_info?.profile == '' ?
                                        <img
                                            src={(rating_user_info?.gender == 'Female' ? femaleAvatar.src : maleAvatar?.src)}
                                            alt=''
                                            className='w-full bg-base-100'
                                        />
                                        :

                                        <img
                                            src={(!rating_user_info?.gender) ? maleAvatar?.src : rating_user_info?.profile}
                                            alt=''
                                        />)
                            }
                        </div>
                    </div>
                    <div className='text-[14px] font-bold flex gap-[1px]'>
                        <h6 className='m-0'>{rating_user_info?.name || "User"}</h6>
                        <WarningProfile user_details={rating_user_info} size="12" />
                    </div>
                </div>
                <div>
                    {
                        rating === 'like' &&
                        <button
                            className='bg-[#00ff00] p-1 rounded-[50%] btn-disabled relative w-5 h-5'
                        >
                            <Like color='white' size='12' />
                        </button>
                    }

                    {
                        rating === 'unlike' &&
                        <button
                            className='bg-[#ff2020] p-1 rounded-[50%] btn-disabled relative w-5 h-5'
                        >
                            <Like size='12' color='white' style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    }
                    {
                        rating === 'love' &&
                        <button
                            className='bg-[#ff00f2] p-1 rounded-[50%] btn-disabled relative w-5 h-5'
                        >
                            <EmoticonLove color='white' size='12' />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
export default LikeUsersList;