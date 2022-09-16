import React, { useEffect, useRef, useState } from 'react';
import { PreviewOff, PreviewOn } from '../../../ReactRSIcon';
import shortcutEmmetHtmlTagsAttr from '../../hooks/Emmet/shortcutEmmetHtmlTagsAttr';
import styles from './TextArea.module.css';
import useUploadCodePost from '../../hooks/uploader/useUploadCodePost'

const TextAreaCode = ({ props: { cssTextareaRef, jsTextareaRef, textareaRef } }) => {

    const shortcutKeyboard = (e) => {
        // setLiveView(e.target.value)
        // liveSettingAddScriptHandler()
    }
    const onchangeInput = (e) => {
        // setLiveView(e.target.value);
        // liveSettingAddScriptHandler()
        heightAutoHandle(e)
        shortcutEmmetHtmlTagsAttr(e, textareaRef)
    }

    const [liveOff, setLiveOff] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)
    const [layoutForm, setLayoutForm] = useState(0);
    const [dragging, setDragging] = useState([]);
    const [windowHeight, setWindowHeight] = useState('');
    const [rotate, setRotate] = useState(false);
    const [liveView, setLiveView] = useState('');
    let saveData = ''
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        saveData = JSON.parse(window.localStorage.getItem('saveBody'));
        setWindowHeight(window.innerHeight);
        setLayoutForm(window.innerWidth / 2);
        setWindowWidth(window.innerWidth);
    }, [saveData])

    const liveOffHandle = () => {
        setLiveOff(!liveOff)
    }
    const rotateHandle = () => {
        if (rotate) {
            setDragging([])
            setRotate(!rotate)
        }
        else {
            setDragging([])
            setWindowWidth(0)
            setLayoutForm(window.innerWidth - 200);
            setRotate(!rotate)
        }
    }

    const dragStart = (e) => {
        e.preventDefault();
        setWindowHeight(window.innerHeight)
        setLayoutForm(window.innerWidth / 2);
        setWindowWidth(window.innerWidth);
        setDragging([...dragging, e.clientX]);
    }

    const [dragSeparate, setDraggingSeparate] = useState();
    const heightAutoHandle = (e) => {
        // liveSettingAddScriptHandler()
        const livePreview = document.querySelector('#livePreview')
        livePreview.style.height = 'auto';
        setWindowHeight(window.innerHeight - 50)
        const iframe = document.getElementById('liveViewIframe');
        onloadIframeHeightStylesHandle()
        //---------------------- for iframe ---------/
        try {
            if (e.target.scrollHeight <= windowHeight) {

                iframe.style.height = e.target.scrollHeight + 'px';
                livePreview.style.height = e.target.scrollHeight + 'px'
                e.target.style.height = e.target.scrollHeight + 'px'
                setDraggingSeparate(e.target.scrollHeight + 'px')
            }
            else {
                iframe.style.height = windowHeight + 'px';
                livePreview.style.height = windowHeight + 'px'
                e.target.style.height = windowHeight + 'px'
                setDraggingSeparate(windowHeight + 'px')
            }

        }
        catch {
            iframe.style.height = windowHeight + 'px';
            livePreview.style.height = windowHeight + 'px'
            e.target.style.height = windowHeight + 'px'
            setDraggingSeparate(windowHeight + 'px')
        }

    }


    const onloadIframeHeightStylesHandle = () => {
        try {
            let link = document.createElement("link");
            link.href = "/api/styleIframe.css";
            link.rel = "stylesheet";
            link.type = "text/css";
            const iframe = document.getElementById('liveViewIframe')
            iframe.contentDocument.head.append(link);

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
        catch {

        }
    }

    //*8******************************************************* for show hide css, js ,html code editor******************************************************
    const [htmlEdit, setHtmlEdit] = useState(true);
    const [jsEdit, setJsEdit] = useState(false);
    const [CssEdit, setCssEdit] = useState(false);
    const handleCssJsHtmlEditor = (editMode) => {
        const htmlEditDiv = document.getElementById('htmlEdit');
        const cssEditDiv = document.getElementById('cssEdit');
        const jsEditDiv = document.getElementById('jsEdit');

        switch (editMode) {
            case 'html':
                setHtmlEdit(true)
                setCssEdit(false)
                setJsEdit(false)
                htmlEditDiv.style.display = 'block'
                cssEditDiv.style.display = 'none'
                jsEditDiv.style.display = 'none'
                break;
            case 'css':
                setCssEdit(true)
                setJsEdit(false)
                setHtmlEdit(false)
                htmlEditDiv.style.display = 'none'
                cssEditDiv.style.display = 'block'
                jsEditDiv.style.display = 'none'
                break;
            case 'js':
                setJsEdit(true)
                setHtmlEdit(false)
                setCssEdit(false)
                htmlEditDiv.style.display = 'none'
                cssEditDiv.style.display = 'none'
                jsEditDiv.style.display = 'block'
                break;

            default:
                break;
        }
    }

    // UPLOAD CODE //
    const { code, codeUploaderHandle, message } = useUploadCodePost();
    useEffect(() => {
        if (htmlEdit) {
            textareaRef.current.value = code
        }
        else if (jsEdit) {
            jsTextareaRef.current.value = code
        }
        else if (CssEdit) {
            cssTextareaRef.current.value = code
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code])

    const showHintUploadCodeHandler = () => {
        const getHints = document.getElementById('showCodeHints')
        if (getHints.style.display == 'block') {
            getHints.style.display = 'none';
        }
        else if (getHints.style.display == 'none' || !getHints.style.display) {
            getHints.style.display = 'block'
        }
    }





    const liveSettingAddScriptHandler = () => {
        const
            postBody = textareaRef.current.value,
            postBodyCss = cssTextareaRef.current.value,
            postBodyJs = jsTextareaRef.current.value

        const defaultTemplate =
            `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="/api/styleIframe.css?video=video" rel="stylesheet" type="text/css">
<link rel="stylesheet" href="/code_highlight_with_jquery/jhighlight/jquery.highlight.css">\
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Coming+Soon&family=Fira+Code&family=Hind+Siliguri:wght@500&family=Lateef&family=Open+Sans:wght@300;500&family=Orbitron&family=Poppins:wght@500&display=swap');
          html,
          body {
            color:black !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
            font-family: 'Poppins', sans-serif;
            text-align: justify;
            background-color: transparent;
          }
       

          body * :not(pre *){
            overflow-y: auto !important;
            overflow-x: auto !important;
            overflow: auto !important;
          }
          body::-webkit-scrollbar:not(pre)  {
            display: none !important;
          }


          body * ::-webkit-scrollbar {
            width: 5px !important;
            height: 10px !important;
          }

          *::-webkit-scrollbar-thumb {
            background-color: rgb(183, 183, 183) !important;
            border-radius: 10px !important;
          }



          .plaintext {
            word-wrap: break-word !important;
            white-space: pre-line !important;
          }

         
          
          /* ************ FOR VIDEO POST********** */

          iframe,
          video,
          embed,
          object {
             width: 100% !important;
             margin-bottom: 2px;
             height: auto !important;
          }
    </style>
    <style>
         ${postBodyCss}
    </style>
</head>
<body>
    ${postBody}
    <script>
        ${postBodyJs}
    </script>
    <script type="text/javascript" src="/code_highlight_with_jquery/universal/jquery.js"></script>
    <script src="/code_highlight_with_jquery/jhighlight//jquery.highlight.js"></script>
    <script src="/code_highlight_with_jquery/index.js"></script>
</body>
</html>
`

        setLiveView(defaultTemplate)
    }

    useEffect(() => {
        textareaRef.current.value = `
<div class="plaintext">
    <!--  Note: If you write HTML then delete the following code and write  -->
    <!-- write here plain text  -->
</div>
        `
        document.onkeyup = function (e) {
            if (e.key == 'Control') {
                e.preventDefault()
                // isCtrl = false;
            }
        }

        document.onkeydown = async function (e) {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault()
                liveSettingAddScriptHandler();
                return false;
            }
        }
    }, [])



    return (
        <div className='m-1'>
            <div className='flex'>
                <li onClick={liveOffHandle} className='btn btn-warning btn-xs text-white m-4'>

                    {
                        liveOff ? <PreviewOn size='22' /> : <PreviewOff size='22' />

                    }
                </li>
                <li onClick={rotateHandle} className='btn btn-warning btn-xs text-white m-4 hidden sm:flex w-fit'>
                    Rotate
                    {
                        rotate ? ' On' : ' Off'
                    }
                </li>
            </div>
            <div className='border  rounded-md p-1 border-primary'>
                <div>
                    <div>
                        <p className='text-xs p-1'>
                            Note: If you write HTML then delete the following code and write
                        </p>
                    </div>
                    <div className='flex gap-3 p-2 items-center'>
                        <div className={(htmlEdit ? 'text-white disabled' : ' btn-outline  ') + ' btn btn-xs btn-secondary'} onClick={() => handleCssJsHtmlEditor('html')}>
                            html
                        </div>

                        <div className={(CssEdit ? 'text-white disabled' : ' btn-outline  ') + ' btn btn-xs btn-secondary'} onClick={() => handleCssJsHtmlEditor('css')}>
                            css
                        </div>
                        <div className={(jsEdit ? 'text-white disabled' : ' btn-outline  ') + ' btn btn-xs btn-secondary'} onClick={() => handleCssJsHtmlEditor('js')}>
                            js
                        </div>
                        <div className='flex items-center'>
                            <kbd className="kbd kbd-sm">ctrl</kbd>
                            +
                            <kbd className="kbd kbd-sm">s </kbd>
                            <p className='ml-1 text-sm'>
                                or
                            </p>
                        </div>
                        <div className={' btn btn-xs btn-info text-white'} onClick={() => liveSettingAddScriptHandler()}>
                            Run
                        </div>

                    </div>
                    {/* ********************UPLOAD A CODE ****************************** */}
                    <div className='flex items-center gap-3 relative'>
                        <label className="  btn btn-primary btn-xs font-light text-white m-2">
                            <input type="file" name="image_file" id="uploader" className='form-control absolute top-[-10000px] p-3' onChange={(e) => codeUploaderHandle(e)} />
                            <span>Select a file</span>
                        </label>

                        <div>
                            <p className='cursor-pointer btn btn-xs btn-outline' onMouseEnter={showHintUploadCodeHandler} onMouseLeave={showHintUploadCodeHandler}>
                                ℹ️
                            </p>
                            <p className='absolute bg-base-300 p-4 w-52 text-xs rounded-3xl hidden' id='showCodeHints'>
                                File type: * html, * js, * css, * text
                            </p>
                        </div>
                        <div>
                            <p className='text-2xs'>
                                {message}
                            </p>
                        </div>
                    </div>
                </div>

                <div className={'flex flex-col ' + (rotate ? 'sm:flex-col ' : 'sm:flex-row ')}>
                    <div
                        className={
                            styles.textareaForm + ' ' +
                            (liveOff ? styles.liveOffTextForm : '')
                        }
                        style={{ maxWidth: `${dragging[dragging.length - 2] || layoutForm}px`, width: '100%' }}>


                        <div id='htmlEdit'>
                            <textarea ref={textareaRef}
                                id='textForm'
                                className='input border-primary w-full font-mono'
                                name="postBody"
                                onBlur={onchangeInput}
                                onKeyUp={(e) => shortcutKeyboard(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={heightAutoHandle}
                                onPaste={heightAutoHandle}
                                onDrop={heightAutoHandle}
                                onKeyDown={heightAutoHandle}
                            // defaultValue={saveData}
                            >

                            </textarea>
                        </div>
                        <div id='cssEdit' className='hidden'>
                            <textarea ref={cssTextareaRef}
                                id='textForm'
                                className='input border-primary w-full font-mono'
                                name="postBody"
                                onBlur={onchangeInput}
                                onKeyUp={(e) => shortcutKeyboard(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={heightAutoHandle}
                                onPaste={heightAutoHandle}
                                onDrop={heightAutoHandle}
                                onKeyDown={heightAutoHandle}
                            // defaultValue={saveData}
                            >

                            </textarea>
                        </div>
                        <div id='jsEdit' className='hidden'>
                            <textarea ref={jsTextareaRef}
                                id='textForm'
                                className='input border-primary w-full font-mono'
                                name="postBody"
                                onBlur={onchangeInput}
                                onKeyUp={(e) => shortcutKeyboard(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={heightAutoHandle}
                                onPaste={heightAutoHandle}
                                onDrop={heightAutoHandle}
                                onKeyDown={heightAutoHandle}
                                defaultValue={saveData}
                            >
                            </textarea>
                        </div>
                    </div>
                    <div
                        draggable='true'
                        style={{ height: dragSeparate }}

                        className={
                            (liveOff ? styles.liveOff : ' ') +

                            ' sm:w-2 hidden ml-1 mr-1 sm:h-auto bg-base-300 rounded-lg cursor-col-resize ' +
                            (rotate ? 'sm:hidden' : 'sm:block')
                        }
                        onDrag={dragStart}>
                    </div>
                    <div className='divider sm:hidden p-0 m-0'>
                    </div>
                    <div
                        id='livePreview'
                        className={
                            (styles.liveView) +
                            ' overflow-x-hidden h-auto border  p-1 '
                            + (liveOff ? styles.liveOff : ' ')
                        }

                        style={{ maxWidth: (rotate ? (windowWidth - 200) : `${(windowWidth - dragging[dragging.length - 2] || layoutForm)}px`), width: '100%' }}
                    >
                        <iframe
                            allow="fullscreen"
                            allowFullScreen
                            onLoad={onloadIframeHeightStylesHandle}
                            src='/api/preview'
                            srcDoc={liveView}
                            className={styles.livePreviewScrollBarHide + ' w-full'}
                            id='liveViewIframe' frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextAreaCode;