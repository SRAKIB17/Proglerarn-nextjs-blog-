import React from 'react';
import Right_arrow from '../../SvgComponent/Right_arrow';

const PostMenu = ({ setContent }) => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-100  rounded-sm">
                <input type="checkbox" className='peer' />
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                    Post
                </div>
                <div className="collapse-content bg-primary text-primary-content  peer-checked:bg-base-100 peer-checked:text-base-content">
                    <ul className="menu bg-base-100 w-full">
                        <li>
                            <button onClick={() => setContent('Post Code Template')}>
                                <Right_arrow />
                                Code Template
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PostMenu;