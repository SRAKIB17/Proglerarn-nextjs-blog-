import React, { useState } from 'react';

const CodeHighLight = () => {
    const [theme, setTheme] = useState('')
    const changeThemeHandle = (event) => {
        const theme = event.target.value
        setTheme(theme)

    }

    const saveChangeTheme = (e) => {
        e.preventDefault()
        window.localStorage.setItem('heighLightTheme', theme)
        alert('save change')
    }
    const docs =
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link href="/code_viewer_jquery/themes/css/${theme ? theme : 'blackboard.css'}" rel="stylesheet" type="text/css" media="screen">
    <style>
        *::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }
        pre{
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
<pre data-language="css">

/**
* styles for blackboard theme
 */
pre {
  background: #0B1022;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  margin: 0px;
  padding: 0px;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  margin-bottom: 20px;
}

pre,
code {
  font-family: 'Monaco', courier, monospace;
}

pre .comment {
  color: #727272;
}

pre .constant {
  color: #D8FA3C;
}

pre .storage {
  color: #FBDE2D;
}

pre .string {
  color: #61CE3C;
}

pre .keyword,
pre .selector {
  color: #FBDE2D;
}

pre .parent {
  font-style: italic;
}

pre .entity {
  color: #FF6400;
}

pre .support {
  color: #8DA6CE;
}

/**
* styles for blackboard theme
*/
pre {
  background: #0B1022;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
  margin: 0px;
  padding: 0px;
  padding: 10px;
  color: #fff;
  font-size: 14px;
  margin-bottom: 20px;
}

pre,
code {
  font-family: 'Monaco', courier, monospace;
}

pre .comment {
  color: #727272;
}

pre .constant {
  color: #D8FA3C;
}

pre .storage {
  color: #FBDE2D;
}

pre .string {
  color: #61CE3C;
}

pre .keyword,
pre .selector {
  color: #FBDE2D;
}

pre .parent {
  font-style: italic;
}

pre .entity {
  color: #FF6400;
}

pre .support {
  color: #8DA6CE;

}
</pre>
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

</html>

</body>

`

    return (
        <div>
            <div className='grid grid-cols-12 gap-4 mt-10 p-4'>
                <div id="changeThemeForm" className='col-span-12 md:col-span-6 lg:col-span-4 ' >
                    <form onSubmit={saveChangeTheme}>
                        <select name="" id="changeTheme" onChange={changeThemeHandle} className="select  rounded-none rounded-l-md select-primary">
                            <option value="all-hallows-eve.css">HALLOWS</option>
                            <option value="blackboard.css">BLACKBOARD</option>
                            <option value="dreamweaver.css">DREAMWEAVER</option>
                            <option value="espresso-libre.css">ESPRESSO libre</option>
                            <option value="github.css">GITHUB</option>
                            <option value="kimbie-dark.css">KIMBIE dark</option>
                            <option value="kimbie-light.css">KIMBIE Light</option>
                            <option value="monokai.css">MONOKAI</option>
                            <option value="obsidian.css">OBSIDIAN</option>
                            <option value="paraiso-dark.css">PARAISO-dark</option>
                            <option value="paraiso-light.css">PARAISO-light</option>
                            <option value="pastie.css">PASTIE</option>
                            <option value="rainbow.css">RAINBOW</option>
                            <option value="solarized-dark.css">SOLARIZED dark</option>
                            <option value="solarized-light.css">SOLARIZED light</option>
                            <option value="sunburst.css">SUNBURST</option>
                            <option value="tomorrow-night.css">TOMORROW-night</option>
                            <option value="tricolore.css">TRICOLORE</option>
                            <option value="twilight.css">TWILIGHT</option>
                            <option value="zenburnesque.css">ZENBURNESQUE</option>
                        </select>
                        <button className='btn btn-primary rounded-none rounded-r-md'>
                            Save
                        </button>
                    </form>
                </div>
                <div className='col-span-12 md:col-span-6 lg:col-span-8 rounded-md'>
                    <h1 className='text-2xl text-primary p-4'>Preview</h1>
                    <iframe srcDoc={docs} frameBorder="0" className='w-full h-80'></iframe>
                </div>
            </div>
        </div>
    );
};

export default CodeHighLight;