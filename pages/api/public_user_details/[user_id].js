import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";
export default async function handler(req, res) {
    const { user_id } = req.query;
    const token = req.headers?.access_token;

    const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
    const accessToken = tokenDetails?.token;
    const roll = tokenDetails?.roll;


    try {

        if (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN || accessToken === process.env.USER_CHECK_ACCESS_FEATURE) {
            const { client } = login_user_without_post_body();
            await client.connect()

            const userCollection = client.db("users").collection("user_details");
            //FIND USER********************
            const findUser = await userCollection.findOne({ userID: user_id });
            delete findUser?.email;
            delete findUser?.password;

            res.status(200).json({ message: "success", user_details: findUser })
        }
        else {
            res.status(200).json({ message: "error", error: 'Could not match header file' })
        }
    }
    catch {
        res.status(200).json({ message: "error", error: 'Oops! Sorry .Something is wrong. Please try again' })

    }
}
