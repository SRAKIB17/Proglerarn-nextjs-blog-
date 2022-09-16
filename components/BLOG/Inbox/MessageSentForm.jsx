import React, { useEffect } from 'react';
import EmojiGifIndex from '../../Comment/EmojiGif/EmojiGifIndex';
import { MenuBarCircle, SendShare } from '../../ReactRSIcon';
import classTagShortcutInput from '../hooks/Emmet/shortcutEmmetHtmlTagsAttr';

const MessageSentForm = ({ textareaRef, messagePostHandle, showMenuEmoji, showEmojiGifSection, selectEmoji, setSelectEmoji, setShowEmojiGifSection, messageLoading, showMenuEmojiHandle }) => {
    const onchangeInput = (e) => {
        heightAutoHandle(e)
        classTagShortcutInput(e, textareaRef)
    }

    //********************************************** set auto height support inbox box*************************** */
    const handleChatBoxHeight = () => {
        try {
            const sendMessageInboxForm = document.getElementById('sendMessageInboxForm');
            document.getElementById('inboxMessageBody').style.height = document.getElementById('SupportInbox').offsetHeight - (sendMessageInboxForm.offsetHeight + 60) + 'px'
        }
        catch {

        }
    }
    useEffect(() => {
        handleChatBoxHeight()
        document.body.onresize = () => {
            handleChatBoxHeight()
        }
    }, [])

    //***(*************************************************************** auto matic high increase for inbox ***************************) */
    const heightAutoHandle = (e) => {
        handleChatBoxHeight()
        e.target.style.height = 'auto';
        if (e.target.scrollHeight < 150) {
            e.target.style.height = e.target.scrollHeight + 'px'
        }
        else {
            e.target.style.height = 150 + 'px'
        }
    }

    return (
        <div>
            <form action="" onSubmit={messagePostHandle} className='flex flex-col ml-1 mr-1 relative'>
                {
                    showMenuEmoji &&
                    <div className={(showEmojiGifSection ? 'top-[-150px] h-[150px]' : ' top-[-55px]') + ' absolute left-0 bg-base-100 w-full mb-1 z-20'}>
                        <EmojiGifIndex props={{ selectEmoji, setSelectEmoji, showEmojiGifSection, setShowEmojiGifSection }} />
                    </div>

                }

                <div className='flex items-end w-full gap-2'>
                    <span
                        className='btn btn-sm btn-outline w-8 p-1 h-8 outline-none'
                        onClick={() => showMenuEmojiHandle()}
                    >
                        <MenuBarCircle size='20' />
                    </span>
                    <textarea ref={textareaRef}
                        id='textForm'
                        className='input input-success font-mono  w-full'
                        name="supportMessage"
                        onBlur={onchangeInput}
                        onKeyUp={handleChatBoxHeight}
                        onChange={onchangeInput}
                        onInput={onchangeInput}
                        onCut={heightAutoHandle}
                        onPaste={heightAutoHandle}
                        onDrop={heightAutoHandle}
                        onKeyDown={heightAutoHandle}
                        required={selectEmoji ? false : true}
                    >
                    </textarea>
                    <div>
                        {
                            messageLoading ?
                                <span className='btn btn-sm btn-primary text-xs relative'>
                                    <SendShare size='25' color='white' />
                                    <p className='absolute animate-spin border-b-2 border-r-2 w-4 h-4 rounded-[50%]'>
                                    </p>
                                </span>
                                :
                                <button className='btn btn-sm btn-primary text-xs'>
                                    <SendShare size='25' color='white' />
                                </button>
                        }


                    </div>
                </div>
                {/* <TextArea /> */}
            </form>
        </div>
    );
};

export default MessageSentForm;