/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { ApkColor, Refresh } from '../ReactRSIcon';
import styles from './mobileAndroid.module.css'

const Mobile = () => {
    const [url, setUrl] = useState('/story')
    const onSearchHandle = (e) => {
        e.preventDefault()
        setUrl(e.target.url.value);
        onloadIframeHeightStylesHandle()
    }

    const onloadIframeHeightStylesHandle = () => {

        let count = 0
        const iframe = document.getElementById("mobileApk")

        const showIframe = setInterval(() => {
            if (count === 6) {
                try {
                    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 100 + 'px';
                }
                catch {

                }
                clearInterval(showIframe)
            }
            count++
        }, 100);
    }
    return (
        <div>
            <div className={styles.mobile + ' overflow-hidden'} >
                <div className=''>
                    <div className={styles.speaker}>
                        <div>
                            ○ ○ ○
                        </div>
                    </div>
                    <div className={styles.apk} >
                        <ApkColor size='28' />
                    </div>
                </div>
                <div className='p-1 overflow-auto h-full pt-10'>
                    <form onSubmit={onSearchHandle}>
                        <input type="text" name="url" id="" className='text-black' defaultValue={url} />
                    </form>
                    <iframe src={url} frameBorder="0" height='300' id='mobileApk'></iframe>
                </div>
                <div className={styles.refresh}>
                    <div>
                        <button onClick={onloadIframeHeightStylesHandle}>
                            <Refresh color='white' />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Mobile;