/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import IframeImportDefault from '../hooks/IframeImportDefault';

const SinglePostBody = ({ post }) => {
    const { _id, comments, category, image, postBodyCss, postBodyJs, postBody, postRefMode, post_id, post_title, short_description, thumbnail, time, userID } = post


    //********************************************************************************* */
    // FOR MORE INFO /FULL POST SHOW BY ONCLICK AND.
    //********************************************************************************** */

    const [iframeLoading, setIframeLoading] = useState(false)
    const autoHeightHandle = async (id) => {
        setIframeLoading(true)
        try {
            const iframe = document.getElementById('previewIframeHeight' + id);
            // console.log(iframe.contentDocument.documentElement.scrollHeight)


            let count = 0
            const showIframe = setInterval(() => {

                iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
                if (count === 10) {
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
        let count = 0

        const iframe = e.target
        const iframeAutoHeight = () => {
            const iframes = document.getElementsByTagName('iframe');
            for (const iframe of iframes) {
                iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px'
            }
        }
        iframe.contentWindow.onmousemove = () => {
            iframeAutoHeight()
        }
        iframe.contentWindow.onresize = () => {
            iframeAutoHeight()
        }
        iframe.contentWindow.onclick = (e) => {
            iframeAutoHeight()
        }
        const showIframe = setInterval(() => {

            if (count === 6) {
                try {
                    // e.target.width = document.getElementById('postBodyCode' + e.target.id?.slice(19)).offsetWidth - 30;
                    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
                }
                catch {

                }
                clearInterval(showIframe)
            }
            count++
        }, 100);
    }


    const [theme, setTheme] = useState('');
    useEffect(() => {
        setTheme(localStorage.getItem('heighLightTheme'))
    }, [])





    const { iframePostFullBody } = IframeImportDefault({ post: post })
 


    const router = useRouter();



    const navigate = (path) => {
        router.replace(path)
    }
    return (
        <div>

            <div>
                <div className='clear-both'>


                    {
                        iframeLoading &&
                        <div className='flex justify-center items-center p-4'>
                            <img src='/loading_iframe.gif' alt="" />
                        </div>
                    }

                    <iframe
                        srcDoc={iframePostFullBody}
                        onLoad={onloadIframeHeightStylesHandle}
                        src={'/api/preview/' + post_id}
                        id={'iframePostPreview' + post_id}
                        frameBorder="0"
                        scrolling="no"
                        height='0'
                        className='w-full'
                    >
                    </iframe>
                </div>
            </div>

        </div>
    );
};

export default SinglePostBody;