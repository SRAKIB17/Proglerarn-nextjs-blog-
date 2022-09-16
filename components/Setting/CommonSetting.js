import React, { useEffect, useState } from 'react';

const CommonSetting = () => {
    const [hideApk, setHideApk] = useState(false);
    const [hideNabBarMobile, setNabBarMobile] = useState(false);
    const hideAndroidAppsHandle = (e) => {
        if (e.target.checked) {
            window.localStorage.setItem('apkHide', true);
            setHideApk(true)
        }
        else {
            setHideApk(false)
            window.localStorage.removeItem('apkHide');
        }
    }

    const hideMobileNabBarHandler = (e) => {
        if (e.target.checked) {
            window.localStorage.setItem('hideMobileNabBar', true);
            setNabBarMobile(true)
        }
        else {
            setNabBarMobile(false)
            window.localStorage.removeItem('hideMobileNabBar');
        }
    }
    useEffect(() => {
        const getApkSessionStorage = window.localStorage.getItem('apkHide');
        const hideMobileNab = window.localStorage.getItem('hideMobileNabBar');



        try {
            const getHeader = document.getElementById('header');
            const getHeaderBottomMargin = document.getElementById('topHeaderMargin');
            if (window.innerWidth <= 640) {
                if (hideMobileNab === 'true') {
                    setNabBarMobile(true)
                    getHeaderBottomMargin.className = ''
                    getHeader.className = 'h-[60px] w-full border-b-2 bg-base-100 z-[150] sticky top-0'
                }
                else {
                    setNabBarMobile(false)
                    getHeader.className = 'h-[60px] w-full border-b-2 bg-base-100 z-[150] fixed top-0'
                    getHeaderBottomMargin.className = 'mb-[60px]'
                }
            }

            if (getApkSessionStorage === 'true') {
                document.getElementById('downloadApkSocial').style.left = '-900px';
                setHideApk(true)
            }
        }
        catch {

        }

    }, [hideApk, hideNabBarMobile])
    return (
        <div>
            <div className='shadow-md h-full max-w-md mx-auto p-4 rounded-md'>
                <h1 className='text-primary text-xl text-center p-4'>Common Settings</h1>
                <div>
                    {/* for   Hide the Android apps link until I want to */}
                    <div className="form-control shadow-md p-2 rounded-md">
                        <label className="label cursor-pointer">
                            <span className="label-text">
                                Hide the Android apps link until I want to
                            </span>
                            <input
                                type="checkbox"
                                onClick={hideAndroidAppsHandle}
                                className="toggle toggle-primary"
                                defaultChecked=''
                                checked={hideApk}
                            />
                        </label>
                    </div>
                    <div className="form-control shadow-md p-2 rounded-md">
                        <label className="label cursor-pointer">
                            <span className="label-text">
                                When scroll  Hide the Navbar (its works only mobile device)
                            </span>
                            <input
                                type="checkbox"
                                onClick={hideMobileNabBarHandler}
                                className="toggle toggle-primary"
                                checked={hideNabBarMobile}
                                defaultChecked=''
                            />
                        </label>
                    </div>
                    <div className="form-control shadow-md p-2 rounded-md">
                        <label className="label cursor-pointer">
                            <span className="label-text">
                                Hide the Android apps link until I want to
                            </span>
                            <input
                                type="checkbox"
                                onClick={hideAndroidAppsHandle}
                                defaultChecked=''
                                className="toggle toggle-primary"
                            />
                        </label>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CommonSetting;