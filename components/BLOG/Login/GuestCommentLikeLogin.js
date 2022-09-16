/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import bgLogin from '../../public/loginBg.jpg'

const GuestCommentLikeLogin = () => {

    return (
        <div  className='pb-4 pt-5 rounded-md flex items-center justify-center top-[60px] bg-base-100 shadow-md right-[-200px]' id='autoLoginShow'>
            <div className="w-full max-w-[400px] mx-auto lg:max-w-xl " >
                <div className="p-4 border-dashed border-4 rounded-md flex max-w-xs mx-auto flex-col gap-2"  style={{ backgroundImage: `url(${bgLogin?.src})`, backgroundSize: 'cover' }}>
                    <div>
                        <input type="text" placeholder="email" id='emailComment' className="input input-xs input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div>
                        <input type="text" placeholder="password" id='passwordComment' className="input-xs input input-bordered input-primary max-w-xs w-full" />

                    </div>
                    <div className="flex flex-col">
                        <button className="btn btn-primary btn-xs text-white">Login</button>
                    </div>
                    <label className="label">
                        <a className=" label-text-alt link-hover text-xs text-white" href='/login'>
                            Create Account
                        </a>
                    </label>

                </div>

            </div>
        </div>
    );
};

export default GuestCommentLikeLogin;