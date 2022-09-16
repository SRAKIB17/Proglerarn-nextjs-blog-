import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import useUploadCode from '../../hooks/Uploader/useUploadCode';

const CreateCdnCode = ({ props: setCdn }) => {
    const codeRef = useRef()
    const { user, user_details } = useContext(UserFullInfoProvider)
    // usePrivatePageCheckUser('/profile');
    // AUTO HEIGHT TEXTAREA FORM
    const shortcutKeyboard = (e) => {
        // classTagShortcutInput(e, textareaRef)
    }
    const onchangeInput = (e) => {
        heightAutoHandle(e)
    }
    const heightAutoHandle = (e) => {
        const innerHeight = window.innerHeight
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < innerHeight) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = innerHeight + 'px'
        }
    }
    const heightDescriptionHandle = (e) => {
        const innerHeight = 200
        if (e.target.scrollHeight < innerHeight) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = innerHeight + 'px'
        }
    }

    const { code, codeUploaderHandle, message } = useUploadCode();
    useEffect(() => {
        codeRef.current.value = code
    }, [code])

    const [errMsg, setErrMsg] = useState('');
    const [newCodeLoading, setNewCodeLoading] = useState(null)
    const submitCodeHandle = async (e) => {
        setNewCodeLoading(true)
        e.preventDefault()
        const codeBody = {
            code_id: '',
            code_title: e.target.code_title.value?.toLowerCase(),
            code: codeRef?.current?.value,
            content_type: e.target.content_type.value,
            time: new Date(),
            userID: user_details?.userID,
            code_des: e.target.code_des.value
        }
        try {
            const { data } = await axios.post(`/api/services/cdn/cdn?email=${user_details?.email}`, codeBody,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                });
            console.log(data)
            if (data?.message === 'success') {
                setNewCodeLoading(false)
                setErrMsg(<p className='text-green-600'>Success</p>)
                setCdn('list')
                if (data?.result?.acknowledged) {
                    setCdn('list')
                }
            }
            else if (data?.message === 'error') {
                setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            }


        }
        catch {
            setNewCodeLoading(false)
        }
        finally {
            setNewCodeLoading(false)
        }
    }


    // show info

    const showHintUploadCodeHandler = () => {
        const getHints = document.getElementById('codeCdnHints')
        if (getHints.style.display == 'block') {
            getHints.style.display = 'none'
        }
        else if (getHints.style.display == 'none' || !getHints.style.display) {
            getHints.style.display = 'block'
        }
    }

    return (
        <div className='min-h-screen bg-base-100'>
            <div className='p-4'>
               
                <form onSubmit={submitCodeHandle} className="flex flex-col gap-1 pt-3">
                    <div>
                        <p className='text-gray-500 text-sm'>
                            Code Title:
                        </p>
                    </div>
                    <p className='text-red-600'>
                        {
                            errMsg
                        }
                    </p>
                    <div>
                        <input
                            type="text"
                            name='code_title'
                            className='input input-success font-mono input-sm w-fit'
                            required
                        />
                    </div>
                    <div className='pt-1'>
                        <p className='text-gray-500 text-sm'>
                            Code Description: (optional)
                        </p>
                    </div>
                    <div>
                        <textarea
                            onBlur={heightDescriptionHandle}
                            onKeyUp={(e) => heightDescriptionHandle(e)}
                            onChange={heightDescriptionHandle}
                            onInput={heightDescriptionHandle}
                            onCut={heightDescriptionHandle}
                            onPaste={heightDescriptionHandle}
                            onDrop={heightDescriptionHandle}
                            onKeyDown={heightDescriptionHandle}
                            name='code_des'
                            className='input input-success font-mono input-sm w-fit'
                        />
                    </div>
                    <div>
                        <p className='text-gray-500 text-sm'>
                            Code Type:
                        </p>
                    </div>
                    <select name="content_type" id="" className='select select-sm select-primary w-fit' required>
                        <optgroup label="Code Type" />
                        <option value="text/plain">Plain Text</option>
                        <option value="text/html">Html</option>
                        <option value="text/css">CSS</option>
                        <option value="text/javascript">Javascript</option>
                        <option value="application/xml">XML</option>
                        <option value="application/json">JSON</option>
                        {/* <option value="application/json">JSON</option> */}
                    </select>
                    <div>
                        <p className='text-gray-500 text-sm'>
                            Paste Your Code:
                        </p>
                    </div>
                    <div className='flex items-center gap-3 relative'>
                        <label className="  btn btn-primary btn-sm font-extralight text-white mb-2">
                            <input type="file" name="image_file" id="uploader" className='form-control absolute top-[-10000px] p-3' onChange={(e) => codeUploaderHandle(e)} />
                            <span>Select a file</span>
                        </label>

                        <div>
                            <p className='cursor-pointer btn btn-xs btn-outline' onMouseEnter={showHintUploadCodeHandler} onMouseLeave={showHintUploadCodeHandler}>
                                ℹ️
                            </p>
                            <p className='absolute bg-base-300 p-4 w-52 text-xs rounded-3xl hidden' id='codeCdnHints'>
                                File type: * html, * js, * css, * text, *json, *xml
                            </p>
                        </div>
                        <div>
                            <p className='text-2xs'>
                                {message}
                            </p>
                        </div>
                    </div>
                    <div>
                        <textarea ref={codeRef}
                            className='input input-success w-full font-mono'
                            name="commentBody"
                            onBlur={onchangeInput}
                            onKeyUp={(e) => shortcutKeyboard(e)}
                            onChange={onchangeInput}
                            onInput={onchangeInput}
                            onCut={heightAutoHandle}
                            onPaste={heightAutoHandle}
                            onDrop={heightAutoHandle}
                            onKeyDown={heightAutoHandle}
                            required
                        >
                        </textarea>
                    </div>
                    <div>
                        {
                            newCodeLoading ?
                                <span
                                    className='btn btn-sm relative btn-primary'
                                >
                                    Saving
                                    <p className='absolute animate-spin border-b-2 border-red-900 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </span>
                                :
                                <button className='btn btn-sm btn-secondary'>
                                    Save
                                </button>
                        }
                    </div>

                </form>
            </div>
        </div>
    );
};

export default CreateCdnCode;