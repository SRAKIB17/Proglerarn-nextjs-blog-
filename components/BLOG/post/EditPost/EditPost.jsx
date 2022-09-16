/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import ImageUpload from './ImageUpload';


import styles from './NewPost.module.css'
import QuickPost from './QuickPost';
import { useQuery } from 'react-query';
import Router, { useRouter } from 'next/router'
// import { UserFullInfoProvider } from '../../../pages/_app';
// import usePrivatePageCheckUser from '../../hooks/checkUser/privatePageCheckUser';
import TextAreaCode from './TextAreaCode';
import { UserFullInfoProvider } from '../../../../pages/_app';
import usePrivatePageCheckUser from '../../../hooks/checkUser/privatePageCheckUser';
import LoadingSpin from '../../../LoadingSpin';
import NotFound from '../../NotFound';


const EditPost = ({ post }) => {
    const { _id, category, tags, postBy, postBodyCss, postBodyJs, postBody, postRefMode, post_id, post_title, short_description, sort, time, userID } = post


    const router = useRouter()
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);
    // const asPath = useRouter()?.asPath
    // usePrivatePageCheckUser(asPath)

    const textareaRef = useRef();
    const jsTextareaRef = useRef()
    const cssTextareaRef = useRef()




    // const 


    // ---------------------------------------------JSON object sent backend-----------------------------------------
    const [NewPostLoading, setNewPostLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailData, setThumbnailData] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const [disableBtn, setDisableBtn] = useState(true)


    // ********************************
    const titleRef = useRef();
    const ShortDescriptionRef = useRef();
    const adminRef = useRef()
    const catRef = useRef();
    const tagsRef = useRef();
    //**************************************************************************************************************** */
    useEffect(() => {
        try {
            setDisableBtn(false)
            adminRef.current.value = postBy
            titleRef.current.value = post_title

            ShortDescriptionRef.current.value = short_description;
            setThumbnail(post?.thumbnail)
            catRef.current.value = category;
            tagsRef.current.value = tags

            textareaRef.current.value = postBody
            jsTextareaRef.current.value = postBodyJs
            cssTextareaRef.current.value = postBodyCss
        }
        catch {

        }
    }, [post])



    const postHandle = async (event) => {
        setNewPostLoading(true)
        event.preventDefault();


        const tags = event.target.tags.value.toLowerCase()?.split(',')?.map(tag => {
            return tag?.trim()
        }).join(',')
        const post = {
            userID: userID,
            post_id: '',
            post_title: event.target.title.value,
            thumbnail: thumbnail,
            time: new Date(),
            short_description: event.target.short_description.value,
            category: event.target.category.value?.toLowerCase(),
            tags: tags,
            postBody: textareaRef.current.value,
            postBodyCss: cssTextareaRef.current.value,
            postBodyJs: jsTextareaRef.current.value,
            postBy: event?.target?.postBy?.value || 'user',
            comments: [],
            react: [],
            bookmarkUserID: []
        }


        try {
            const { data } = await axios.put(`/api/post/update-post?email=${user_details?.email}&post_id=${post_id}&user_id=${userID}`, post,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                });
            if (data?.message === 'success') {
                setErrMsg(<p className='text-green-600'>Success</p>)
                if (data?.result?.acknowledged) {
                    event.target.reset()
                    router.replace('/profile')
                }
            }
            else if (data?.message === 'error') {
                setErrMsg(<p className='text-red-600'>{data?.error}</p>)
            }
        }
        finally {
            setNewPostLoading(false)

        }
    }


    // ----------------------------------------------for short_description --------------------------------
    const disabledBtnLength = (e) => {
        const length = e.target.value.trim().length;
        if (length >= 200 && length <= 500) {
            setDisableBtn(false)
        }
        else {
            setDisableBtn(true)
        }
    }
    const onchangeInput = (e) => {

        autoHightIncreaseShortDescription(e)
    }

    const autoHightIncreaseShortDescription = (e) => {
        disabledBtnLength(e)
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < 200) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = 200 + 'px'
        }
    }

    let isCtrl = false;
    useEffect(() => {
        document.onkeyup = function (e) {
            if (e.key == 'Control') {
                e.preventDefault()
                isCtrl = false;
            }
        }

        document.onkeydown = async function (e) {
            // if (e.key == 'Control') isCtrl = true;
            // if (e.key == 's' && isCtrl == true) {
            //     e.preventDefault()
            //     // const getPostBody = textareaRef.current.value;
            //     // window.localStorage.setItem('saveBody', JSON.stringify(getPostBody))
            //     return false;
            // }
        }
    }, [])

    // ***************************************for category **********************

    const { data } = useQuery(['categoryAll'], () => axios.get(`/api/post/category`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))
    const categoryPattern = data?.data?.map(i => i?.category).join('|')
    // if (!user?.user) {
    //     return <div className='min-h-screen'>
    //         <LoadingSpin />
    //     </div>
    // }

    if (!(isAdmin?.admin || (user?.user && user_details?.userID === post?.post_id?.split('-')?.[1]))) {
        return <NotFound />
    }


    return (
        <div className='m-6'>
            <div id="newPostClose" className=' bg-base-100'  >
                {
                    NewPostLoading &&
                    <div className=' w-60 mx-auto '>

                        <div className='fixed top-[50%] flex justify-center p-5 h-[100vh] z-50'>
                            <div className='animate-spin text-center border-r-4 w-40 h-40 rounded-[50%] border-red-600'>
                            </div>
                        </div>
                    </div>
                }

                <div>

                    <div className='bg-info text-white text-xs  p-2 w-fit rounded-sm'>
                        Note: See Documentation.
                        <a href='/docs' target='_blank' className='text-primary ml-2 link-hover'>
                            Documentation
                        </a>
                    </div>


                    <form action="" onSubmit={postHandle} className='flex flex-col gap-4'>
                        <p className='text-red-600'>
                            {
                                errMsg
                            }
                        </p>
                        {
                            // isAdmin?.admin &&
                            <select name="postBy" ref={adminRef} id="selectPostBy" className="select border-primary w-full max-w-xs" defaultValue=''>
                                <option value="admin">Admin</option>
                                <option value="user" selected>User</option>
                            </select>
                        }

                        <input
                            type="text"
                            name="title"
                            id="PostTitle"
                            className='input border-primary form-control w-56 sm:w-80'
                            placeholder='Title'
                            ref={titleRef}
                            required
                        />


                        <div>
                            <p className='text-[10px] pt-2 p-1 text-primary'>Max Length 500:</p>
                            <textarea ref={ShortDescriptionRef}
                                name="short_description"
                                id="short_description"

                                maxLength='500'
                                minLength='150'
                                size='500'
                                placeholder='Short description'
                                className='input border-primary form-control w-56 sm:w-80'
                                onBlur={onchangeInput}
                                onKeyUp={(e) => disabledBtnLength(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={autoHightIncreaseShortDescription}
                                onPaste={autoHightIncreaseShortDescription}
                                onDrop={autoHightIncreaseShortDescription}
                                onKeyDown={autoHightIncreaseShortDescription}
                                required
                            >
                            </textarea>
                        </div>
                        <div>
                            <ImageUpload props={{ setThumbnail, setThumbnailData }} />

                            <div className='shadow-md w-fit p-2 m-2 rounded-md'>
                                <img src={thumbnail} className='max-w-xs max-h-[100px] rounded-md' alt="" />
                            </div>
                        </div>
                        <input
                            list='categories'
                            type="text"
                            name="category"
                            ref={catRef}
                            id="category"
                            className='input border-primary form-control w-56 sm:w-80'
                            placeholder='Category'
                            // pattern={categoryPattern}
                            // title={'Must be ' + (data?.data?.map(i => i?.category))}
                            required
                        />
                        <datalist id="categories">
                            {
                                data?.data?.map((i, index) =>
                                    <option key={index} value={i?.category}></option>
                                )
                            }
                        </datalist>

                        <div>
                            <input
                                type="text"
                                name="tags"
                                id="tags"
                                ref={tagsRef}
                                className='input border-primary form-control w-56 sm:w-80'
                                placeholder='Tags (separate with comma)'
                                required
                            />
                            {/* <p className='m-2 text-warning'>
                                Note: If you offline or next time edit this post please
                                <kbd className="kbd ml-1">ctrl</kbd>
                                +
                                <kbd className="kbd">s</kbd>
                            </p> */}
                        </div>
                        <TextAreaCode props={{ cssTextareaRef, jsTextareaRef, textareaRef }} />
                        <input
                            type="submit"
                            value="Update"
                            className='btn rounded-3xl btn-sm btn-primary text-white w-fit'
                            disabled={disableBtn}
                        />
                    </form>

                </div>
            </div>

        </div >
    );
};

export default EditPost;