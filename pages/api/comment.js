// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const message = [
    {
        userID: '3534553',
        adminReply: false,
        adminId: '534545534',
        message: '5435645'
    },
    {
        userID: '3534553',
        adminReply: true,
        adminId: '534545534',
        message: ' Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quam quis amet enim qui illo facilis corrupti libero molestias commodi itaque voluptate molestiae, ab ducimus? Quis perspiciatis quam quod voluptas?'
    },
    {
        userID: '3534553',
        adminReply: false,
        adminId: '534545534',
        message: 'গিয়েছিলাম খিচুড়ি নিয়ে, সবাই আনন্দ করে খাইলো কিন্তু ৫০ টির মতো হিন্দু ধর্মাবলম্বী পরিবার খিচুড়ি গ্রহন কর রেনি। কারণ তাদের ধর্মের বিধানানুযায়ী আজকের জন্য তা গ্রহন করতে নিষেধ করা হয়েছে। তাই তড়িঘড়ি করে এ ৫০ টি পরিবারের জন্য ফল-ফ্রুটসের ব্যবস্থা করলাম। আহা তাদের খুশি কে দেখে! কিছু কিছু সময় নিজেকে বিলিয়ে দিতে ইচ্ছে করে।'
    },
    {
        userID: '3534553',
        adminReply: false,
        adminId: '534545534',
        message: `
        <video width="320" height="240"  preload="auto" controls muted poster="http://rakib17.hexat.com/icon/busy.gif" loop autoplay>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
            Your browser does not support the video tag.
        </video>

        `
    },

    {
        userID: '3534553',
        adminReply: true,
        adminId: '534545534',
        message: `
        <video width="320" height="240"  preload="auto" controls muted poster="http://rakib17.hexat.com/icon/busy.gif" loop autoplay>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
            <source src="movie.ogg" type="video/ogg">
            Your browser does not support the video tag.
        </video>

        `
    }
]
export default function handler(req, res) {
    const method = req.method;
    if (method === "GET") {
        res.status(200).json(message)
    }
    if(method === 'POST'){
        message.push(req.body)
    }

}
