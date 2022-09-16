
export default async function handler(req, res) {
  const { post_id } = req.query;
  const { postBody } = req.body

  try {

    const codeCopyJsCode = `
    const codes = document.getElementsByTagName('code');
    for (const code of codes) {
        code.style.width = '100%';
        const div = document.createElement('div');
        const codeDiv = "<div class='codeParent'><button onclick='copyCodeHandle()' class='copyBtn'>Copy</button><div class='codePreview'><textarea class='textCode' style='white-space: pre;' readonly>" + code.innerHTML + "</textarea></div></div>"
        div.innerHTML = codeDiv;
        code.textContent = '';
        code.appendChild(div);
    }
    const copyCodeHandle = () => {
        const getCode = event.target.parentElement.querySelector('textarea')
        getCode.select()
        document.execCommand('copy')
        const copyMsg = event.target;
        copyMsg.innerText = 'Copied'
        setTimeout(() => {
            copyMsg.innerText = 'Copy'
        }, 500);
    }
`
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    const { js } = req.query;
    if (js === 'code-copy') {
      res.write(codeCopyJsCode);
    }
    else {
      res.writeHead(200, { 'Content-Type': 'text/css' });
      res.write("defaultStyle");
    }
    res.end();
  }
  finally {

  }
}
