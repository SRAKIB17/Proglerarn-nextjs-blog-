/* eslint-disable @next/next/no-img-element */
import React, { useContext, useState } from 'react';
import axios from 'axios'
import { useRouter } from 'next/router';


import { PreviewOff, PreviewOn } from '../../ReactRSIcon';
import { UserFullInfoProvider } from '../../../pages/_app';
import LoadingFlowCircle from '../../LoadingFlowCircle';
import Email from './Email';
import Password from './Password';
import NameGender from './NameGender';


const RegisterFormFixed = () => {
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider)

    const router = useRouter();
    const { return_url } = router.query
    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    const [loginLoading, setLoginLoading] = useState(false)


    const [register, setRegister] = useState(true);
    const registerHandleButton = () => {
        setRegister(!register)
    }

    // ********************** FOR LOGIN EMAIL PATTERN CHECK*************************
    const [checkingEmail, setCheckingEmail] = useState(true)
    const emailCheckHandler = (e) => {
        const check = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(e.target.value)
        if (check) {
            setCheckingEmail(false)
            e.target.className = 'input rounded-3xl input-bordered input-primary w-full'
        }
        else {
            setCheckingEmail(true)
            e.target.className = 'input rounded-3xl input-bordered input-secondary w-full text-secondary'
        }

    }

    const [checkingPassword, setCheckingPassWord] = useState(true)
    const PasswordCheckHandler = (e) => {
        const check = (e.target.value)
        const getLastValue = e.target.value.slice(check.length - 1)

        if (check?.length >= 6) {
            setCheckingPassWord(false)
            e.target.className = 'input rounded-3xl input-bordered input-primary w-full'
        }
        else {
            setCheckingPassWord(true)
            e.target.className = 'input rounded-3xl input-bordered input-secondary w-full text-secondary'
        }

    }



    const resetPassword = () => {
        setRegister(!register)
    }
    const [errMsg, setErrMsg] = useState('')
    const loginOrRegisterHandler = async (e) => {
        setLoginLoading(true)
        e.preventDefault()
        const email = e.target.email.value.toLowerCase();
        const password = e.target.password.value;
        let data = undefined;
        try {
            // (A). IF USER REGISTER THIS IS LOGIN SYSTEM
            if (register) {
                const form = {
                    email, password
                }
                data = await axios.post('/api/login_signup/login', form, {
                    headers: { access_token: sessionStorage.getItem('accessAutoG') }
                });
            }

            //(B). IF USER ARE NEW HERE REGISTER SYSTEM
            else if (!register) {
                const form = {
                    email, password, name: e.target.name.value, gender: e.target.gender.value
                }
                data = await axios.post('/api/login_signup/signup', form, {
                    headers: { access_token: sessionStorage.getItem('accessAutoG') }
                });

            }
            //IF USER SUCCESSFULLY LOGIN OR SIGNUP THIS CONDITION RUN AND SAVE LOCALSTORAGE AND COOKIES
            if (data?.data?.message === 'success') {
                const { token, login_info } = data?.data;
                localStorage.setItem('token', token)
                document.cookie = (`login=${login_info}`)
                setErrMsg('Welcome')
                location.reload()
                navigate(return_url ? return_url : '/')

            }
            if (data?.data?.message === 'error') {
                setErrMsg(data?.data?.error);
                localStorage.removeItem('token')
                document.cookie = `login=`
            }
            setLoginLoading(false)
        }
        catch {
            setLoginLoading(false)
        }

    }



    return (
        <div className='flex items-center '>
            <div className='hidden md:block md:w-[50%]'>
                <img src={register ? "/login/sign_in.svg" : '/login/sign_up.svg'} alt="" className='w-full' />
            </div>
            <div id="loginFixedForm" className='w-full mt-4 md:w-[50%] '>
                <div>
                    {/* FOR LOADING FOR LOGIN */}
                    {
                        loginLoading &&
                        <div className=' relative flex items-center justify-center z-[1000]'>
                            <div className='absolute top-0 pb-40 pt-40'>
                                <LoadingFlowCircle />
                            </div>
                        </div>
                    }
                    <div>
                        <div className="w-full max-w-[400px] mx-auto h-[100vh] lg:max-w-xl">
                            <h1 className='text-center text-2xl font-bold text-primary'>
                                {
                                    register ? 'Sign In' : 'Register'
                                }
                            </h1>
                            <div className='p-8'>
                                <form className=" flex gap-4 flex-col " onSubmit={loginOrRegisterHandler}>
                                    <p className='text-red-300'>
                                        {
                                            errMsg
                                        }
                                    </p>
                                    {
                                        register ||
                                        <>
                                            <NameGender />
                                        </>
                                    }

                                    <Email emailCheckHandler={emailCheckHandler} />
                                    <Password PasswordCheckHandler={PasswordCheckHandler} />

                                    <div className="flex flex-col">
                                        <button className={((checkingEmail || checkingPassword) ? 'btn-disabled bg-gray-600' : "") + " btn btn-primary rounded-3xl text-lg text-white font-light"} >
                                            {
                                                register ? 'Login' : 'Register'
                                            }
                                        </button>
                                    </div>
                                </form>
                                {
                                    register &&
                                    <label className="label">
                                        <button className="text-sm label-text-alt link-hover text-primary font-light">
                                            Forgot password? (this is coming soon)
                                        </button>
                                    </label>
                                }
                                <label className="label">

                                    <button onClick={registerHandleButton} className="text-sm label-text-alt link-hover text-primary font-light">
                                        {
                                            !register ? "Already have an account →" : " Create a account →"
                                        }
                                    </button>
                                </label>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};



export default RegisterFormFixed;