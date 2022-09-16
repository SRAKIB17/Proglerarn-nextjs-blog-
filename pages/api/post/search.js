import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";

export default async function handler(req, res) {
    const { client } = SocialPostBlog();
    await client.connect();
    const postCollection = client.db("postBlogs").collection("postBlog");

    // VERIFY USER
    const token = req.headers?.access_token;

    const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
    const accessToken = tokenDetails?.token;
    const roll = tokenDetails?.roll;




    if (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN || accessToken === process.env.USER_CHECK_ACCESS_FEATURE) {

        const { page } = req.query;
        const { show } = req.query;

        const nextPage = eval(page * show);
        const prevPage = eval((page - 1) * show);
        
        const { query } = await req.query;


        const regExpQuery = new RegExp(query, 'i');


        const filter =
        {
            "$or":
                [
                    { category: { $regex: regExpQuery } },
                    { tags: { $regex: regExpQuery } },
                    { postBody: { $regex: regExpQuery } },
                    { post_title: { $regex: regExpQuery } },
                    { postBodyCss: { $regex: regExpQuery } },
                    { postBodyJs: { $regex: regExpQuery } },
                    { postRefMode: { $regex: regExpQuery } },
                    { postBy: { $regex: regExpQuery } },
                    { short_description: { $regex: regExpQuery } }
                ]
        }

        const getPosts = await postCollection.find(filter).sort({ _id: -1 }).skip(prevPage).limit(nextPage).toArray();
        const count = await postCollection.countDocuments(filter)
        return res.status(200).json({ posts: getPosts, count: count })

        //************************************************ */

    }
    else {
        return res.status(200).json({ message: 'error', error: "Can't access " })
    }

}
// const cursor = ItemCollection.find({
//     "$and":
//     [
//         { userId: userId },
//         {
//             "$or": [
//                 { title: { $regex: query } },
//                 { category: { $regex: query } },
//                 { supplierName: { $regex: query } }
//             ]
//         }
//     ]
// }).skip(skip * page).limit(skip);
