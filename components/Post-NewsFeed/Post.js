import React, { useContext } from 'react';
import { UserFullInfoProvider } from '../../pages/_app';
import PostMap from './PostMap';

const Post = ({ posts, refetch }) => {
    const getPosts = posts || []
    const { user, user_details, isLoading } = useContext(UserFullInfoProvider)
    return (
        <div className='flex flex-col gap-2 sm:gap-3'>
            {
                posts && getPosts.map((post, index) => <PostMap key={post?._id} post={post} refetch={refetch} />)
            }
        </div>
    );
};

export default Post;