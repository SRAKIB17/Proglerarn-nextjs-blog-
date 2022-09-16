import React from 'react';
import login_user_without_post_body from '../../../components/hooks/api/social/login_user_without_post_body';

const Index = () => {
    return (
        <div>

        </div>
    );
};

export default Index;

export async function getServerSideProps(context) {
    try {
        const res = context?.res;
        const req = context?.req;
        const { user_id } = context?.params;
        const { code_id } = context?.params;
        const { client } = login_user_without_post_body()
        await client.connect();
        const CdnCollection = client.db("Services").collection("CDN_CODE");

        const codeBody = await CdnCollection.findOne(
            {
                "$and":
                    [
                        { code_id: code_id },
                        { userID: user_id }
                    ]
            }
        )
        console.log(codeBody?.content_type)
        if (codeBody) {
            res.writeHead(200, { 'Content-Type': codeBody?.content_type });
            res.write(codeBody?.code);
            res.end();
        }
        else {
            const errMsg = "<h1>Could Not Find Code This Code</h1>"
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(errMsg);
            res.end();
        }
    }
    catch {

    }

    return {
        props: {},
    }
}