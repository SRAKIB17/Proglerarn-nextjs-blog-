import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import { Comment } from '../../../../ReactRSIcon';

const CommentBtn = ({ post_id, TotalComment, showCommentHandle }) => {
    const router = useRouter();

    const navigate = (path) => {
        router.replace(path)
    }
    const { user, user_details } = useContext(UserFullInfoProvider)

    return (
        <div>
            <div className='flex items-center'>
                <button
                    title='Comment'
                    onClick={() => {
                        if (user?.user) {
                            showCommentHandle(post_id)
                        }
                        else {
                            navigate('/login?return_url=' + router.asPath)
                        }
                    }}
                    id={'showCommentButton' + post_id}
                    className='btn relative btn-xs bg-[#DDDDDD] rounded-3xl text-[16px]  sm:text-xl'
                    rel="noreferrer"
                >
                    <span className='flex items-center gap-1'>
                        <Comment color='currentColor' size='16' />
                        <p className='font-extralight text-sm'>
                            {TotalComment}
                        </p>
                    </span>
                </button>
                {/* <BookmarkPost post={post} refetch={refetch}/> */}
            </div>
        </div>
    );
};

export default CommentBtn;