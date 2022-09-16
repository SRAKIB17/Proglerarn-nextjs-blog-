import post from "../../../../../components/hooks/api/social/post";
export default function handler(req, res) {
    const { client } = post()
    const run = async () => {
        await client.connect()
        const postDb = client.db('SocialBlog').collection('Posts');
        const postCollections = await postDb.find({}).toArray();
        res.status(200).json(postCollections)
    }
    run().catch(console.dir)

    const method = req.method;

    if (method === "GET") {

    }
    if (method === 'POST') {
        // message.push(req.body)
    }

}
