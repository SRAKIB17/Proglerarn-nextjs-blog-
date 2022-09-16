import React, { useEffect, useRef, useState } from 'react';
import styles from '../profile/NewPost/NewPost.module.css'
import CommonSetting from './CommonSetting';

const Settings = () => {



    return (
        <div>
            <div id="SettingsMenu" style={{ overflow: 'hidden', paddingTop: '0px' }} className=' bg-base-100 '>
                <div className='mt-[60px] pb-[70px] border-t-2 h-full overflow-auto p-4 hideScrollBar'>
                    <div>
                        {/*-------------------------- for Documentation  -----------------*/}
                        <CommonSetting />
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Settings;