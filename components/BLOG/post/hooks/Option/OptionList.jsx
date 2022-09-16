import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import { Copy, Delete, Writing } from '../../../../ReactRSIcon';
import DeleteModal from './DeleteModal';
import ForUserAdminOption from './ForUserAdminOption';
import GuestOption from './GuestOption';
import ShareOption from './ShareOption';
import Three_dots_vertical from './Three_dots_vertical';

const OptionList = ({ post, refetch }) => {
    const [deletePost, setDeletePost] = useState(null)
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);

    return (
        <div>
            <div className="dropdown dropdown-end ">
                <label
                    tabIndex={0}
                    className="btn-sm cursor-pointer btn btn-ghost"
                >
                    <Three_dots_vertical
                        size='18'
                        strokeWidth='1'
                    />
                </label>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-sm w-52">
                    {
                        (isAdmin?.admin || (user?.user && user_details?.userID === post?.post_id?.split('-')?.[1])) &&
                        <ForUserAdminOption
                            setDeletePost={setDeletePost}
                            post={post}
                        />
                    }
                    <GuestOption post={post} />
                    <ShareOption />
                </ul>

                {/* **********FOR DELETE ***************** */}
                {
                    ((isAdmin?.admin || user?.user) && deletePost) &&
                    <div className=''>
                        <DeleteModal deletePost={deletePost} refetch={refetch} setDeletePost={setDeletePost} />
                    </div>
                }
            </div>

        </div>
    );
};

export default OptionList;