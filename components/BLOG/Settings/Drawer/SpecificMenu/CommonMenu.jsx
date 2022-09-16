import React from 'react';
import Right_arrow from '../../SvgComponent/Right_arrow';

const CommonMenu = ({ setContent }) => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-100  rounded-sm">
                <input type="checkbox" className='peer' />
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                    Common
                </div>
                <div className="collapse-content bg-primary text-primary-content  peer-checked:bg-base-100 peer-checked:text-base-content">
                    <ul className="menu bg-base-100 w-full">
                        <li>
                            <button onClick={() => setContent('Code Highlight')}>
                                <Right_arrow />
                                Code Highlight
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CommonMenu;