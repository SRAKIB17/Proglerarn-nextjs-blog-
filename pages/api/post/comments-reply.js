import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";
const crypto = require('crypto')


export default async function handler(req, res) {

    try {
        const { client } = SocialPostBlog();
        await client.connect();
        const postCollection = client.db("postBlogs").collection("postBlog");

        // VERIFY USER

        const checkUser = await verifyUserAndAccessFeatureServer(req);
        const method = req.method;

        if (checkUser && method === "PUT") {
            // A. GET REPLY BODY
            const replyBody = req.body;

            // B. GET COMMENT ID AND POST ID;
            const { comment_id } = replyBody;
            const { post_id } = req?.body;

            // C. FILTERING AND GET SPECIFIC POST 
            const filter = { post_id: post_id };
            const findPost = await postCollection.findOne(filter);


            // D. FIND SPECIFIC COMMENT FROM POST 
            const getComment = await findPost?.comments?.find(comment => comment?.comment_id?.includes(comment_id));


            // E.  FIND SPECIFIC REPLY ID;
            const getReplyId = async () => {
                const replyId = crypto.randomBytes(Math.ceil(8))
                    .toString("hex")

                const getReplyIdCheck = await getComment?.replies?.find(reply => reply?.reply_id?.includes(replyId));
                if (getReplyIdCheck) {
                    return getReplyId();
                }
                else {
                    return replyId;
                }
            }


            // F. DELETE POST ID AND COMMENT ID FROM REPLY BODY;
            delete replyBody?.post_id;
            delete replyBody?.comment_id;

            // G. SET REPLY ID IN REPLY BODY;
            const reply_id = await getReplyId()
            replyBody.reply_id = reply_id;

            // H. PUSH REPLY IN COMMENTS
            await getComment?.replies?.push(replyBody);



            const updateDoc = {
                $set: findPost
            }

            // I. UPDATE POST BODY
            const result = await postCollection.updateOne(filter, updateDoc);

            // ALL OK 
            if (result?.acknowledged) {
                return res.status(200).json({ message: "success", result: result })
            }
            else {
                return res.status(200).json({ message: "error", error: "Something is wrong" })
            }


        }

    }

    catch {
        return res.status(200).json({ message: "Ops! Something is wrong " })
    }

}
