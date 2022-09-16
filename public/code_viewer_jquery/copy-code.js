const getPre = document.getElementsByTagName("pre")
for (const pre of getPre) {
    const button = document.createElement('button');

    const texarea = document.createElement('textarea')

    const br = document.createElement('br')

    const createTheme = document.createElement('link')
    createTheme.rel = "stylesheet"
    createTheme.type = 'text/css'
    createTheme.media = 'screen'

    const changeThemeHandle = event => {
        const theme = event.target.value
        createTheme.href = "./themes/css/" + theme
        document.head.appendChild(createTheme)
    }

    const changeTheme = document.getElementById('changeTheme')
    changeTheme.onchange = changeThemeHandle

    if (!(pre.parentElement == document.body)) {
        const parentElement = pre.parentElement
        parentElement.style.display = 'flex';
        button.style.width = 'fit-content'


        parentElement.style.flexDirection = 'column-reverse'

        button.innerText = 'copy'
        button.addEventListener('click', (event) => {
            const buttonParent = event.target.parentElement
            const texareaCode = buttonParent.querySelector('textarea')
            texareaCode.select()
            document.execCommand('copy')
        })
        texarea.innerHTML = pre.innerText;
        texarea.style.position = 'absolute'
        texarea.style.left = '-10000000000000000px'
        texarea.cp
        button.classList.add('copyCodeButton')
        parentElement.append(texarea)
        parentElement.append(button)

    }

}