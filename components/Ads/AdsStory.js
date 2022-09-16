import React, { useState } from 'react';
import bg from '../../public/loginBg.jpg'

const AdsStory = () => {
    const addShow = [true, false, true, false, true, false, true]
    const getShowState = addShow[Math.floor(Math.random() * addShow.length)]
    const [hideAds, setHideAds] = useState(true)
    return (
        <div>
            {
                (getShowState && hideAds) &&
                <div
                    className='relative rounded-md'
                    style={{ backgroundImage: `url('${bg?.src}')`, backgroundSize: 'cover', backgroundPosition: '100% 100% ' }}
                >
                    <div className='w-full h-16  mb-1 rounded-md relative text-white'>
                        <div>
                            <button
                                className='absolute right-2 top-1 btn btn-xs w-[5px] h-[5px] btn-warning outline-primary  btn-outline'
                                onClick={() => setHideAds(null)}
                            >
                                X
                            </button>
                        </div>
                        <div className='cursor-pointer'>
                            <h1 className='text-xl  font-mono font-light border-2 cursor-pointer'>All is good ..Some Special feature coming</h1>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default AdsStory;