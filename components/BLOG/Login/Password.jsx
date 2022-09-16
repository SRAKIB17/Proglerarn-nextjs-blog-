import React, { useState } from 'react';
import { PreviewOff, PreviewOn } from '../../ReactRSIcon';

const Password = ({ PasswordCheckHandler }) => {
    // FOR SHOW PASSWORD HANDLER USESTATE;
    const [showPass, setShowPass] = useState(false)
    const showPasswordHandler = () => {
        setShowPass(!showPass)
    }
    return (
        <>
            <div className='relative'>
                <input
                    onKeyUp={PasswordCheckHandler}
                    type={showPass ? 'text' : "password"}
                    id='password'
                    placeholder="password"
                    className="input rounded-3xl input-bordered border-primary w-full"
                    required
                />
                <div className='absolute top-[30%] right-0 mr-5'>
                    <div className='cursor-pointer' onClick={showPasswordHandler}>
                        {

                            showPass ? <PreviewOff size='20' /> : <PreviewOn size='20' />
                        }
                    </div>
                </div>

            </div>
        </>
    );
};

export default Password;