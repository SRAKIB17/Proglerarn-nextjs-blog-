/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import EmojiGif from './EmojiGif';
import OtherEmojiGif from './OtherEmojiGif';
import loveGif from '../../../../public/gif/love emoji/love (5).gif'
import roseGif from '../../../../public/gif/Rose/1.gif'
import catAnimal from '../../../../public/gif/cat emoji/cat (1).gif'
import emojiGif2 from '../../../../public/gif/emoji 2/emoji (3).gif'

import LoveEmojiGif from './LoveEmojiGif';
import RoseGif from './RoseGif';
import CatAnimal from './CatAnimal';
import EmojiGif2 from './EmojiGif2';



const GifIndex = ({ props: { selectEmoji, setSelectEmoji, closeCloseSectionHandle } }) => {

    const [gifView, setGifView] = useState('emoji');
    const viewGifHandle = (view) => {
        setGifView(view)
    }


    return (
        <div >

            <div className='h-[300px] overflow-auto bg-base-100 border-2 rounded-md p-1 max-w-sm absolute top-[-310px] w-full z-20'>
                {
                    gifView == 'emoji' && <EmojiGif props={{ selectEmoji, setSelectEmoji }} />
                }
                {
                    gifView == 'emoji2' && <EmojiGif2 props={{ selectEmoji, setSelectEmoji }} />
                }
                {
                    gifView == 'others' && <OtherEmojiGif props={{ selectEmoji, setSelectEmoji }} />
                }
                {
                    gifView == 'loveGif' && <LoveEmojiGif props={{ selectEmoji, setSelectEmoji }} />
                }
                {
                    gifView == 'roseGif' && <RoseGif props={{ selectEmoji, setSelectEmoji }} />
                }
                {
                    gifView == 'catAnimal' && <CatAnimal props={{ selectEmoji, setSelectEmoji }} />
                }
            </div>
            <div className='flex gap-2 p-4 flex-wrap'>
                {/* ***********EMOJI************* */}
                <span
                    className={(gifView == 'emoji' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('emoji')}
                >
                    <img src='/_next/static/media/0.f5ccf354.gif' alt="" className='h-full' />
                </span>
                {/* ***********EMOJI 02************* */}
                <span
                    className={(gifView == 'emoji2' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('emoji2')}
                >
                    <img src={emojiGif2?.src} alt="" className='h-full' />
                </span>

                {/* ***********OTHERS****************** */}
                <span
                    className={(gifView == 'others' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('others')}
                >
                    <img src='/_next/static/media/others%20(1).26ce2553.gif' alt="" className='h-full' />
                </span>

                {/* ***********CAT ANIMAL****************** */}
                <span
                    className={(gifView == 'catAnimal' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('catAnimal')}
                >
                    <img src={catAnimal?.src} alt="" className='h-full' />
                </span>

                {/* ***********LOVE GIF****************** */}
                <span
                    className={(gifView == 'loveGif' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('loveGif')}
                >
                    <img src={loveGif?.src} alt="" className='h-full' />
                </span>

                {/* ******************ROSE GIF************* */}
                <span
                    className={(gifView == 'roseGif' ? 'btn-disabled bg-primary text-white' : 'btn-outline ') + " btn btn-primary btn-xs "}
                    onClick={() => viewGifHandle('roseGif')}
                >
                    <img src={roseGif?.src} alt="" className='h-full' />
                </span>

                {/* ***********************CLOSE BUTTON*************** */}
                <span
                    className='btn btn-xs text-white bg-red-600 hover:bg-red-500'
                    onClick={closeCloseSectionHandle}
                >
                    X
                </span>

            </div>

        </div>
    );
};

export default GifIndex;