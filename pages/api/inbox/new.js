import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import verifyUserAndAccessFeatureServer from "../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";


export default async function handler(req, res) {
    const checkUser = await verifyUserAndAccessFeatureServer(req);
    const method = req.method;
    const { client } = login_user_without_post_body();
    await client.connect();

    const supportInbox = client.db("Inboxes").collection("support");
    const Inbox = client.db("Inboxes").collection("inbox");

    const userCollection = client.db("users").collection("user_details");
    const { email } = req.query;
    const findUserCheckAdmin = await userCollection.findOne({ email: email });
    const roll = findUserCheckAdmin?.roll === 'admin'



    if (checkUser && method === 'POST') {
        const message = req.body;
      
        const result = await Inbox.insertOne(message);

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
    // if (checkUser && roll && method === 'DELETE') {
    //     const { userID } = req.query;
    //     const filter = { userID: userID }
    //     const result = await supportInbox.deleteMany(filter);
    //     if (result?.acknowledged) {
    //         return res.status(200).json({ message: "success", result: result })
    //     }
    //     else {
    //         res.status(200).json({ message: "error", error: "Something is wrong" })
    //     }
    // }
    // if (method === "GET") {
    //     res.status(200).json(message)
    // }
    // if (method === 'POST') {
    //     message.push(req.body)
    // }

}
