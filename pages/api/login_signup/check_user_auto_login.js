import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";


export default async function handler(req, res) {

    try {
        const { client } = login_user_without_post_body();
        await client.connect();
        const token = req.headers?.access_token;

        const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
        const accessToken = tokenDetails?.token;
        const roll = tokenDetails?.roll;

        // if (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN || accessToken === process.env.USER_CHECK_ACCESS_FEATURE) {
        if (req.body) {
            const body = req.body;
            const emailToken = body?.token;
            const login_info = body?.login_info;
            const email = jwtTokenVerifyServer(emailToken, process.env.LOGIN_SIGNUP_ACCESS_API)?.jwtInfo?.email;

            const password = jwtTokenVerifyServer(login_info, process.env.LOGIN_SIGNUP_ACCESS_API)?.userInfo?.token;
            // const userId = login_pass?.userId;
            const userCollection = client.db("users").collection("user_details");
            const findUser = await userCollection.findOne({ email: email })
            const validate = async (encryptedPassword, userEmail) => {
                const hashedPass = findUser?.password?.split('##')[0];
                if (hashedPass == encryptedPassword) {
                    delete findUser?.password;
                    res.status(200).json({ success: true, message: "welcome!", user_details: findUser })
                }
                else {
                    res.status(200).json({ success: false, message: "failed? don't matched", })
                }
            };

            validate(password, email)

        }
        else {
            res.status(200).json({ message: "Sorry ..Couldn't access it " })
        }
    }
    catch {
        res.status(200).json({ message: "Ops! Something is wrong " })
    }

}
