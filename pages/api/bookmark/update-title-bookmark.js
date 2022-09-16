
import { ObjectId } from "mongodb";
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
            if (method === "PUT") {
                const { bookmark_id } = req.query;

                const { title } = req?.body
                const filter = { _id: ObjectId(bookmark_id) }
                const findBookmark = await bookmarkCollection.findOne(filter)
                findBookmark.title = title;

                const updateDoc = {
                    $set: findBookmark
                }
                const result = await bookmarkCollection.updateOne(filter, updateDoc);
                if (result?.acknowledged) {
                    res.status(200).json({ message: "success", result: result })
                }
                else {
                    res.status(200).json({ message: "error", error: "Something is wrong" })
                }

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
