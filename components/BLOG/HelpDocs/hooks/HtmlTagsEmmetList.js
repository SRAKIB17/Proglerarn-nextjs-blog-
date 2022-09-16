const htmlTagsEmmet = [
    {
        tagEmmet: '.!!',
        tagCode:
            `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    
    </body>
</html>
        `,
        des: '!<doctype html> stucture'
    },
    {
        tagEmmet: '.<a>',
        tagCode: `<a href="url " class=" "> title</a> `,
        des: '<a>	Defines a hyperlink'
    },
    {
        tagEmmet: '.<add',
        tagCode:
            `
<address class=' '>  </address>
        `,
        des: `<address>	contact informationt`
    },
    {
        tagEmmet: '.<art',
        tagCode: `<article>  </article>`,
        des: '<article>	Defines an article'
    },

    {
        tagEmmet: '.<aud',
        tagCode:
            `
<audio controls>
    <source src="horse.ogg" type="audio/ogg">
    <source src="horse.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>`,
        des: '<audio>	Defines embedded sound content'
    },
    {
        tagEmmet: '.<b>',
        tagCode: `<b>  </b>`,
        des: '<b>	Defines bold text'
    },
    {
        tagEmmet: '.<br',
        tagCode:
            `
<br/>`,
        des: '<br>	Defines a single line break'
    },
    {
        tagEmmet: '.<but',
        tagCode:
            `
<button type="button" class=" ">Click Me!</button>`,
        des: '<button>	Defines a clickable button'
    },
    {
        tagEmmet: '.<cod',
        tagCode: `
<code> </code> `,
        des: '<code>	Defines a piece of computer code'
    },
    {
        tagEmmet: '.<del',
        tagCode: `
<del>  </del>`,
        des: '<del> Defines text that has been deleted from a document'
    },
    {
        tagEmmet: '.<data',
        tagCode:
            `
<form>
    <label for="browser">Choose your browser from the list:</label>
    <input list="browsers" name="browser" id="browser">
    <datalist id="browsers">
        <option value="Edge">
        <option value="Firefox">
        <option value="Chrome">
        <option value="Opera">
        <option value="Safari">
        </datalist>
    <input type="submit">
</form> `,
        des: '<datalist> a list of pre-defined options for input controls'
    },
    {
        tagEmmet: '.<det',
        tagCode:
            `
<details>
    <summary>Epcot Center</summary>
    <p>Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions, award-winning fireworks and seasonal special events.</p>
</details>
        `,
        des: '<details>	additional details that the user can view or hide'
    },
    {
        tagEmmet: '.<div',
        tagCode: `
<div class=" ">  </div>`,
        des: '<div>	Defines a section in a document'
    },
    {
        tagEmmet: '.<dl',
        tagCode:
            `
<dl class="d-bock">
    <dt>Coffee</dt>
    <dd>Black hot drink</dd>
    <dt>Milk</dt>
    <dd>White cold drink</dd>
</dl>
        `,
        des: '<dl>	Defines a description list'
    },
    {
        tagEmmet: '.<em>',
        tagCode: `
<em>  </em>`,
        des: '<em>	Defines emphasized text'
    },
    {
        tagEmmet: '.<emb',
        tagCode:
            `
<embed type="" src="url" width="300" height="200"></embed> `,
        des: '<embed>	Defines a container for an external application'
    },
    {
        tagEmmet: '.<fie',
        tagCode:
            `
<fieldset>
    <legend>Personal Info:</legend>
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname"><br><br>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname"><br><br>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email"><br><br>
    <label for="birthday">Birthday:</label>
    <input type="date" id="birthday" name="birthday"><br><br>
    <input type="submit" value="Submit">
</fieldset>
        `,
        des: '<fieldset>	Groups related elements in a form'
    },
    {
        tagEmmet: '.<fig',
        tagCode:
            `
<figure>
    <img src="pic_trulli.jpg" alt="Trulli" style="width:100%">
    <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>

        `,
        des: '<figure>	Specifies self-contained content'
    },
    {
        tagEmmet: '.<for',
        tagCode:
            `
<form action="/action_page.php" method="get">
    <label for="fname">First name:</label>
    <input type="text" id="fname" name="fname"><br><br>
    <label for="lname">Last name:</label>
    <input type="text" id="lname" name="lname"><br><br>
    <input type="submit" value="Submit">
</form>
        `,
        des: '<form>	Defines an HTML form for user input'
    },
    {
        tagEmmet: '.<h1',
        tagCode: `
<h1 class=" ">  </h1>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<h2',
        tagCode: `
<h2 class=" ">  </h2>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<h3',
        tagCode: `
<h3 class=" ">  </h3>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<h4',
        tagCode: `
<h5 class=" ">  </h5>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<h5',
        tagCode: `
<h5 class=" ">  </h5>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<h6',
        tagCode: `
<h6 class=" ">  </h6>`,
        des: '<h1> to <h6>	Defines HTML headings'
    },
    {
        tagEmmet: '.<hr',
        tagCode: `
<hr class=" "/> `,
        des: '<hr>	Defines a thematic change in the content'
    },
    {
        tagEmmet: '.<i>',
        tagCode: `
<i> </i>`,
        des: '<i>	Defines a part of text in an alternate voice or mood'
    },
    {
        tagEmmet: '.<ifr',
        tagCode:
            `
<iframe src="url" width="100%" height="300" style="border:1px solid black;"></iframe>
        `,
        des: '<iframe>	Defines an inline frame'
    },
    {
        tagEmmet: '.<img',
        tagCode:
            `
<img src="url" width="100%" height="300" style="border:1px solid black;"/>
        `,
        des: '<img>	Defines an image'
    },
    {
        tagEmmet: '.<inp:b',
        tagCode: `
<input name='' value='' type='button'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:check',
        tagCode: `
<input name='' value='' type='check'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:dat',
        tagCode: `
<input name='' value='' type='date'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:ema',
        tagCode: `
<input name='' value='' type='email'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:mon',
        tagCode: `
<input name='' value='' type='month'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:num',
        tagCode: `
<input name='' value='' type='number'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:rad',
        tagCode: `
<input name='' value='' type='radio'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:ran',
        tagCode: `
<input name='' value='' type='range'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:tel',
        tagCode: `
<input name='' value='' type='tel'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:tex',
        tagCode: `
<input name='' value='' type='text'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:wee',
        tagCode: `
<input name='' value='' type='week'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:tim',
        tagCode: `
<input name='' value='' type='time'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:sub',
        tagCode: `
<input name='' value='' type='submit'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:sea',
        tagCode: `
<input name='' value='' type='search'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:pas',
        tagCode: `
<input name='' value='' type='password'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<inp:ima',
        tagCode: `
<input name='' src="submit.gif" value='' type='image'>`,
        des: `'<inp:type' <input>	Defines an input control`
    },
    {
        tagEmmet: '.<ins',
        tagCode: `
<ins> </ins> `,
        des: `The <ins> tag defines a text that has been inserted into a document.`
    },
    {
        tagEmmet: '.<kbd',
        tagCode: `
<kbd>  </kbd>`,
        des: '<kbd>	Defines keyboard input'
    },
    {
        tagEmmet: '.<mar',
        tagCode: `
<mark>  </mark>`,
        des: '<mark>	Defines marked/highlighted text'
    },
    {
        tagEmmet: '.<p>',
        tagCode: `
<p class=" ">  </p>`,
        des: '<p>	Defines a paragraph'
    },
    {
        tagEmmet: '.<pic',
        tagCode:
            `
<picture>
    <source media="(min-width:650px)" srcset="img_pink_flowers.jpg">
    <source media="(min-width:465px)" srcset="img_white_flower.jpg">
    <img src="img_orange_flowers.jpg" alt="Flowers" style="width:auto;">
</picture>


        `,
        des: '<picture>	Defines a container for multiple image resources'
    },
    {
        tagEmmet: '.<pre',
        tagCode: `
<pre>  </pre>`,
        des: '<pre>	Defines preformatted text'
    },
    {
        tagEmmet: '.<pro',
        tagCode: `
<progress class="progress progress-error w-56" value="70" max="100"></progress>
<progress class="progress progress-error w-56" value="100" max="100"></progress>`,
        des: '<progress>	Defines progress bar'
    },
    {
        tagEmmet: '.<q>',
        tagCode: `
<q>  </q>`,
        des: '<q>	Defines a short quotation'
    },
    {
        tagEmmet: '.<scr',
        tagCode: `
<script src='link'></script>`,
        des: '<script>	Defines a client-side script'
    },
    {
        tagEmmet: '.<ol',
        tagCode:
            `
<ol style="line-height:180%" start="50" reversed type="">
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
</ol>`,
        des: '<ol>	Defines an ordered list'
    },
    {
        tagEmmet: '.<sel',
        tagCode:
            `
<form>
    <label for="cars">Choose a car:</label>
    <select name="cars" id="cars">
        <optgroup label="Swedish Cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
        </optgroup>
        <optgroup label="German Cars">
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
        </optgroup>
    </select>
    <br><br>
    <input type="submit" value="Submit">
</form>
`,
        des: '<select>	Defines a drop-down list'
    },
    {
        tagEmmet: '.<sec',
        tagCode: `
<section class=" "> </section>`,
        des: '<section>	Defines a html section'
    },
    {
        tagEmmet: '.<sma',
        tagCode: `
<small>  </small>`,
        des: '<small>	Defines smaller text'
    },
    {
        tagEmmet: '.<samp',
        tagCode: `
<samp>  </samp>`,
        des: '<samp>	Defines sample output from a computer program'
    },
    {
        tagEmmet: '.<spa',
        tagCode: `
<span class=" ">  </span>`,
        des: '<span>	Defines a section in a document'
    },
    {
        tagEmmet: '.<str',
        tagCode: `
<strong>  </strong>`,
        des: '<strong>	Defines important text'
    },
    {
        tagEmmet: '.<sty',
        tagCode: `
<style>  </style>`,
        des: '<style>	Defines style information for a document'
    },
    {
        tagEmmet: '.<sub',
        tagCode: `
<sub>  </sub>`,
        des: '<sub>	Defines subscripted text'
    },
    {
        tagEmmet: '.<sup',
        tagCode: `
<sup>  </sup>`,
        des: '<sup>	Defines superscripted text'
    },
    {
        tagEmmet: '.<tab',
        tagCode:
            `
<table>
    <tr>
        <th style="width:130px">Month</th>
        <th style="width:80px">Savings</th>
    </tr>
    <tr>
        <td>January</td>
        <td>$100</td>
    </tr>
    <tr>
        <td>February</td>
        <td>$80</td>
    </tr>
</table>
        `,
        des: '<table>	Defines a table'
    },
    {
        tagEmmet: '.<text',
        tagCode:
            `
<textarea name="" id="" cols="30" rows="10" placeholder='text here' wrap="soft|hard">
</textarea>
        `,
        des: '<textarea>	Defines a multiline input control (text area)'
    },
    {
        tagEmmet: '.<tim',
        tagCode: `
<time> </time>`,
        des: '<time>	Defines a specific time (or datetime)'
    },
    {
        tagEmmet: '.<tit',
        tagCode: `
<title>  </title>`,
        des: '<title>	Defines a title for the document'
    },
    {
        tagEmmet: '.<u>',
        tagCode: `
<u> </u>`,
        des: '<u>	Defines some text that is unarticulated and styled differently from normal text'
    },
    {
        tagEmmet: '.<ul',
        tagCode:
            `
<ul style="list-style-type:circle|disc|square">
    <li>Coffee</li>
    <li>Tea</li>
    <li>Milk</li>
</ul>
        `,
        des: ' <ul>	Defines an unordered list '
    },
    {
        tagEmmet: '.<vid',
        tagCode:
            `
<video width="320" height="240"  preload="auto" controls muted poster="http://rakib17.hexat.com/icon/busy.gif" loop autoplay>
    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
    <source src="movie.ogg" type="video/ogg">
    Your browser does not support the video tag.
</video>

        `,
        des: '<video>	Defines embedded video content'
    },

]

export default htmlTagsEmmet;