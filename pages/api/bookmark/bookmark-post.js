import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";
const crypto = require("crypto");

export default async function handler(req, res) {

    try {
        //********* FOR BLOG POST */
        const { client } = SocialPostBlog()
        await client.connect();
        const postCollection = client.db("postBlogs").collection("postBlog");

        // ****************ONLY BOOKMARK POST******
        const { client: bookmarkDBUser } = login_user_without_post_body();
        await bookmarkDBUser.connect();
        const bookmarkCollection = bookmarkDBUser.db("BookmarkDB").collection("bookmarks");
        // 01. CHECK USER
        const checkUser = await verifyUserAndAccessFeatureServer(req);
        if (checkUser) {
            // 02. FILTER POST
            const filter = { post_id: req?.body?.post_id };

            // 03. GET USER ID
            const userID = req?.body?.userID


            const getPost = await postCollection.findOne(filter);

            // 04. IF bookmarkUserID NOT FOUND ,  A ARRAY CREATE:
            if (!getPost?.bookmarkUserID) {
                getPost.bookmarkUserID = [];
            }
            // 05. CHECK USER BOOKMARK LIST 
            const check = getPost?.bookmarkUserID?.includes(userID);
            const bookmarkDBUser = req.body;

            // 06. IF TRUE THEN DELETE BOOKMARK , AND FILTERING POST BOOKMARK USER ID
            if (check) {
                const filterBookmarkUserID = getPost?.bookmarkUserID?.filter(id => id != userID);
                //DELETE BOOKMARK DB
                const deleteBookmark = await bookmarkCollection.deleteOne({ userID: userID })

                if (deleteBookmark?.acknowledged) {
                    getPost.bookmarkUserID = filterBookmarkUserID
                }
                else {
                    return res.status(200).json({ message: "error", error: "Something is wrong" })
                }
            }
            else {
                const saveBookmark = await bookmarkCollection.insertOne(bookmarkDBUser);

                if (saveBookmark?.acknowledged) {
                    getPost?.bookmarkUserID?.push(userID)
                }
                else {
                    return res.status(200).json({ message: "error", error: "Something is wrong" })
                }
            }
            const updateDoc = {
                $set: getPost
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
        res.status(200).json({ message: "error", error: 'Something is wrong' })
    }
}
