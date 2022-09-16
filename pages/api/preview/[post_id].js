import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";



export default async function handler(req, res) {
  const { post_id } = req.query;
  const { client } = SocialPostBlog();
  await client.connect();
  const postCollection = client.db("postBlogs").collection("postBlog");
  // <link href="/api/styleIframe.css?dark=false" rel="stylesheet" type="text/css">


  const run = async () => {
    const findPost = await postCollection.findOne({ post_id: post_id });
    const iframePostFullBody =
      `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>${findPost?.post_title}</title>
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
         ${findPost?.postBodyCss}
    </style>
</head>
<body>
    ${findPost?.postBody}
    <script>
        ${findPost?.postBodyJs}
    </script>
    <script type="text/javascript" src="/code_highlight_with_jquery/universal/jquery.js"></script>
    <script src="/code_highlight_with_jquery/jhighlight//jquery.highlight.js"></script>
    <script src="/code_highlight_with_jquery/index.js"></script>
</body>
</html>
`
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(findPost ? iframePostFullBody : '<h1>Sorry Can\'t load document</h1>');
    res.end();
  }
  run()

}

