import { useEffect, useMemo, useState } from "react";

const IframeImportDefault = ({ post, fullIframeShow = false }) => {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    // setTheme(localStorage.getItem('heighLightTheme'))
  }, [])


  const { postBody, postBodyCss, postBodyJs } = post

  const colorFullTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link href="/code_viewer_jquery/copy-code.css" rel="stylesheet" type="text/css"/>

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
              body:first-child {
                /*  word-wrap: break-word;
                white-space: pre-line !important; */
              }
              body *{
                overflow-y: auto !important;
                overflow-x: auto !important;
                overflow:auto !important;
              }
    
              body::-webkit-scrollbar:not(pre)  {
                display: none !important;
              }
    
    
              body * ::-webkit-scrollbar {
                width: 5px !important;
                height: 5x !important;
              }
    
              *::-webkit-scrollbar-thumb {
                background-color: rgb(183, 183, 183) !important;
                border-radius: 10px !important;
              }
    
    
    
              .plaintext {
                word-wrap: break-word !important;
                white-space: pre-line !important;
              }
    
              *::-webkit-scrollbar-thumb  {
                background-color: rgb(183, 183, 183) !important;
                border-radius: 10px !important;
              }
    
              *::-webkit-scrollbar-button {
                visibility: hidden;
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

        <link href="/code_viewer_jquery/themes/css/${theme ? theme : 'blackboard.css'}" rel="stylesheet" type="text/css" media="screen">
        <style>
            pre::-webkit-scrollbar {
              width: 5px;
              height: 5px;
            }
            pre{
              overflow: scroll;
              height: 100%;
            	line-height: 20px;
            }
            *::-webkit-scrollbar-thumb {
              background-color: rgb(183, 183, 183);
              border-radius: 10px;
            }

            *::-webkit-scrollbar-button {
              height: 70px;
              visibility: hidden;
            }
            .copyCodeButton {
                border: 1px solid #dbdbdb;
                border-radius: .375em;
                box-shadow: none;
                box-sizing: border-box;
                cursor: pointer;
                padding: calc(.5em - 1px) 1em;
                text-align: center;
                touch-action: manipulation;
                margin: 3px;
                background-color: #0080ff;
                color: white;
                font-size: 12px;

            }

            .copyCodeButton:active {
                background-color: #3096fc;
                border-color: #4a4a4a;
                outline: 1px #F90143 solid;
            }

            .copyCodeButton:focus {
                border-color: #485fc7;
            }

            .copyCodeButton:hover {
                border-color: #b5b5b5;
            }

            .copyCodeButton:focus:not(:active) {
                box-shadow: rgba(72, 95, 199, .25) 0 0 0 .125em;
            }
        </style>

    </head>
    <body>
        ${postBody}
        <script>
            ${postBodyJs}
        </script>



    <script src="/code_viewer_jquery/dist/rainbow.js"></script>
    <script src="/code_viewer_jquery/src/language/generic.js"></script>

    <!-- FOR C LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/c.js"></script>

    <!-- FOR CoffeeScript LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/coffeescript.js"></script>

    <!-- FOR C Sharp LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/csharp.js"></script>

    <!-- FOR CSS LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/css.js"></script>

    <!-- FOR D LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/d.js"></script>

    <!-- FOR GO LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/go.js"></script>

    <!-- FOR Haskell LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/haskell.js"></script>

    <!-- FOR Html LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/html.js"></script>

    <!-- FOR JAVASCRIPT LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/javascript.js"></script>

    <!-- FOR JSON LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/json.js"></script>

    <!-- FOR Lua LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/lua.js"></script>

    <!-- FOR PHP LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/php.js"></script>

    <!-- FOR Python LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/python.js"></script>

    <!-- FOR R LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/r.js"></script>

    <!-- FOR RUBY LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/ruby.js"></script>

    <!-- FOR RUBY LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/scheme.js"></script>

    <!-- FOR RUBY LANGUAGE -->
    <script src="/code_viewer_jquery/src/language/shell.js"></script>

    <script>
       // const getPre = document.getElementsByTagName("pre")
       // for (const pre of getPre) {
       //     const button = document.createElement('button');
       // 
       //     const textarea = document.createElement('textarea');
       //     
       //     if (!(pre.parentElement == document.body)) {
       //         const parentElement = pre.parentElement
       //         parentElement.style.display = 'flex';
       //         button.style.width = 'fit-content'
       //     
       //     console.log(parentElement)
       //         parentElement.style.flexDirection = 'column-reverse'
       //     
       //         button.innerText = 'copy'
       //         button.addEventListener('click', (event) => {
       //             const buttonParent = event.target.parentElement
       //             const textareaCode = buttonParent.querySelector('textarea')
       //             textareaCode.select()
       //             document.execCommand('copy')
       //         })
       //         textarea.innerHTML = pre.innerText;
       //         textarea.style.position = 'absolute'
       //         textarea.style.left = '-10000000000000000px'
       //         textarea.cp
       //         button.classList.add('copyCodeButton')
       //         parentElement.append(textarea)
       //         parentElement.append(button)
       //     
       //     }
       // 
       // }
    </script>

    </body>
    </html>
    `


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
            height: 5px !important;
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
  const [iframePostFullBody, setIframePostFullBody] = useState('')
  useEffect(() => {
    const getTemplate = localStorage.getItem('postCodeTemplate');
    if (getTemplate === 'Colorful Template') {
      setIframePostFullBody(colorFullTemplate)
    }
    else {
      setIframePostFullBody(defaultTemplate)
    }
  }, [post])

  return { iframePostFullBody }
};

export default IframeImportDefault;