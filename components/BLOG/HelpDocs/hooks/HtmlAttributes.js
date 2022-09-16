
const HtmlAttributes = [
    {
        attEmmet: '..accep',
        attFull: 'accept',
        des: '<input>types of files that the server accepts (only for type="file")accept-charset'
    },
    {
        attEmmet: '..act',
        attFull: 'action',
        des: '<form> send the form-data when a form is submitted'
    },
    {
        attEmmet: '..acces',
        attFull: 'accesskey',
        des: '	Specifies a shortcut key to activate/focus an element'
    },
    {
        attEmmet: '..alt',
        attFull: 'alt',
        des: '<area>, <img>, <input> an alternate text when the original element fails to display'
    },
    {
        attEmmet: '..autoc',
        attFull: 'autocomplete',
        des: '<form> or the <input> element should have autocomplete enabled'
    },
    {
        attEmmet: '..autof',
        attFull: 'autofocus',
        des: '<button>, <input>, <select>, <textarea> the element should automatically get focus when the page loads'
    },
    {
        attEmmet: '..autop',
        attFull: 'autoplay',
        des: '<audio>, <video>the audio/video will start playing as soon as it is ready'
    },
    {
        attEmmet: '..che',
        attFull: 'checked',
        des: 'an <input> element should be pre-selected when the page loads (for type="checkbox" or type="radio")'
    },
    {
        attEmmet: '..cla',
        attFull: 'class',
        des: 'classnames for an element (Only apply bootstrap class)'
    },
    {
        attEmmet: '..col',
        attFull: 'cols',
        des: '<textarea> the visible width of a text area'
    },
    {
        attEmmet: '..con',
        attFull: 'controls',
        des: '<audio>, <video>controls should be displayed'
    },
    {
        attEmmet: '..dir',
        attFull: 'dir',
        des: 'Specifies the text direction for the content in an element'
    },
    {
        attEmmet: '..dis',
        attFull: 'disabled',
        des: '	<button>, <fieldset>, <input>, <optgroup>, <option>, <select>, <textarea> = elements should be disabled'
    },
    {
        attEmmet: '..dow',
        attFull: 'download',
        des: '<a>,the target will be downloaded'
    },
    {
        attEmmet: '..for',
        attFull: 'for',
        des: '<label>,<output> which form element(s) a label/calculation is bound to'
    },

    {
        attEmmet: '..hei',
        attFull: 'height',
        des: '<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video> Specifies the height of the element'
    },
    {
        attEmmet: '..hid',
        attFull: 'hidden',
        des: 'Specifies that an element is not yet, or is no longer, relevant'
    },
    {
        attEmmet: '..id',
        attFull: 'id',
        des: 'Attributes	Specifies a unique id for an element'
    },
    {
        attEmmet: '..loo',
        attFull: 'loop',
        des: '<audio>, <video> the audio/video will start over again, every time it is finishe'
    },
    {
        attEmmet: '..max',
        attFull: 'max',
        des: '<input>  the maximum value'
    },
    {
        attEmmet: '..min',
        attFull: 'min',
        des: '<input>, <meter> a minimum value'
    },
    {
        attEmmet: '..mult',
        attFull: 'multiple',
        des: '<input>, <select> a user can enter more than one value'
    },
    {
        attEmmet: '..mut',
        attFull: 'muted',
        des: '<video>, <audio> the audio output of the video should be muted'
    },
    {
        attEmmet: '..nam',
        attFull: 'name',
        des: '<button>, <fieldset>, <form>, <iframe>, <input>, <map>, <meta>, <object>, <output>, <param>, <select>, <textarea>	the name of the element'
    },
    {
        attEmmet: '..nov',
        attFull: 'novalidate',
        des: '<form> the form should not be validated when submitted'
    },
    {
        attEmmet: '..ope',
        attFull: 'open',
        des: '<details> the details should be visible (open) to the user'
    },
    {
        attEmmet: '..pos',
        attFull: 'poster',
        des: '<video> an image to be shown while the video is downloading, or until the user hits the play button'
    },
    {
        attEmmet: '..pla',
        attFull: 'placeholder',
        des: '<input>, <textarea> a short hint that describes the expected value of the element'
    },
    {
        attEmmet: '..pre',
        attFull: 'preload',
        des: '<audio>, <video>	Specifies if and how the author thinks the audio/video should be loaded when the page loads'
    },
    {
        attEmmet: '..rea',
        attFull: 'readonly',
        des: '<input>, <textarea>	Specifies that the element is read-only'
    },
    {
        attEmmet: '..req',
        attFull: 'required',
        des: '<input>, <select>, <textarea>	Specifies that the element must be filled out before submitting the form'
    },
    {
        attEmmet: '..rev',
        attFull: 'reversed',
        des: '<ol>	Specifies that the list order should be descending (9,8,7...)'
    },
    {
        attEmmet: '..row',
        attFull: 'rowspan',
        des: '<td>, <th> Specifies the number of rows a table cell should span'
    },
    {
        attEmmet: '..siz',
        attFull: 'size',
        des: '<input>, <select>	Specifies the width, in characters (for <input>) or specifies the number of visible options (for <select>'
    },
    {
        attEmmet: '..sel',
        attFull: 'selected',
        des: '<option>	Specifies that an option should be pre-selected when the page loads'
    },
    {
        attEmmet: '..spa',
        attFull: 'span',
        des: '<col>, <colgroup>	Specifies the number of columns to span'
    },
    {
        attEmmet: '..src',
        attFull: 'src',
        des: '<audio>, <embed>, <iframe>, <img>, <input>, <script>, <source>, <track>, <video>	Specifies the URL of the media file'
    },
    {
        attEmmet: '..sta',
        attFull: 'start',
        des: '<ol>	Specifies the start value of an ordered list'
    },
    {
        attEmmet: '..sty',
        attFull: 'style',
        des: 'Specifies an inline CSS style for an element'
    },
    {
        attEmmet: '..tar',
        attFull: 'target',
        des: '<a>, <area>, <base>, <form>	Specifies the target for where to open the linked document or where to submit the form'
    },
    {
        attEmmet: '..tit',
        attFull: 'title',
        des: 'Global Attributes	Specifies extra information about an element'
    },
    {
        attEmmet: '..typ',
        attFull: 'type',
        des: '	<a>, <button>, <embed>, <input>, <link>, <menu>, <object>, <script>, <source>, <style>	Specifies the type of element'
    },
    {
        attEmmet: '..val',
        attFull: 'value',
        des: '<button>, <input>, <li>, <option>, <meter>, <progress>, <param>	Specifies the value of the element'
    },
    {
        attEmmet: '..wid',
        attFull: 'width',
        des: '<canvas>, <embed>, <iframe>, <img>, <input>, <object>, <video>	Specifies the width of the element'
    }

]

export default HtmlAttributes;