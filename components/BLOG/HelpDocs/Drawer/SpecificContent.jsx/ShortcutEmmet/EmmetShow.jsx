import React, { useEffect, useState } from 'react';

const EmmetShow = ({ emmet, code, des, index, language }) => {
    const [theme, setTheme] = useState('');
    useEffect(() => {
        setTheme(localStorage.getItem('heighLightTheme'))
    }, [code])

    const docs =
        `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/code_highlight_with_jquery/jhighlight/jquery.highlight.css">
    <style>
        *{
            font-size: 1rem;
        }
        *::-webkit-scrollbar {
            width: 5px;
            height: 5px;
        }

        pre {
            overflow: scroll;
            width: 100%;
            height: 100%;
        }

        *::-webkit-scrollbar-thumb {
            background-color: rgb(183, 183, 183);
            border-radius: 10px;
        }

        *::-webkit-scrollbar-button {
            height: 70px;
            visibility: hidden;
        }
    </style>
</head>

<body>
    <pre class="code" data-language="${language}">
        ${code}
    </pre>
    <script type="text/javascript" src="/code_highlight_with_jquery/universal/jquery.js"></script>
    <script src="/code_highlight_with_jquery/jhighlight//jquery.highlight.js"></script>
    <script src="/code_highlight_with_jquery/index.js"></script>
</body>

</html>
`

    const iframeOnloadHeight = (e) => {
        const iframe = e.target
        iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
    }

    return (
        <div className='md:ml-4 p-2 z-0'>
            <div className='m-4'>
                <div className='flex items-center font-mono'>
                    <h1 className='mr-1'>
                        {index}.
                    </h1>
                    <h1 className=' font-extrabold bg-gray-200 w-fit pl-2 pr-2 rounded-md'>
                        {emmet}
                    </h1>
                </div>
                <p className='pt-2'>
                    {des}
                </p>
            </div>
            <div>
                <iframe
                    onLoad={iframeOnloadHeight}
                    srcDoc={docs}
                    frameBorder="0"
                    className='h-auto w-full'
                >
                </iframe>
            </div>
        </div>
    );
};

export default EmmetShow;