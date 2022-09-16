/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

const LoginAutoShow = () => {
    setTimeout(() => {
        try {
            const getAutoShowLoginPage = sessionStorage.getItem('autoLoginShowFrom')
            if (!getAutoShowLoginPage) {
                document.getElementById('autoLoginShow').style.right = '0px'
                document.getElementById('autoLoginShow').style.top = '60px'

            }
        }
        catch {

        }
    }, 5000);

    const hiddenAutoLoginShow = () => {
        document.getElementById('autoLoginShow').style.right = '-500px'
        sessionStorage.setItem('autoLoginShowFrom', true)
    }
    return (
        <div>
            <div id='autoLoginShow'>
                <div className="w-full max-w-[400px] mx-auto lg:max-w-xl ">
                    <div>
                        <a href="#" onClick={hiddenAutoLoginShow} className='relative top-1 left-2 text-2xl hover:text-[grey]'>&times;</a>

                    </div>
                    <div className="p-4 m-1 border-dotted border-4 rounded-md flex flex-col gap-2">
                        <div>
                            <input type="text" id='autoShowLoginEmail' placeholder="email" className="input input-xs input-bordered input-primary " />
                        </div>
                        <div>
                            <input type="text" id='autoShowLoginPassword' placeholder="password" className="input-xs input input-bordered input-primary " />

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
        </div>
    );
};

export default LoginAutoShow;