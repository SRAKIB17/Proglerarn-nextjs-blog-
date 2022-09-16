import { useRouter } from 'next/router';
import React from 'react';
import { Delete, Writing } from '../../../../ReactRSIcon';
import DeleteModal from './DeleteModal';

const ForUserAdminOption = ({ setDeletePost, post }) => {
    const { post_id, userID, post_title } = post
    const router = useRouter()
    const navigate = (path) => {
        router.replace(path)
    }

    return (
        <>
            {

                <>
                    <li
                    // onClick={() => setEditPost(post_id)}
                    >
                        <button onClick={() => navigate('/blog/post/edit/' + post?.post_id)}>
                            <Writing size='20' /> Edit Post
                        </button>

                    </li>

                    <li
                    // onClick={() => setDeletePost({ post_id, userID, post_title })}
                    >
                        <label
                            htmlFor="DeleteModal"
                            onClick={() => setDeletePost({ post_id, userID, post_title })}
                        >
                            <Delete size='20' />Delete Post
                        </label>
                    </li>
                </>
            }
        </>
    );
};

export default ForUserAdminOption;