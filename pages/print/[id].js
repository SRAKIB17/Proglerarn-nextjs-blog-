/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import autoJwtTokenGenerateForUserOrGuest from '../../components/hooks/autoJwtTokenGenerateForUserOrGuest';
import { Camera } from '../../components/ReactRSIcon';

import coverPhoto1 from '../../public/print/print-cove-1.jpg'
import coverPhoto2 from '../../public/print/print-cove-2.jpg'

const Index = () => {
    const router = useRouter()
    const { id } = router.query;
    autoJwtTokenGenerateForUserOrGuest()

    const { data, refetch, isLoading } = useQuery(['print-story', id], () => axios.get(`/api/post/find-specific-story?post_id=${id}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))
    const post = data?.data || []
    const userID = data?.data?.userID
    const userInfo = useQuery(['printPostUserDetails', userID], () => axios.get(`/api/public_user_details/${userID}`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }));
    const user_details = userInfo?.data?.data?.user_details;

    const [t, setT] = useState(6)
    const onloadIframeHeightStylesHandle = async (id) => {
        const iframe = document.getElementById('print' + id)
        iframe.style.height = await iframe.contentWindow.document.documentElement.scrollHeight + 'px';

        const time = 6
        const count = setInterval(() => {
            if (time === 0) {
                document.getElementById('count').style.display = 'none'
                clearInterval(count);
                print()
            }
            time--
            setT(time)
        }, 1000);
    }


    const copyLink = `${typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''}/story/${id}`;
    const { thumbnail, postRefMode, short_description } = post;



    return (
        <div>
            <div className='border-b-4 border-red-200'>
                <div className='fixed top-[50%] left-[50%]'>
                    <p className='btn btn-disabled bg-secondary text-white font-mono font-light' id='count'>
                        Please Wait {t + ' '} sec
                    </p>
                </div>
                <div className='p-5 pl-10 pr-10'>
                    <div className='font-mono text-center font-extrabold'>
                        <p className='text-6xl border-b-2 border-primary'>{post?.post_title}</p>
                        <p>--{user_details?.name}</p>
                    </div>

                    <div className='pt-20 mb-20'>
                        <div className='float-left'>
                            {/* ----thumbnail------------ */}
                            {
                                (postRefMode === 'text' && thumbnail) ?
                                    <div className='mr-4'>
                                        <figure>
                                            <img
                                                src={thumbnail}
                                                alt=""
                                                className='max-w-[200px] h-[200px] md:max-w-[250px] md:h-[160px] rounded-md border-2'
                                            />
                                        </figure>
                                    </div>
                                    :
                                    <div className='mr-4'>
                                        <Camera size='150' className="border-2 rounded-md" />
                                    </div>
                            }
                        </div>
                        {/* style={{ width: '100%', wordWrap: "break-word", whiteSpace: 'pre-line' }} */}
                        <div className='text-justify'>
                            {
                                short_description?.slice(0, 1000)
                            }
                        </div>
                    </div>
                    <div className='font-mono'>
                        <p className='text-2xl'>
                            ProgLearn
                        </p>
                        <p className='text-2xs'>
                            <a href={{ copyLink }} className='text-primary'>
                                See Post
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <iframe
                src={"/api/preview/" + id}
                frameBorder="0"
                id={'print' + id}
                className='w-full'
                onLoad={() => onloadIframeHeightStylesHandle(id)}
            >
            </iframe>
        </div>
    );
};

export default Index;