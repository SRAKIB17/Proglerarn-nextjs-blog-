import login_user_without_post_body from "../../../../components/hooks/api/social/login_user_without_post_body";
import jwtTokenVerifyServer from "../../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";
import verifyUserAndAccessFeatureServer from "../../../../components/hooks/api/verifyUser/verifyUserAndAccessFeatureServer";

// import SocialPostBlog from "../../../components/hooks/api/social/post_blog_videos_post";
const crypto = require("crypto");

export default async function handler(req, res) {
    // try {
    const { client } = login_user_without_post_body()
    await client.connect();
    const CdnCollection = client.db("Services").collection("CDN_CODE");



    const checkUser = await verifyUserAndAccessFeatureServer(req);
    const method = req.method;
    const userCollection = client.db("users").collection("user_details");
    const { email } = req.query;
    const findUserCheckAdmin = await userCollection.findOne({ email: email });
    //CHECK USER IF TRUE IT PASS
    const roll = findUserCheckAdmin?.roll === 'admin'
    // VERIFY USER

    const token = req.headers?.access_token;
    const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
    const accessToken = tokenDetails?.token;


    // PUBLIC CODE SHOW
    if ((method == 'GET' && !checkUser) && (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN || accessToken === process.env.USER_CHECK_ACCESS_FEATURE)) {
        const { show } = req.query;
        const getCode = await CdnCollection.find({}).sort({ _id: -1 }).skip(0).limit(parseInt(show)).toArray();
        res.status(200).json({ message: "success", result: getCode })
    }

    // ONLY USER
    else if (method == 'GET' && checkUser) {
        const { show } = req.query;
        const { user_id } = req.query;
        const filter = {
            userID: user_id
        }
        const getCode = await CdnCollection.find(filter).sort({ _id: -1 }).skip(0).limit(parseInt(show)).toArray();
        res.status(200).json({ message: "success", result: getCode })
    }
    else if (method == "POST" && checkUser) {
        const allCode = await CdnCollection.find({}).toArray();
        const codeBody = req.body;
        const getCdnCodeID = async () => {
            const codeID = crypto.randomBytes(Math.ceil(3)).toString("hex")

            // (B1) GENERATE RANDOM SALT
            const checkCodeID = allCode.find(code => code?.code_id === codeID)
            if (checkCodeID) {
                return getCdnCodeID()
            }
            else {
                return codeID;
            }
        }

        codeBody.code_id = await getCdnCodeID() + "-" + codeBody.userID
        const result = await CdnCollection.insertOne(codeBody);
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

    // }
    // catch {
    //     res.status(200).json({ message: "error", error: 'Something is wrong' })
    // }
}
