import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";
const crypto = require("crypto");

export default async function handler(req, res) {
    try {
        const { client } = SocialPostBlog()
        await client.connect();
        const postCollection = client.db("postBlogs").collection("postBlog");

        // VERIFY USER

        const checkUser = await verifyUserAndAccessFeatureServer(req);


        if (checkUser) {
            const getAllPost = await postCollection.find({}).toArray();
            const getPostId = async () => {
                const postId = crypto.randomBytes(Math.ceil(9))
                    .toString("hex")

                // (B1) GENERATE RANDOM SALT
                const checkPostId = await getAllPost.find(post => post?.post_id?.includes(postId))
                if (checkPostId) {
                    return getPostId()
                }
                else {
                    return postId;
                }
            }
            const body = req.body;
            body.post_id = await getPostId() + "-" + body.userID
            // console.log(body)
            const result = await postCollection.insertOne(body);
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
        res.status(200).json({ message: "error", error: 'Something is wrong' })
    }
}
