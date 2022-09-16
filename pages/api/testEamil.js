
export default function handler(req, res) {
    const method = req.method;
    if (method === "GET") {
        res.status(200).json('message')
    }
    if (method === 'POST') {
        // message.push(re)
        res.status(200).json('534534534534534545')
    }

}
