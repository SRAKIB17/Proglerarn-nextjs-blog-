import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";

export default async function handler(req, res) {
    const { client } = SocialPostBlog();
    await client.connect();
    const postCollection = client.db("postBlogs").collection("postBlog");
    const token = req.headers?.access_token;
    const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
    const accessToken = tokenDetails?.token;
    const roll = tokenDetails?.roll;
    if (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN || accessToken === process.env.USER_CHECK_ACCESS_FEATURE) {
        const { post_id } = req.query;
        const findSpecific = await postCollection.findOne({ post_id: post_id });
        if (findSpecific) {
            res.status(200).json(findSpecific)
        }
        else {
            res.status(200).json({ message: 'error', error: 'Could not find this id' })
        }
    }
    else {
        res.status(200).json({ message: 'error', error: "Can't access " })
    }

}
