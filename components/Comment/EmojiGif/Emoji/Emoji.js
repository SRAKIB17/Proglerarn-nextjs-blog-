/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from './emoji.module.css'
const Emoji = ({ props: { selectEmoji, setSelectEmoji } }) => {
    const selectEmojiHandle = (path) => {
        setSelectEmoji(path)
    }

    const cache = []
    const getM = require.context('../../../../public/emojis/emojis', true, /\.(htm|html|js|css|gif|png)$/, 'sync');
    getM.keys().forEach(element => {
        const moduleEmoji = getM(element)
        cache.push(moduleEmoji)
    });
    return (
        <div>
            <div className={styles?.emoji}>
                {
                    cache?.map((moduleEmoji, index) =>
                        <div key={index}>
                            <span
                                className={(selectEmoji == moduleEmoji?.default?.src ? "btn btn-disabled bg-primary" : " btn btn-primary btn-outline")}
                                onClick={() => selectEmojiHandle(moduleEmoji?.default?.src)}
                            >
                                <img src={moduleEmoji?.default?.src} alt="" className='h-full' />
                            </span>
                        </div>
                    )
                }
            </div>
        </div>
    );
};



export default Emoji;