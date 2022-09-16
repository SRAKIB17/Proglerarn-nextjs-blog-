/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Comment, CSS3, EmoticonLove, HTML5, JavaScript, Like, Setting, Share } from '../ReactRSIcon';

import emmet from '../../public/homeGif/emmet.gif'
import styles from './Feature.module.css'

const Feature = () => {
    const badge = [' btn-primary', ' btn-secondary', ' btn-accent', ' btn-info', ' btn-warning', ' btn-accent', ' btn-success'];
    // 
    return (
        <div>
            <div className={styles.feature + ' bg-base-100 w-full p-4 font-mono'}>
                {/* *******FOR JS CSS HTML */}
                <div className={'btn h-[160px] ' + badge[Math.floor(Math.random() * badge.length)]}>
                    <div className='text-white flex text-xl flex-col'>
                        <h1 className='underline font-bold text-xl'>Support</h1>
                        <div className='text-[18px]'>
                            <div className='flex items-center'>
                                <JavaScript />
                                <h1>
                                    Javascript
                                </h1>
                            </div>
                            <div className='flex items-center'>
                                <CSS3 />
                                <h1>
                                    CSS3
                                </h1>
                            </div>
                            <div className='flex items-center'>
                                <HTML5 />
                                <h1>
                                    HTML5
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'text-white btn h-[160px] ' + badge[Math.floor(Math.random() * badge.length)]}>
                    <div className='flex flex-col items-center'>
                        <div>
                            <h1 className='underline font-bold text-xl block'>Customize</h1>
                        </div>
                        <div>
                            <Setting size='100' />
                        </div>
                        <div>
                            <h1>Full Customize post</h1>
                        </div>
                    </div>
                </div>

                {/* for reaction */}
                <div className={'btn h-[160px] ' + badge[Math.floor(Math.random() * badge.length)]}>

                    <div className=' text-white text-[18px] flex flex-col gap-1 items-start'>
                        <h1 className='underline font-bold text-xl text-center'>React</h1>
                        <div className='flex gap-1'>
                            <Like /> Like
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Like style={{ transform: 'rotate(180deg)' }} />
                            <h1>
                                Unlike
                            </h1>
                        </div>
                        <div className='flex gap-1'>
                            <EmoticonLove />
                            <h1>
                                Love
                            </h1>
                        </div>
                        <div className='flex gap-1'>
                            <Comment />
                            <h1>
                                Comment
                            </h1>
                        </div>
                        <div className='flex gap-1'>
                            <Share />
                            <h1>
                                Share
                            </h1>
                        </div>
                    </div>
                </div>
                {/* ********FOR shortcut********** */}
                <div className={' text-white h-[160px] overflow-hidden btn flex items-start  ' + badge[Math.floor(Math.random() * badge.length)]}>
                    <div>
                        <div>
                            <h1 className='text-xl underline font-bold'>Support Emoji</h1>
                        </div>
                        <video loop autoPlay className=' h-full pb-2 w-full '>
                            <source src='/homeGif/emoji.mp4' />
                        </video>
                        {/* <img src={emmet?.src} alt="" className='h-[200px] w-full max-w-xs' /> */}
                    </div>
                </div>
                {/* ********FOR shortcut********** */}
                <div className={' text-white overflow-hidden  h-[160px]  btn flex items-start  ' + badge[Math.floor(Math.random() * badge.length)]}>
                    <div>
                        <div>
                            <h1 className='text-[18px] underline font-bold pt-2 pb-2'>Shortcut HTML Emmet</h1>
                        </div>
                        <video loop autoPlay className='h-full w-full ' >
                            <source src='/homeGif/emmet.mp4' />
                        </video>
                        {/* <img src={emmet?.src} alt="" className='h-[200px] w-full max-w-xs' /> */}
                    </div>
                </div>




            </div>


            {/* <div className='bg-base-100 w-full'>

                <div>
                    <video loop autoPlay className='h-auto w-auto'>
                        <source src='/homeGif/emmet.mp4' />
                    </video>
                    <video loop='true' autoPlay='true' src='/homeGif/emmet.mp4' >
                        <source src='/homeGif/emmet.mp4' />
                    </video>
                </div>
            </div> */}
        </div >
    );
};

export default Feature;