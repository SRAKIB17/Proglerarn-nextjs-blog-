import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";

export default async function handler(req, res) {
    const method = req.method;

    const { client } = login_user_without_post_body()
    const supportInbox = client.db("Inboxes").collection("support");
    await client.connect();
    const userCollection = client.db("users").collection("user_details");

    const { email } = req.query;
    const findUserCheckAdmin = await userCollection.findOne({ email: email });
    //CHECK USER IF TRUE IT PASS
    const roll = findUserCheckAdmin?.roll === 'admin'
    const checkUser = await verifyUserAndAccessFeatureServer(req);

    if (checkUser && roll && method === 'GET') {
        const { show } = req.query
        const findAllUser = await userCollection.find({}).sort({ _id: -1 }).skip(0).limit(parseInt(show)).toArray()
        return res.status(200).json({ message: "success", result: findAllUser })
    }
    else if (checkUser && roll && method === 'PUT') {
        const { userID } = req.query
        const filter = { userID: userID }
        // D. UPDATE DOC
        const warnBody = req.body
        const { reason } = warnBody;
        delete warnBody?.reason;
        const updateDoc = {
            $set: warnBody
        }

        // H. UPDATE POST BODY
        const result = await userCollection.updateOne(filter, updateDoc);

        // ALL OK 
        if (result?.acknowledged) {
            //WELCOME MESSAGE
            const { warning } = warnBody;

            let messageBody = ''
            let emoji = ''
            if (warning === 'false') {
                messageBody = `
                <div style="white-space: pre-line;">
               
                Dear User,
                We observe that the account was temporarily blocked for receiving a high number of bounces in a short time period. This triggers a security restriction, as detailed in the Usage Policy.
                Now you will be able to access all service. Please ensure that you communicate only with valid and engaged audience to avoid being blocked in the future.
                Hope this helps. If you have any questions or concerns, do let us know.
                Regards,
                Admin
                </div>
                `
                emoji = '/_next/static/media/alert-512.f9829c8f.jpg'

            }
            else if (warning === 'true') {
                messageBody = `
                <div style="white-space: pre-line;">
                Please note that page blanking, addition of random text or spam, deliberate misinformation, and privacy violations are considered vandalism, and will not be tolerated. If you wish to make useful contributions, you may come back after the block expires. If you believe the block was placed in error, you may place an unblock request on your talk page using <b className='underline border-2 border-gray-500 m-1 rounded-md'>${reason}</b> for unblock here <a href="/inbox/support" className='link-primary link-hover'>Click </a>
                </div>
                `
                emoji = '/_next/static/media/emoji%20(24).adbb44a0.jpg'
            }

            const messageWarning = {
                emoji: emoji,
                userID: userID,
                adminReply: true,
                adminId: '9b836a9c57a91ce7805cc6a0',
                message: messageBody,
                time: new Date()
            }
            const supportInbox = client.db("Inboxes").collection("support");
            await supportInbox.insertOne(messageWarning);
            return res.status(200).json({ message: "success", result: result })
        }
        else {
            return res.status(200).json({ message: "error", error: "Something is wrong" })
        }
    }


    else if (method === "DELETE" && checkUser && roll) {
        const { userID } = req.query;
        const filter = { userID: userID }
        const result = await userCollection.deleteOne(filter);

        const { client } = SocialPostBlog()
        await client.connect();
        const postCollection = client.db("postBlogs").collection("postBlog");
        if (result?.acknowledged && result?.deletedCount == 1) {
            const deletePost = await postCollection.deleteMany(filter);
            const deleteSupportMessage = await supportInbox.deleteMany(filter);
            if (deletePost.acknowledged) {
                res.status(200).json({ message: "success", result: result })
            }
            else {
                res.status(200).json({ message: "error", error: "Only user delete" })
            }
        }
        else {
            res.status(200).json({ message: "error", error: "Something is wrong" })
        }
    }

}
