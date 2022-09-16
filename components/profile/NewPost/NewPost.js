/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image'
import ImageUpload from './ImageUpload';


import styles from './NewPost.module.css'
import QuickPost from './QuickPost';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router'
import { UserFullInfoProvider } from '../../../pages/_app';
import usePrivatePageCheckUser from '../../hooks/checkUser/privatePageCheckUser';


const NewPost = ({ props: setNewPost }) => {
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);
    const asPath = useRouter()?.asPath
    usePrivatePageCheckUser(asPath)
    const [quickVideoPost, setQuickVideoPost] = useState(false);
    const [quickTextPost, setQuickTextPost] = useState(true);
    const textareaRef = useRef();
    const jsTextareaRef = useRef()
    const cssTextareaRef = useRef()
    function closeNewPost() {
        // document.getElementById("newPostClose").style.width = "0";
        setNewPost(null)
    }


    // ---------------------------------------------JSON object sent backend-----------------------------------------
    const [NewPostLoading, setNewPostLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState('')
    const [thumbnailData, setThumbnailData] = useState('');
    const [errMsg, setErrMsg] = useState('')
    const postHandle = async (event) => {
        setNewPostLoading(true)
        event.preventDefault();
        let postRefMode = '';
        if (quickTextPost) {
            postRefMode = 'text'
        }
        else if (quickVideoPost) {
            postRefMode = 'video'
        }

        const tags = event.target.tags.value.toLowerCase()?.split(',')?.map(tag => {
            return tag?.trim()
        }).join(',')
        const post = {
            userID: user_details?.userID,
            post_id: '',
            post_title: event.target.title.value,
            thumbnail: thumbnail,
            image: '',
            time: new Date(),
            short_description: event.target.short_description.value,
            category: event.target.category.value?.toLowerCase(),
            tags: tags,
            postBody: textareaRef.current.value,
            postBodyCss: cssTextareaRef.current.value,
            postBodyJs: jsTextareaRef.current.value,
            postBy: event?.target?.postBy?.value || 'user',
            // tags: event.target.tags.value.split(','),
            postRefMode: postRefMode,
            //for comment react replies
            comments: [],
            react: [],
            bookmarkUserID: []
        }



        try {
            const { data } = await axios.post(`/api/post/create-post?email=${user_details?.email}`, post,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                });

            if (data?.message === 'success') {
                setErrMsg(<p className='text-green-600'>Success</p>)
                setNewPost(null)
                if (data?.result?.acknowledged) {
                    event.target.reset()
                    setThumbnail('')
                    setNewPost(null)
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
    const [disableBtn, setDisableBtn] = useState(true)
    const disabledBtnLength = (e) => {
        const length = e.target.value.trim().length;
        if (length >= 200 && length <= 500) {
            setDisableBtn(false)
        }
        else {
            setDisableBtn(true)
        }
    }
    const ShortDescriptionRef = useRef();
    const onchangeInput = (e) => {
        disabledBtnLength(e)
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

    const { data } = useQuery(['categoryAll'], () => axios.get(`/api/category`,
        {
            headers: { access_token: sessionStorage.getItem('accessAutoG') }
        }
    ))
    const categoryPattern = data?.data?.map(i => i?.category).join('|')

    return (
        <div>

            <div id="newPostClose" className={styles.NewPostNav + ' bg-base-100'} style={{ width: '100%' }}>
                {
                    NewPostLoading &&
                    <div className=' w-60 mx-auto '>

                        <div className='fixed top-[50%] flex justify-center p-5 h-[100vh] z-50'>
                            <div className='animate-spin text-center border-r-4 w-40 h-40 rounded-[50%] border-red-600'>
                            </div>
                        </div>
                    </div>
                }
                <a href="#" className={styles.closebtn} onClick={closeNewPost}>&times;</a>

                <div>
                    <QuickPost props={{ quickVideoPost, setQuickVideoPost, quickTextPost, setQuickTextPost, textareaRef }} />
                </div>
                <div>
                    <div className='m-6 bg-info text-white p-3 rounded-md max-w-sm font-serif'>

                        <p className='font-mono'>

                            {
                                quickVideoPost && <code>{` tips: .<vid or .<ifr or .<emb use for shortcut html tag.`}</code>

                            }

                        </p>
                        <p>
                            Support html and css

                        </p>
                        <p>
                            Note: See Documentation. Help {'>'} Documentation
                        </p>
                    </div>
                    <form action="" onSubmit={postHandle} className='flex flex-col gap-2 m-10'>
                        <p className='text-red-600'>
                            {
                                errMsg
                            }
                        </p>
                        {
                            isAdmin?.admin &&
                            <select name="postBy" id="selectPostBy" className="select select-primary w-full max-w-xs" defaultValue=''>
                                <option value="admin">Admin</option>
                                <option value="user" selected>User</option>
                            </select>
                        }

                        <input
                            type="text"
                            name="title"
                            id="PostTitle"
                            className='input input-primary form-control w-56 sm:w-80'
                            placeholder='Title'
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
                                className='input input-success form-control w-56 sm:w-80'
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
                            {
                                quickVideoPost ||
                                <>
                                    <ImageUpload props={{ setThumbnail, setThumbnailData }} />

                                    <div className='shadow-md w-fit p-2'>
                                        <img src={thumbnail} className='max-w-xs max-h-[100px] rounded-md' alt="" />
                                    </div>
                                </>
                            }

                        </div>
                        <input
                            list='categories'
                            type="text"
                            name="category"
                            id="category"
                            className='input input-primary form-control w-56 sm:w-80'
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
                                className='input input-primary form-control w-56 sm:w-80'
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
                        {/* <TextArea props={{ cssTextareaRef, jsTextareaRef, textareaRef }} /> */}
                        <input type="submit" value="Post" className='btn rounded-3xl btn-sm btn-primary text-white w-fit' disabled={disableBtn} />
                    </form>

                </div>
            </div>

        </div>
    );
};

export default NewPost;