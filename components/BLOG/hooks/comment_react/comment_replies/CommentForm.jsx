import React, { useContext } from 'react';
import { UserFullInfoProvider } from '../../../../../pages/_app';
import EmojiGifIndex from '../../../../Comment/EmojiGif/EmojiGifIndex';
import classTagShortcutInput from '../../../../hooks/hooks/useFindClassAttr';

const CommentForm = ({ post_id, postCommentHandler, selectEmoji, setReplyNow, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection, replyNow, errMsg, CommentTextareaRef, sendCommentLoading }) => {
    const { user, user_details } = useContext(UserFullInfoProvider)

    // AUTO HEIGHT TEXTAREA FORM
    const shortcutKeyboard = (e) => {
        // classTagShortcutInput(e, textareaRef)
    }
    const onchangeInput = (e) => {
        heightAutoHandle(e)
        classTagShortcutInput(e, CommentTextareaRef)
    }
    const heightAutoHandle = (e) => {
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < 200) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = 200 + 'px'
        }
    }
    return (
        <div>
            <div id={'commentForm' + post_id}>

                {
                    // user?.user &&
                    <form className=' pt-4 mb-4' onSubmit={postCommentHandler} >
                        {/****************** for reply section when a user reply other this name show display ************************ */}


                        {/* *********FOR GIF EMOJI************* */}
                        <div>
                            <EmojiGifIndex props={{ selectEmoji, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection }} />
                            <div className='flex items-center gap-2'>
                                <div>
                                    {
                                        replyNow &&
                                        <div className='mt-3 flex items-center mb-2 pl-3 pr-3 text-secondary bg-gray-100 w-fit rounded-3xl'>
                                            <h1 className='text-xs'>@{replyNow?.name}</h1>
                                            <div>
                                                <a href="#" onClick={() => setReplyNow(null)} className=' text-xl ml-2 hover:text-[grey]'>&times;</a>
                                            </div>
                                        </div>
                                    }
                                </div>

                            </div>
                        </div>
                        <p className='text-red-600 text-xs p-1'>
                            {
                                errMsg
                            }
                        </p>

                        <div className="relative flex items-end pt-1 pl-3 mt-1 ">
                            <textarea ref={CommentTextareaRef}
                                id={'commentTextArea' + post_id}
                                className='input input-success w-full font-mono'
                                name="commentBody"
                                onBlur={onchangeInput}
                                onKeyUp={(e) => shortcutKeyboard(e)}
                                onChange={onchangeInput}
                                onInput={onchangeInput}
                                onCut={heightAutoHandle}
                                onPaste={heightAutoHandle}
                                onDrop={heightAutoHandle}
                                onKeyDown={heightAutoHandle}
                                required={selectEmoji ? false : true}
                            >
                            </textarea>
                            <div className='align-bottom left-[50%] bottom-0'>
                                <button className='btn btn-sm btn-primary ml-2 text-xs w-fit text-white'>
                                    {
                                        sendCommentLoading ||
                                        (replyNow?.comment_id ? "Reply" : "Comment")
                                    }
                                    {
                                        sendCommentLoading &&
                                        <p className='animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                        </p>
                                    }
                                </button>
                            </div>
                        </div>
                    </form>
                }

            </div>
        </div>
    );
};

export default CommentForm;