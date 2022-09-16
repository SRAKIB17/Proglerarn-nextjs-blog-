import login_user_without_post_body from "../../../../components/hooks/api/social/login_user_without_post_body";
import verifyUserAndAccessFeatureServer from "../../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";

// import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
const crypto = require("crypto");

export default async function handler(req, res) {
    try {
        // 01. MONGODB GET
        const { client } = login_user_without_post_body()
        await client.connect();
        const CdnCollection = client.db("Services").collection("CDN_CODE");

        // 02. VERIFY USER IF TRUE NEXT PROCESS
        const checkUser = await verifyUserAndAccessFeatureServer(req);
        const method = req.method;

        // 03. CHECK ADMIN IF TRUE MESSAGE USER;
        const userCollection = client.db("users").collection("user_details");
        const { email } = req.query;
        const findUserCheckAdmin = await userCollection.findOne({ email: email });
        const roll = findUserCheckAdmin?.roll === 'admin'
        
        //CHECK USER IF TRUE IT PASS
        if (method === "DELETE" && checkUser) {
            const { code_id, user_id } = req.query;
            const filter = { code_id: code_id };
            const result = await CdnCollection.deleteOne(filter);

            if (result?.acknowledged && result?.deletedCount == 1) {

                const svg = `
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width='128'
                            height='128'
                            fill='red'
                            viewBox="0 0 24 24" >
                            <path  d="M20 2h-4v-.85C16 .52 15.48 0 14.85 0h-5.7C8.52 0 8 .52 8 1.15V2H4c-1.1 0-2 .9-2 2 0 .74.4 1.38 1 1.73v14.02C3 22.09 4.91 24 7.25 24h9.5c2.34 0 4.25-1.91 4.25-4.25V5.73c.6-.35 1-.99 1-1.73 0-1.1-.9-2-2-2zm-1 17.75c0 1.24-1.01 2.25-2.25 2.25h-9.5C6.01 22 5 20.99 5 19.75V6h14v13.75z" />
                            <path  d="M8 20.022c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm8 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1zm-4 0c-.553 0-1-.447-1-1v-10c0-.553.447-1 1-1s1 .447 1 1v10c0 .553-.447 1-1 1z" />
                        </svg>
                    `
                //WELCOME MESSAGE
                let messageBody = ''
                let emoji = ''
                if (findUserCheckAdmin?.userID !== user_id && roll) {
                    messageBody = `
                    <div style="white-space: pre-line;">
                    Please note that page blanking, addition of random text or spam, deliberate misinformation, and privacy violations are considered vandalism, and will not be tolerated. If you wish to make useful contributions, you may come back after the block expires. If you believe the block was placed in error, you may place an unblock request on your talk page using some rules broken for unblock here <a href="/inbox/support" className='link-primary link-hover'>Click </a>
                    ${svg}
                    </div>
                    `
                    emoji = '/_next/static/media/emoji%20(24).adbb44a0.jpg'
                }
                else {
                    messageBody = `
                    Successfully delete your code.. 
                    `
                }
                const deleteMessage = {
                    emoji: emoji,
                    userID: user_id,
                    adminReply: true,
                    adminId: '9b836a9c57a91ce7805cc6a0',
                    message: messageBody,
                    time: new Date()
                }
                const supportInbox = client.db("Inboxes").collection("support");
                await supportInbox.insertOne(deleteMessage);
                res.status(200).json({ message: "success", result: result })
            }
            else {
                res.status(200).json({ message: "error", error: "Something is wrong" })
            }

        }



        else {
            res.status(200).json({ message: "error", error: 'Could not match header file' })
        }

    }
    catch {
        res.status(200).json({ message: "error", error: 'Something is wrong' })
    }
}
