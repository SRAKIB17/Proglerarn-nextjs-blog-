import { root } from "postcss";
import login_user_without_post_body from "../../../components/hooks/api/social/login_user_without_post_body";
import jwtTokenVerifyServer from "../../../components/hooks/api/verifyUser/jwtTokenVerifyServer";

const crypto = require("crypto");
const jwt = require('jsonwebtoken');
export default async function handler(req, res) {
    const token = req.headers?.access_token;
    const tokenDetails = jwtTokenVerifyServer(token, process.env.AUTO_JWT_TOKEN_GENERATE_FOR_USER_OR_GUEST)?.access;
    const accessToken = tokenDetails?.token;
    const roll = tokenDetails?.roll;
    try {



        // (B) CREATE PASSWORD HASH
        if (accessToken === process.env.GUEST_CHECK_ACCESS_TOKEN && roll === 'guest') {
            //GET MONGODB
            const { client } = login_user_without_post_body()
            await client.connect();
            const userCollection = client.db("users").collection("user_details");

            const run = async () => {
                const body = req.body
                //GET USER SPECIFIC ID;
                const getUserId = async () => {
                    const userId = crypto.randomBytes(Math.ceil(9))
                        .toString("hex")
                    // (B1) GENERATE RANDOM SALT
                    const checkUserId = await userCollection.findOne({ userID: userId })
                    if (checkUserId) {
                        return getUserId()
                    }
                    else {
                        return userId;
                    }
                }


                const findSpecific = await userCollection.findOne({ email: body?.email?.toLowerCase() });
                if (findSpecific) {
                    res.status(200).json({ message: "error", error: 'Already registered this email' })
                }
                else {
                    const encryptingPassword = (password) => {


                        let salt = crypto.randomBytes(Math.ceil(16))
                            .toString("hex");
                        // (B2) SHA512 HASH
                        let hash = crypto.createHmac("sha512", salt);
                        hash.update(password);
                        const hashValue = hash.digest("hex")
                        return {
                            salt: salt,
                            hash: hashValue
                        };
                    };

                    const password = body?.password;


                    const encryptedPassword = encryptingPassword(password);
                    body.password = encryptedPassword?.hash;
                    //USER ALL INFO SET AUTOMATIC
                    const userID = await getUserId()
                    const getUserFullInfo = {
                        profile: '',
                        cover: '',
                        userID: userID,
                        email: body?.email,
                        password: encryptedPassword?.hash + '##' + encryptedPassword?.salt,
                        name: body?.name,
                        gender: body?.gender,
                        work: "",
                        location: '',
                        school: '',
                        github: '',
                        youtube: null,
                        facebook: null,
                        linkedin: null,
                        linkedin: null,
                        instagram: null,
                        twitter: null,
                        roll: "user",
                        quote: ``,
                    }
                    // INSERT USER FULL INFO
                    const result = await userCollection.insertOne(getUserFullInfo)
                    if (result?.acknowledged) {

                        // JWT USER INFO (EMAIL SAVED) SEND LIKE TOKEN AND SAVED LOCALSTORAGE OR COOKIES
                        const jwtInfo = {
                            email: body?.email
                        }
                        const jwtToken = jwt.sign({ jwtInfo }, process.env.LOGIN_SIGNUP_ACCESS_API, { expiresIn: '1d' });

                        // USER LOGIN INFO SAVED COOKIE 
                        const userInfo = {
                            token: body?.password,
                            userId: userID,
                        }
                        const loginInfo = jwt.sign({ userInfo }, process.env.LOGIN_SIGNUP_ACCESS_API, { expiresIn: '1d' });
                        //WELCOME MESSAGE
                        const messageBody = `Welcome dear user 😊😊.What else would you like to receive, if you have time, send us a valuable message.
                        Let us know what your feedback is. Let us know if you have any complaints`
                        const welcomeMessage = {
                            emoji: '/_next/static/media/2.855c4f8b.png',
                            replyID: userID,
                            adminReply: true,
                            userID: '9b836a9c57a91ce7805cc6a0',
                            message: messageBody,
                            time: new Date()
                        }

                        const supportInbox = client.db("Inboxes").collection("support");
                        await supportInbox.insertOne(welcomeMessage);
                        res.status(200).json({ message: "success", token: jwtToken, login_info: loginInfo })
                    }
                    else {
                        res.status(200).json({ message: "error", error: 'Something is wrong..Please try again' })
                    }

                }

            }
            run().catch(console.dir)

        }
        else {
            res.status(200).json({ message: "error", error: 'Could not match header file' })
        }
    }
    catch {
        res.status(200).json({ message: "error", error: 'Oops! Sorry .Server Down. Please try again' })

    }

}
