import Attributes from "../../HelpDocs/hooks/HtmlAttributes";
import htmlTags from "../../HelpDocs/hooks/HtmlTagsEmmetList";



const classTagShortcutInput = (e,textareaRef) => {
        
    const startPoint = e.target.selectionStart;
    const Text = textareaRef.current.value;
    const endsText = Text.substring(startPoint);
    classTagAutoEmmetFind(textareaRef, startPoint, endsText)
   
    e.target.setSelectionRange(startPoint, startPoint)
}
// finding class or html tag

const classTagAutoEmmetFind = async (textareaRef,startPoint) => {

    const Text = textareaRef.current.value;
    const endsText = Text.substring(startPoint);
    const AttribList = Attributes;


    
    // for Attribe list 
    const findAttr = AttribList.find(attr => Text.endsWith(attr.attEmmet, startPoint))
    if(findAttr){
        const getAttr = findAttr.attFull;
        textareaRef.current.value = Text.substring(0, Text.lastIndexOf(findAttr.attEmmet)) + `${getAttr}=" "`+endsText
    }

    // || bgColorClassList.find(clas => Text.endsWith(clas, startPoint)) || textColorList.find(clas => Text.endsWith(clas, startPoint))

    // for html tag
    const htmlTagsList = htmlTags;
    const findHtmlTag = htmlTagsList.find(tag=>Text.endsWith(tag.tagEmmet, startPoint))
    
    if(findHtmlTag){
        const htmlCode = findHtmlTag.tagCode;
        textareaRef.current.value = Text.substring(0, Text.lastIndexOf(findHtmlTag.tagEmmet)) + `${htmlCode}`+endsText
    }
   

}

const inputType = (textareaRef, type, htmlTagsFind) => {
    const Text = textareaRef.current.value;
    if (type === 'image') {
        textareaRef.current.value = Text.substring(0, Text.lastIndexOf(htmlTagsFind)) + `\n\<input name='' src="submit.gif" value='' type='${type}'>\n`
        return;
    }
    textareaRef.current.value = Text.substring(0, Text.lastIndexOf(htmlTagsFind)) + `\n\<input name='' value='' type='${type}'>\n`
}



export default classTagShortcutInput;