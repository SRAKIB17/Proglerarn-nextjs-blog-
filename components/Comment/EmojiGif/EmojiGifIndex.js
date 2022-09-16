/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Emoji, GifText } from '../../ReactRSIcon';
import EmojiIndex from './Emoji/EmojiIndex';
import GifIndex from './Gif/GifIndex';


const EmojiGifIndex = ({ props: { selectEmoji, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection } }) => {

    const viewEmojiSectionHandle = (view) => {
        setShowEmojiGifSection(view)
    }

    const closeCloseSectionHandle = () => {
        setShowEmojiGifSection(null)
    }
    const closeSelectEmojiGifHandle = () => {
        setSelectEmoji(null)
    }
    return (
        <div className='relative'>
            <div className='bg-base-300'>

                {
                    showEmojiGifSection == 'emoji' &&
                    <EmojiIndex props={{ selectEmoji, setSelectEmoji, closeCloseSectionHandle }} />
                }
                {
                    showEmojiGifSection == 'gif' &&
                    <GifIndex props={{ selectEmoji, setSelectEmoji, closeCloseSectionHandle }} />
                }
            </div>
            <div className='m-2'>
                <div className='flex  items-center gap-2'>
                    <span
                        className={(showEmojiGifSection === 'emoji' ? 'btn-disabled text-white bg-primary ' : 'btn-outline ') + ' btn btn-xs h-8  btn-info'}
                        onClick={() => viewEmojiSectionHandle('emoji')}
                    >
                        <Emoji size='22' />
                    </span>
                    <span
                        className={(showEmojiGifSection === 'gif' ? 'btn-disabled text-white bg-primary ' : 'btn-outline ') + ' btn btn-xs h-8  btn-info'}
                        onClick={() => viewEmojiSectionHandle('gif')}
                    >
                        <GifText size='24' />
                    </span>
                    <div className='pt-2'>
                        {
                            selectEmoji &&
                            <div className='w-11 h-11 p-1 border-2 rounded-md relative'>
                                <span
                                    onClick={closeSelectEmojiGifHandle}
                                    className='absolute text-2xs top-[-18px] right-[-10px] btn-primary btn btn-xs btn-outline bg-base-100'
                                >
                                    x
                                </span>
                                <div className='overflow-hidden'>
                                    <img src={selectEmoji} alt="" className='w-full h-auto' />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>


        </div >
    );
};

export default EmojiGifIndex;