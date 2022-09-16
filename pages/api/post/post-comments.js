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


        const { userID } = req.body;
        const commentBody = req.body;
        if (checkUser) {
            const { post_id } = req?.body
            const filter = { post_id: post_id };
            const findPost = await postCollection.findOne(filter);

            // console.log(getPost)

            const getCommentId = async () => {
                // 1. RANDOMLY CREATE A COMMENT ID;
                const commentId = crypto.randomBytes(Math.ceil(9))
                    .toString("hex")

                // 2. CHECK UNIQUE ID;
                const checkCommentId = await findPost?.comments?.find(comment => comment?.comment_id?.includes(commentId));
                if (checkCommentId) {
                    return getCommentId();
                }
                else {
                    return commentId;
                }
            }

            // 3. GET COMMENT ID;
            const comment_id = await getCommentId();

            // 4. SET COMMENT ID
            commentBody.comment_id = comment_id;

            //5. DELETE POST ID FROM COMMENT BODY BECAUSE IT DON'T NEED
            delete commentBody?.post_id

            //6. FIND ALL COMMENT  BY MAP FUNCTION;
            // const findCommentAll = await findPost?.comments?.map(commentBody => commentBody);
            await findPost?.comments?.push(commentBody)


            //7. GET UPDATE DOC

            const updateDoc = {
                $set: findPost
            }

            // 8. UPDATE POST BODY
            const result = await postCollection.updateOne(filter, updateDoc);

            // ALL OK 
            if (result?.acknowledged) {
                return res.status(200).json({ message: "success", result: result })
            }
            else {
                return res.status(200).json({ message: "error", error: "Something is wrong" })
            }

        }
        else {
            return res.status(200).json({ message: "error", error: 'Could not match header file' })
        }

    }
    catch {
        res.status(200).json({ message: "Ops! Something is wrong " })
    }

}
