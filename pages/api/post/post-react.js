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



        const { post_id } = req?.body
        const { userID } = req.body;
        delete req?.body?.post_id
    
        if (checkUser) {
            const filter = { post_id: post_id };
            const findPost = await postCollection.findOne(filter);
            const findUserReact = await findPost?.react?.filter(react => react?.userID != userID);
            const reactUser = req.body;

            const updateDoc = {
                $set: {
                    react: [...findUserReact, reactUser]
                }
            }

            const result = await postCollection.updateOne(filter, updateDoc);
            if (result?.acknowledged) {
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
        res.status(200).json({ message: "Ops! Something is wrong " })
    }

}
