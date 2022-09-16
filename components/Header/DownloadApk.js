import React, { useEffect } from 'react';
import { ApkColor, GooglePlayBadge } from '../ReactRSIcon/index'
import styles from './DownloadApk.module.css'

const DownloadApk = () => {
    useEffect(() => {
        const getApkSessionStorage = window.sessionStorage.getItem('apkHide') || window.localStorage.getItem('apkHide');
        if (getApkSessionStorage === 'true') {
            document.getElementById('downloadApkSocial').style.left = '-900px'
        }
    }, [])
    const closeOneTimeGooglePlayBadge = () => {
        window.sessionStorage.setItem('apkHide', true);
        document.getElementById('downloadApkSocial').style.left = '-900px'

    }
    
    return (
        <div className={styles.onlyTransitionDownloadAPk + ' relative left-1 lg:ml-[67px] mt-2 bg-base-300 w-full max-w-[400px] rounded-md shadow-md'} id='downloadApkSocial'>
            <div className='p-1 flex items-center gap-2'>
                <ApkColor size='70' />
                <div>
                    <a href="#" onClick={closeOneTimeGooglePlayBadge} className='absolute top-0 right-3 hover:text-[grey] text-3xl'>&times;</a>
                </div>
                <div>
                    <h1>
                        <a href="" className='text-2xl'>
                            Get It For Android User
                        </a>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default DownloadApk;