import React from 'react';

const post = {
    "_id": "62dbd8bffb3c48b3dc13910b",
    "userID": "9b836a9c57a91ce7805cc6a0",
    "post_id": "5d388bd7109eeede7e255fff-314a78fa90c2ab69e439eba5",
    "post_title": "How to Create Carousel by JAVASCRIPT",
    "image": "",
    "time": "2022-08-27T12:29:04.564Z",
    "short_description": " The carousel is a  slideshow for cycling   through a series of content, built with CSS 3D transforms and a bit of JavaScript. It works with a series of images, text, or custom markup. It also includes support for previous/next controls and indicators. ",
    "category": "web development",
    "tags": "html,javascript",
    "postBody": "<!DOCTYPE html>      \n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>carousel slider</title>\n    <link rel=\"stylesheet\" href=\"https://my-project-calculate.netlify.app/js/services/carousel/carousel.css\">\n    <style>\n        body{\n            color: white;\n        }\n        :root{\n            --btnBg:  #0d376d;\n \n            --btn: 1px solid #6681a3;\n        }\n        button{\n            border: var(--btn);\n            background-color: var(--btnBg);\n            color: white;\n        }\n    </style>\n</head>\n<body>\n    <section>\n        <h2>\n            carousel slider\n        </h2>\n        <div class=\"carousel-slider\" id=\"carousel\">\n            <div class=\"carousel-images\">\n\n                <img src=\"https://my-project-calculate.netlify.app/services/carousel%20slider/images/Long-Beach-Convention-and-Entertainment-Center-L.webp\" alt=\"\" class=\"carousel-image\">\n\n                <img src=\"https://my-project-calculate.netlify.app/services/carousel%20slider/images/Long-Beach-Convention-and-Entertainment-Center-Long-Beach.webp\" alt=\"\" class=\"carousel-image\">\n\n                <img src=\"https://my-project-calculate.netlify.app/services/carousel%20slider/images/slide-1 (1).png\" alt=\"\" class=\"carousel-image\">\n\n                <img src=\"https://my-project-calculate.netlify.app/services/carousel%20slider/images/Tinley-Park-Convention-Center-Tinley-Park.webp\" alt=\"\" class=\"carousel-image\">\n\n              \n            </div>\n            <div class=\"next-prev\">\n                <button type=\"button\" id=\"prev\"></button> \n                <button type=\"button\" id=\"next\"></button>\n           \n            </div>\n            <div id=\"bottomInd\"></div>\n        </div>\n    </section>\n    <!-- section copy code and use  -->\n    <section>\n        <h2>Copy code and paste it on your html header sectoin</h2>\n  \n        <code>\n<div class=\"carousel-slider\" id=\"carousel\">\n                <div class=\"carousel-images\">\n\n                    <div class='carousel-image'>\n                        <img\n                            src=\"/carousel/carousel2.png\"\n                            alt=\"\"\n                        />\n                        <div>\n                            <div>\n                                <h1>Order now </h1>\n                                <p>welcome our site</p>\n                            </div>\n                            <button class=''>\n                                Order Now\n                            </button>\n                        </div>\n                    </div>\n\n                    <div class='carousel-image'>\n                        <img\n                            src=\"/carousel/carousel1.png\"\n                            alt=\"\"\n                        />\n                        <div>\n                            <h1>Order now </h1>\n                            <p>welcome our site</p>\n                        </div>\n                    </div>\n                    <div class='carousel-image'>\n                        <img\n                            src=\"/carousel/carousel3.png\" alt=\"\"\n                        />\n                        <div>\n                            <h1>Order now </h1>\n                            <p>welcome our site</p>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"next-prev\">\n                    <button href=\"#\" id=\"prev\"></button>\n                    <button href=\"#\" id=\"next\"></button>\n                </div>\n                <div id=\"bottomInd\"></div>\n            </div>\n        </code>\n        <h2>copy this code and paste on your html page last</h2>\n        \n      \n        <code>\n            const getId = (id) => document.getElementById(id);\n\nconst getCarousel = document.querySelectorAll('.carousel-image');\nvar index = 0;\nsetInterval(()=>{\n    showImage(index);\n    index++\n},2000)\n\nfunction showImage(indexSlide){\n    \n    // hidden all image \n    getCarousel.forEach(imageHidden=>imageHidden.style.display = 'none');\n\n\n    // valid getCarousel index\n    if (indexSlide < 0){\n        index = getCarousel.length-1;\n        indexSlide = index;\n    }\n    else if (indexSlide > getCarousel.length-1){\n        index = 0;\n        indexSlide = 0;\n    }\n    // display specific image \n    getCarousel[indexSlide].style.display = 'block'\n    \n}\ngetId('next').addEventListener('click',()=>{\n    showImage(index++)\n})\ngetId('prev').addEventListener('click',()=>{\n    showImage(index--)\n})\n\n// create slider veiw \n// if(getId('bottomInd')){\n    \n//     for (let index = 0; index < getCarousel.length; index++) {\n//         console.log(index)\n//         const div = document.createElement('div');\n//         div.className = 'indicator'\n//         getId('bottomInd').appendChild(div)\n\n//     }\n// }\n\n\n// copy code \nfunction copy(id){\n    document.getElementById(id).select()\n    document.execCommand('copy')\n}\n \n        </code>\n\n\n        <h2>copy this code and paste on your head code</h2>\n\n       \n        <code>\n<style>\n\n\n\n.carousel-slider {\n  height: 10rem;\n  /* 160px */\n  margin: 1rem;\n  /* 1rem = 16px */\n  border-radius: 10px;\n  /* width: 100%; */\n  position: relative;\n}\n\n.carousel-images img {\n  border-radius: 10px;\n  height: 100%;\n  width: 100%;\n  position: absolute;\n  z-index: -1;\n}\n\n\n.carousel-image {\n  width: 100%;\n  height: 100%;\n  display: none;\n}\n\n.carousel-image :not(img) {\n  padding: 10px\n}\n\n#next,\n#prev {\n  min-height: 100%;\n  position: absolute;\n  z-index: 16;\n  color: rgb(255, 255, 255);\n  display: flex;\n  top: 3%;\n  font-size: 50px;\n  align-items: center;\n  justify-content: center;\n  text-decoration: none;\n  text-align: center;\n  color: rgb(212, 208, 208);\n  opacity: 0.4;\n  height: fit-content;\n}\n\n#next:hover,\n#prev:hover {\n  opacity: 1;\n}\n\n#prev {\n  left: 20px;\n}\n\n#next {\n  right: 20px;\n}\n\n#next::after {\n  content: '>';\n}\n\n#prev::after {\n  content: '<';\n}\n\n.bottomInd {\n  position: inherit;\n  z-index: 10;\n  align-items: center;\n  display: inline-table;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.indicator {\n  position: relative;\n  height: 5px;\n  width: 40px;\n  bottom: 0;\n  left: 50%;\n  right: 50%;\n  background-color: rebeccapurple;\n}\n\n/* ********small****** */\n@media (min-width: 640px) {\n  .carousel-slider {\n    height: 12rem\n      /* 192px */\n    ;\n  }\n}\n\n/* ********medium******* */\n@media (min-width: 768px) {\n  .carousel-slider {\n    margin-right: 1rem;\n    /* 1rem = 16px */\n    margin-left: 1rem;\n    height: 13rem\n      /* 208px */\n    ;\n  }\n}\n\n/* ************* large****** */\n@media (min-width: 1024px) {\n\n  .carousel-slider {\n    height: 16rem\n      /* 256px */\n    ;\n  }\n}\n\n@media (min-width: 1280px) {\n  .carousel-slider {\n    height: 20rem;\n    margin-right: 7rem;\n    margin-left: 7rem;\n  }\n}\n</style>\n        </code>\n\n    </section>\n    \n    <script src=\"https://my-project-calculate.netlify.app/js/services/carousel/carousel.js\">\n    </script>\n</body>\n</html>",
    "postBodyCss": ".carousel-slider {\n    margin: 10px;\n    /* width: 100%; */\n    position: relative;\n    height: 400px;\n}\n.carousel-images {\n    width: 100%;\n    position: absolute;\n    z-index: -1;\n}\n.carousel-image {\n    width: 100%;\n    height: 400px;\n    display: none;\n}\n#next , #prev {\n    position: absolute;\n    z-index: 16;\n    color: rgb(255, 255, 255);\n    display: flex;\n    top: 0;\n    font-size: 50px;\n    bottom: 0%;\n    align-items: center;\n    justify-content: center;\n    text-decoration: none;\n    text-align: center;\n    color: rgb(212, 208, 208);\n    opacity: 0.4;\n}\n#next:hover , #prev:hover {\n    opacity: 1;\n}\n#prev{\n    left: 20px;\n}\n#next{\n    right: 20px;\n}\n#next::after{\n    content: '🡺';\n}\n#prev::after {\n    content: '🡸';\n}\n\n.bottomInd {\n    position: inherit;\n    z-index: 10;\n    align-items: center;\n    display: inline-table;\n    justify-content: space-between;\n    align-items: center;\n}\n.indicator{\n    position: relative;\n    height: 5px;\n    width: 40px;\n    bottom: 0;\n    left: 50%;\n    right: 50%;\n    background-color: rebeccapurple;\n}",
    "postBodyJs": "const getId = (id) => document.getElementByI d(id);\n\nconst getCarousel = document.querySelectorAll('.carousel-image');\nvar index = 0;\nsetInterval(()=>{\n    showImage(index);\n    index++\n},2000)\n\nfunction showImage(indexSlide){\n    \n    // hidden all image \n    getCarousel.forEach(imageHidden=>imageHidden.style.display = 'none');\n\n\n    // valid getCarousel index\n    if (indexSlide < 0){\n        index = getCarousel.length-1;\n        indexSlide = index;\n    }\n    else if (indexSlide > getCarousel.length-1){\n        index = 0;\n        indexSlide = 0;\n    }\n    // display specific image \n    getCarousel[indexSlide].style.display = 'block'\n    \n}\ngetId('next').addEventListener('click',()=>{\n    showImage(index++)\n})\ngetId('prev').addEventListener('click',()=>{\n    showImage(index--)\n})\n\n// create slider veiw \n// if(getId('bottomInd')){\n    \n//     for (let index = 0; index < getCarousel.length; index++) {\n//         console.log(index)\n//         const div = document.createElement('div');\n//         div.className = 'indicator'\n//         getId('bottomInd').appendChild(div)\n\n//     }\n// }\n\n\n// copy code \nfunction copy(id){\n    document.getElementById(id).select()\n    document.execCommand('copy')\n}\n ",
    "sort": "5345345345",
    "postBy": "admin",
    "postRefMode": "text",
    "comments": [
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:53:38 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "9b36809cebb7862ec1",
            "replies": [],
            "emoji": "/_next/static/media/cat (172).c4362cd8.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:54:00 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "471ae09eb79e1f4901",
            "replies": [],
            "emoji": "/_next/static/media/cat (4).1d282e4b.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:54:18 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "bc4f4a03f07603c74e",
            "replies": [],
            "emoji": "/_next/static/media/emoji (5).026b4fb2.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:54:39 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "0ab67d28b089f37ef9",
            "replies": [],
            "emoji": "/_next/static/media/emoji (14).25dd9857.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:54:49 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "105aa91d633d165024",
            "replies": [],
            "emoji": "/_next/static/media/emoji (27).466f59e4.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "Sun Jul 31 2022 02:54:58 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "fe6009bab2f90148e4",
            "replies": [],
            "emoji": "/_next/static/media/emoji (24).7f6545f4.gif"
        },
        {
            "userID": "314a78fa90c2ab69e439eba5",
            "comment": "",
            "time": "Sun Jul 31 2022 10:38:04 GMT+0600 (Bangladesh Standard Time)",
            "comment_id": "2cfc63a6e8b5a26545",
            "replies": [],
            "emoji": "/_next/static/media/31.2e1aec92.gif"
        },
        {
            "userID": "9b836a9c57a91ce7805cc6a0",
            "comment": "",
            "time": "2022-08-08T12:30:58.254Z",
            "comment_id": "1a75a81ddd4c701ed1",
            "replies": [],
            "emoji": "/_next/static/media/11.3bb27126.gif"
        }
    ],
    "react": [
        {
            "rating": "like",
            "userID": "314a78fa90c2ab69e439eba5"
        },
        {
            "rating": "love",
            "userID": "54ef50bd7ceb58a5993c6ccc"
        },
        {
            "rating": "like",
            "userID": "74f28d94eb2119e087"
        },
        {
            "rating": "like",
            "userID": "9b836a9c57a91ce7805cc6a0"
        }
    ],
    "bookmarkUserID": [
        "9b836a9c57a91ce7805cc6a0"
    ],
    "thumbnail": "https://i.ibb.co/NtkD4QM/Screenshot-2022-08-07-012845.png"
}

const Index = () => {

    const commentBody = post?.comments
    console.log(commentBody)
    const totalComment = commentBody?.length;
    return (
        <div>
            <div>

            </div>
        </div>
    );
};

export default Index;
