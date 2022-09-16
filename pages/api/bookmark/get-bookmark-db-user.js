
import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";

export default async function handler(req, res) {
    try {
        const { client } = login_user_without_post_body();
        await client.connect();
        const bookmarkCollection = client.db("BookmarkDB").collection("bookmarks");

        // VERIFY USER

        const checkUser = await verifyUserAndAccessFeatureServer(req);
        const method = req.method;
        if (checkUser) {
            const { user_id } = req.query;
            if (method === "GET") {
                const filter = { userID: user_id }
                const getUserBookmark = await bookmarkCollection.find(filter).toArray()
                return res.status(200).json({ message: "success", result: getUserBookmark })
            }


            else if (method === 'DELETE') {
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
