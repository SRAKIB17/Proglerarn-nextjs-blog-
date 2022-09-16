/* eslint-disable @next/next/no-img-element */
import IframeLoading from '../../public/loading_iframe.gif'
import React, { useEffect, useState } from 'react';
import { Camera } from '../ReactRSIcon';
import { useRouter } from 'next/router';

const TextPost = ({ short_description, postBody, postBodyJs, postBodyCss, post_id, postRefMode, thumbnail, showCommentState, setShowComment }) => {
    //********************************************************************************* */
    // FOR MORE INFO /FULL POST SHOW BY ONCLICK AND.
    //********************************************************************************** */
    const [fullIframeShow, setFullIframeShow] = useState(false);
    const [iframeLoading, setIframeLoading] = useState(false)
    const autoHeightHandle = async (id) => {
        setIframeLoading(true)
        try {
            const iframe = document.getElementById('previewIframeHeight' + id);
            // console.log(iframe.contentDocument.documentElement.scrollHeight)

            let link = document.createElement("link");
            link.href = "/api/styleIframe.css";
            link.rel = "stylesheet";
            link.type = "text/css";
            let darkStyle = document.createElement("link");
            const darkMode = window.localStorage.getItem('dark')
            if (darkMode) {
                darkStyle.href = "/api/styleIframe.css?dark=true";
            }
            else {
                darkStyle.href = "/api/styleIframe.css?dark=false";
            }
            darkStyle.rel = "stylesheet";
            darkStyle.type = "text/css";
            let count = 0
            const showIframe = setInterval(() => {
                iframe.contentDocument.head.append(link);
                iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
                if (count === 6) {
                    clearInterval(showIframe)
                }
                count++
            }, 100);
            setIframeLoading(false)
        }
        catch {
            setIframeLoading(false)
        }

    }
    //****************************************************************************************** */
    //*WHEN IFRAME LOAD / PAGE RELOAD THEN AUTO MATIC THIS FUNCTION RUN AND HEADER ADD CSS STYLES
    //*1. VIDEO, DARK, LIGHT, (API/LINK/ BY POST ID)
    //****************************************************************************************** */
    const onloadIframeHeightStylesHandle = (e) => {
        let link = document.createElement("link");
        link.href = "/api/styleIframe.css";
        link.rel = "stylesheet";
        link.type = "text/css";
        e.target.contentDocument.head.append(link);


        //****************FOR JS COPY CODE ************* */
        const script = document.createElement("script");
        script.src = "/api/styleIframe.js?js=code-copy";
        script.async = true;

        e.target.contentDocument.head.append(script);
        e.target.contentDocument.body.append(script);

        let darkStyle = document.createElement("link");
        const darkMode = window.localStorage.getItem('dark')
        if (darkMode) {
            darkStyle.href = "/api/styleIframe.css?dark=true";
        }
        else {
            darkStyle.href = "/api/styleIframe.css?dark=false";
        }
        darkStyle.rel = "stylesheet";
        darkStyle.type = "text/css";
        let count = 0
        const iframe = e.target

        const showIframe = setInterval(() => {
            try {
                iframe.contentDocument.head.append(link);
            }
            catch {

            }
            if (count === 6) {
                try {
                    // e.target.width = document.getElementById('postBodyCode' + e.target.id?.slice(19)).offsetWidth - 30;
                    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
                    iframe.style.display = 'none'
                }
                catch {

                }
                clearInterval(showIframe)
            }
            count++
        }, 100);
        e.target.contentDocument.head.append(darkStyle);
    }
    // ******************************************* TOGGLE BUTTON AND SHOW OR HIDE IFRAME POST ************
    const showIframeDisplayHandle = (id) => {
        autoHeightHandle(id)
        const iframe = document.getElementById('previewIframeHeight' + id);
        setFullIframeShow(!fullIframeShow)
        showCommentHandle(id)
        if (fullIframeShow) {
            iframe.style.display = 'none';
        }
        else {
            iframe.style.display = 'block';
        }


        let darkStyle = document.createElement("link");
        const darkMode = window.localStorage.getItem('dark')
        if (darkMode) {
            darkStyle.href = "/api/styleIframe.css?dark=true";
        }
        else {
            darkStyle.href = "/api/styleIframe.css?dark=false";
        }
        darkStyle.rel = "stylesheet";
        darkStyle.type = "text/css";
        iframe.contentDocument.head.append(darkStyle);
    }

    //************************************************************************************ */
    //********************FOR COMMENT AUTO SHOW AND SHOW********************************** */
    //************************************************************************************ */
    const showCommentHandle = (id) => {
        try {

            const showComment = document.getElementById('commentShow' + id)
            const commentForm = document.getElementById('commentForm' + id)
            const showCommentButton = document.getElementById('showCommentButton' + id)

            if (showComment.offsetHeight <= 2 && !fullIframeShow) {
                commentForm.style.height = '100%'
                setShowComment(true)
                try {
                    commentForm.childNodes[0].childNodes[0].style.borderTopWidth = '1px'
                }
                catch {

                }
                showComment.style.height = '500px'
                showCommentButton.className = 'btn-primary btn btn-xs  ml-2 '
            }
            else {
                setShowComment(false)
                showComment.style.height = '0px'
                commentForm.style.height = '0px'
                showCommentButton.className = ' btn-outline btn btn-xs btn-primary ml-2 '
                commentForm.childNodes[0].childNodes[0].style.borderTopWidth = '0px'
            }
        }
        catch {

        }
    }

    const iframePostFullBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="/api/styleIframe.css" rel="stylesheet" type="text/css">
        <link href="/api/styleIframe.css?video=video" rel="stylesheet" type="text/css">
        <style>
        ${postBodyCss}
        </style>
    </head>
    <body>
        ${postBody}
        <script>
            ${postBodyJs}
        </script>
        <script src="/api/styleIframe.js?js=code-copy"></script>
    </body>
    </html>
    `

    useEffect(() => {
        window.onclick = () => {
            try {
                const iframes = document.getElementsByTagName('iframe');
                for (const iframe of iframes) {
                    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px'
                }
            }
            catch {

            }
        }
    }, [])

    const router = useRouter();



    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    return (
        <div className='mx-auto' id={'textPost' + post_id}>


            {/* ---------post body ----------------- */}
            <div className={' w-full h-fit transition-all text-justify'} id={'postBody' + post_id} style={{ width: '100%' }}>
                <div className='w-full'>
                    <div className='float-left'>
                        {/* ----thumbnail------------ */}
                        {
                            (postRefMode === 'text' && thumbnail) ?
                                <div className='mr-4'>
                                    <figure>
                                        <img
                                            src={thumbnail}
                                            alt=""
                                            className='max-w-[200px] h-[200px] md:max-w-[250px] md:h-[160px] rounded-md border-2'
                                        />
                                    </figure>
                                </div>
                                :
                                <div className='mr-4'>
                                    <Camera size='150' className="border-2 rounded-md" />
                                </div>
                        }
                    </div>
                    {/* style={{ width: '100%', wordWrap: "break-word", whiteSpace: 'pre-line' }} */}
                    <div>
                        {
                            short_description?.slice(0, 1000)
                        }
                    </div>

                </div>

                <div className='clear-both'>
                    {
                        fullIframeShow &&
                        <div className="card-actions justify-end">
                            <button className="link-primary font-semibold link-hover text-xs" onClick={() => showIframeDisplayHandle(post_id)}>
                                See Less
                            </button>
                        </div>
                    }

                    {
                        iframeLoading &&
                        <div className='flex justify-center items-center p-4'>
                            <img src={IframeLoading?.src} alt="" />
                        </div>
                    }

                    <iframe
                        // onUnload={unloadIframeHandle}
                        srcDoc={iframePostFullBody}
                        onLoad={onloadIframeHeightStylesHandle}
                        src={'/api/preview/' + post_id}
                        id={'previewIframeHeight' + post_id}
                        frameBorder="0"
                        scrolling="no"
                        height='0'
                        className='w-full'
                    >
                    </iframe>
                </div>
            </div>

            {/* ------------see more -------------------- */}
            {/* 
                                <div className="card-actions justify-end">
                                    <button className="link-primary font-semibold link-hover text-xs" onClick={() => profileNavigate('/story/' + post_id)}>
                                        See More
                                    </button>
                                </div> */}

            <div className="card-actions justify-end">
                <button className="link-primary font-semibold link-hover text-xs" onClick={() => showIframeDisplayHandle(post_id)}>
                    See {fullIframeShow ? 'Less' : 'More'}
                </button>
            </div>


            {/* ----thumbnail------------ */}
            {/* {
                (postRefMode === 'text' && thumbnail) &&
                <div className='mt-4 mb-4'>
                    <figure>
                        <img src={thumbnail} alt="" className='w-full h-[200px] lg:h-[240px] rounded-md' />
                    </figure>
                </div>
            } */}
        </div>
    );
};

export default TextPost;