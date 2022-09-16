import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { UserFullInfoProvider } from "../../pages/_app";
import { ArrowsCheck, Camera, Delete, NewsFeed, Writing } from "../ReactRSIcon";

const BookmarkView = ({ bookmark, refetch }) => {
    const router = useRouter()
    const { user, user_details } = useContext(UserFullInfoProvider);

    const navigate = (path) => {
        router.push(path)
        router.prefetch(path)
    }
    const post_id = bookmark?.post_id;



    const [showOption, setShowOption] = useState(null);
    const showOptionHandle = (e) => {
        if (e.type == "mouseleave" && showOption) {
            setShowOption(false)
        }
        else if (e.type == "mouseenter" && !showOption) {
            setShowOption(true)
        }
    }

    // *****************EDIT NAME*******************

    const [editBookmark, setEditBookmark] = useState(null);
    const [editLoading, setEditLoading] = useState(null);
    const editTitleBookmarkHandle = async (e) => {
        e.preventDefault()
        setEditLoading(true);
        const id = editBookmark;
        const bookmarkTitle = e.target.bookmark.value;
        const { data } = await axios.put(`/api/bookmark/update-title-bookmark?email=${email}&user_id=${userID}&bookmark_id=${id}`, { title: bookmarkTitle },
            {
                headers: {
                    access_token: sessionStorage.getItem('accessAutoG'),
                    token: localStorage.getItem('token')
                }
            });
        if (data?.message === 'success') {
            refetch()
            if (data?.result?.acknowledged) {
                refetch()
                setEditLoading(null)
                setEditBookmark(null)
            }
        }
        else if (data?.message === 'error') {
            alert('something is wrong')
            setEditLoading(null)
            setEditBookmark(null)
        }
        setEditLoading(null)
        setEditBookmark(null)
    }


    // ************DELETE ONE**********************
    const [deleteBookmarkLoading, setDeleteBookmarkLoading] = useState(null);
    const userID = user_details?.userID;
    const email = user_details?.email;
    const deleteBookmarkHandle = async () => {
        setDeleteBookmarkLoading(true)
        try {
            const { data } = await axios.delete(`/api/bookmark/get-bookmark-db-user?email=${email}&user_id=${userID}&post_id=${post_id}`,
                {
                    headers: {
                        access_token: sessionStorage.getItem('accessAutoG'),
                        token: localStorage.getItem('token')
                    }
                });
            if (data?.message === 'success') {
                refetch()
                setDeleteBookmarkLoading(false)
                if (data?.result?.acknowledged) {
                    refetch()
                    setDeleteBookmarkLoading(false)
                }
            }
            else if (data?.message === 'error') {
                alert('something is wrong')
                setDeleteBookmarkLoading(false)
            }


        }
        finally {
            setDeleteBookmarkLoading(false)

        }

    }


    return (
        <div>
            <div>
                <div className='max-w-[400px] flex  justify-between m-1' >
                    <div className='flex items-center justify-start gap-1 btn btn-sm font-extralight'>
                        <div>
                            <Camera className="border-[1px] rounded-sm" />
                        </div>
                        <div>
                            {
                                editBookmark ?
                                    <>
                                        <div>
                                            {
                                                editLoading ?
                                                    <li className='text-[16px] relative'>
                                                        {bookmark?.title}
                                                        <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%] top-0 border-rose-500'>
                                                        </p>
                                                    </li>
                                                    :
                                                    <form onSubmit={editTitleBookmarkHandle} className='flex items-center gap-1'>
                                                        <input
                                                            type="text"
                                                            name='bookmark'
                                                            defaultValue={bookmark?.title}
                                                            className="input input-sm input-primary pl-1 ml-1"
                                                        />
                                                        <button className='btn btn-sm btn-primary'>
                                                            <ArrowsCheck size='20' className='font-extrabold' />
                                                        </button>
                                                    </form>

                                            }
                                        </div>
                                    </>
                                    :

                                    (
                                        deleteBookmarkLoading ?
                                            <li className='text-[16px] relative link'>
                                                {bookmark?.title}
                                                <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%] top-0 border-rose-500'>
                                                </p>
                                            </li>
                                            :
                                            <div className='relative' onMouseEnter={showOptionHandle} onMouseLeave={showOptionHandle}>
                                                <div className='text-2xl font-extralight '>
                                                    <li className='text-[16px] link'>
                                                        {bookmark?.title}
                                                    </li>
                                                </div>
                                                {
                                                    (showOption && !deleteBookmarkLoading) &&
                                                    <div className='absolute z-20 top-6 font-extralight font-mono'>
                                                        <div className='flex flex-col gap-1 '>
                                                            <button
                                                                onClick={() => navigate('/story/' + post_id)}
                                                                className='btn-xs btn text-xs w-28 flex gap-1 justify-start items-center btn-secondary'
                                                            >
                                                                <NewsFeed /> View post
                                                            </button>
                                                            <button
                                                                onClick={() => setEditBookmark(bookmark?.post_id)}
                                                                className='btn-xs btn text-xs w-28 flex gap-1 justify-start items-center bg-green-800 hover:bg-green-600'
                                                            >
                                                                <Writing />  Edit Title
                                                            </button>
                                                            <button
                                                                className='btn-xs btn text-xs w-28 flex gap-1 justify-start items-center bg-red-800 hover:bg-red-500 '
                                                                onClick={deleteBookmarkHandle}
                                                            >
                                                                <Delete />  Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                }
                                            </div>
                                    )
                            }
                        </div>
                    </div>



                </div>

            </div>
        </div>
    )
}

export default BookmarkView