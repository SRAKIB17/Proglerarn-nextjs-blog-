import React, { useContext, useState } from 'react';
import { UserFullInfoProvider } from '../../../pages/_app';
import { Copy, Delete, Writing } from '../../ReactRSIcon/index'
import DeletePost from '../DeletePost/DeletePost';
import styles from '../PostMap.module.css'
import EditPostFormTextArea from './EditPostFormTextArea';
import { useRouter } from 'next/router';
import CopyEdit from './CopyEdit.module.css'

const EditDeleteComponentMenu = ({ post, refetch }) => {
    const router = useRouter()
    const { post_id, userID, post_title } = post
    const { user, user_details, isLoading, isAdmin } = useContext(UserFullInfoProvider);
    const openEditPostFormTextArea = (id) => {
        try {
            document.getElementById("EditPostFormTextArea" + id).style.width = "100%";
        }
        catch {

        }
    }

    const threeDotEditHandle = (id, event) => {
        try {
            const editPostBYuser = document.getElementById('editPostBYuser' + id);
            if (event.type === 'mouseenter') {
                editPostBYuser.style.display = 'block'
                editPostBYuser.style.left = '-125px'
            }
            else if (event.type === 'mouseleave') {
                editPostBYuser.style.left = '200px'
                editPostBYuser.style.display = 'none'
            }
        }
        catch {

        }
    }
    const [deletePost, setDeletePost] = useState(null);
    const [editPost, setEditPost] = useState(null);
    const CopyUrlHandle = (id, e) => {
        e.preventDefault();
        const getInput = e.target.getElementsByTagName('input')[0];
        getInput.select()
        document.execCommand('copy')

        const copiedMsg = e.target.getElementsByTagName('p')[0];
        copiedMsg.style.display = 'block'
        setTimeout(() => {
            copiedMsg.style.display = 'none'
        }, 1000);
    }


    const copyLink = `
    ${typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''}/story/${post_id}
    `;
    const apiCodeCopy = `<iframe src="${typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''}/api/preview/${post_id}" width="100%" height="300" style="border:1px solid black;"></iframe>`

    return (
        <div>
            <div
                style={{ zIndex: 100 }}
                className='absolute right-0 top-[18px]'
                onMouseLeave={(event) => threeDotEditHandle(post_id, event)}
                onMouseEnter={(event) => threeDotEditHandle(post_id, event)}
            >
                <button
                    className='text-2xl font-extrabold mr-6 link-primary flex'
                >
                    ...
                </button>
                {/* ---------------for edit post --------------- */}
                <div
                    className={styles.EditPost + ' absolute z-20 left-[-50px] top-[30px] hidden'}
                    id={'editPostBYuser' + post_id}
                >
                    <ul className='flex w-40 bg-base-300 p-4 rounded-md shadow-md flex-col gap-1'>
                        {
                            (isAdmin?.admin || (user?.user && user_details?.userID === post_id?.split('-')?.[1])) &&
                            <>
                                <li onClick={() => setEditPost(post_id)} className='text-left btn btn-outline btn-primary rounded-md btn-xs'>
                                    <Writing size='17' /> Edit Post
                                </li>

                                <li className=' btn btn-outline btn-primary text-left rounded-md btn-xs' onClick={() => setDeletePost({ post_id, userID, post_title })}>
                                    <Delete size='17' />Delete Post
                                </li>
                            </>
                        }


                        <>
                            <li onClick={(e) => CopyUrlHandle(post_id, e)} className={CopyEdit.tooltip + ' text-left btn btn-outline btn-primary rounded-md btn-xs'}>
                                <Copy size='17' className="pr-1" />
                                Copy Url
                                <p className={CopyEdit.tooltiptext + ' hidden'}>
                                    Copied
                                </p>
                                <input type="text" value={copyLink} className="fixed top-[-100000px]" />
                            </li>

                            <li onClick={(e) => CopyUrlHandle(post_id, e)} className={CopyEdit.tooltip + ' flex text-left btn btn-outline btn-primary rounded-md btn-xs'}>
                                <Copy size='17' className="pr-1" />
                                <p>
                                    Api Code
                                </p>
                                <p className={CopyEdit.tooltiptext + ' hidden'}>
                                    Copied
                                </p>
                                <input type="text" value={apiCodeCopy} className="fixed top-[-100000px]" />
                            </li>



                            <li className=' btn btn-outline btn-primary text-left rounded-md btn-xs' onClick={() => setDeletePost(post_id)}>
                                {/* <Delete size='17' />Delete Post */}
                                Shorten Url
                            </li>
                        </>
                    </ul>
                </div>
            </div>
            {
                ((isAdmin?.admin || user?.user) && editPost) &&
                <EditPostFormTextArea post={post} setEditPost={setEditPost} refetch={refetch} />
            }
            {
                ((isAdmin?.admin || user?.user) && deletePost) &&
                <div className=''>
                    <DeletePost props={{ deletePost, setDeletePost, refetch }} />
                </div>
            }
        </div>
    );
};

export default EditDeleteComponentMenu;