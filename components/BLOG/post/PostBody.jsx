/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Default from './Default';

const PostBody = ({ post, refetch }) => {

    return (
        <>
            <Default post={post} refetch={refetch} />
        </>
    );
};

export default PostBody;