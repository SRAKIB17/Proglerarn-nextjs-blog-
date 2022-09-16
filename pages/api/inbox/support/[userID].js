import login_user_without_post_body from "../../../../components/hooks/api/social/login_user_without_post_body";
import verifyUserAndAccessFeatureServer from "../../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";

export default async function handler(req, res) {

    const checkUser = await verifyUserAndAccessFeatureServer(req);
    const method = req.method;
    const { client } = login_user_without_post_body();
    await client.connect();
    const supportInbox = client.db("Inboxes").collection("support");
    if (checkUser && method == "GET") {
        const { userID } = req.query;
        const getMessage = await supportInbox.find({ userID: userID }).toArray()
        return res.status(200).json({ message: "success", result: getMessage })
    }
    else if (checkUser && method === 'POST') {
        const message = req.body;
        const result = await supportInbox.insertOne(message);

        if (result?.acknowledged) {
            return res.status(200).json({ message: "success", result: result })
        }
        else {
            return res.status(200).json({ message: "error", error: "Something is wrong" })
        }

    }
    else {
        res.status(200).json({ message: "error", error: 'Could not match header file' })
    }


  
}
