import React from 'react';

const QuickPost = ({ props: { quickVideoPost, setQuickVideoPost, quickTextPost, setQuickTextPost, textareaRef } }) => {
    const quickPostButtonHandle = (mode) => {

        switch (mode) {

            case 'text':
                setQuickTextPost(true);
                setQuickVideoPost(false);
                break;

            case 'video':
                try {
                    textareaRef.current.value = `
                <video
                    width="320"
                    height="240"
                    preload="auto"
                    controls
                    muted
                    loop
                    autoplay
                    poster="http://rakib17.hexat.com/icon/busy.gif"
                >
                    <source
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                        type="video/mp4"
                    />
                    <source
                        src="movie.ogg"
                        type="video/ogg"
                    />
                    Your browser does not support the video tag.
                </video>
                    `
                }
                catch {

                }
                setQuickTextPost(false);
                setQuickVideoPost(true);
                break;

            default:
                break;
        }
    }
    return (
        <div>
            <div className='flex gap-4 ml-6 md:ml-8 mt-4'>
                <div>
                    <button onClick={() => quickPostButtonHandle('text')} className={(quickTextPost ? 'text-white btn-disabled bg-green-500 ' : 'btn-outline ') + ' btn  btn-sm btn-success'}>Text </button>
                </div>

                <div>
                    <button onClick={() => quickPostButtonHandle('video')} className={(quickVideoPost ? 'text-white btn-disabled bg-green-500 ' : 'btn-outline ') + ' btn  btn-sm btn-success'}>Video </button>
                </div>
            </div>
        </div>
    );
};

export default QuickPost;