import { pid } from "process";
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

        // GET COMMENT BODY
        if (checkUser && method === "DELETE") {
            const { comment_id } = req.query;
            const { post_id } = req.query;

            
            // B. FIND POST
            const filter = { post_id: post_id };
            const findPost = await postCollection.findOne(filter);

            // C. FILTER COMMENT AND REPLIES
            const filterComment = await findPost?.comments?.filter(comment => comment?.comment_id != comment_id);


            findPost.comments = await (filterComment);

            // D. UPDATE DOC
            const updateDoc = {
                $set: findPost
            }

            // H. UPDATE POST BODY
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
