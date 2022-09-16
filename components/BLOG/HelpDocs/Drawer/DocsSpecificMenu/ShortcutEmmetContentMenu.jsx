import React from 'react';
import Right_arrow from '../../../Settings/SvgComponent/Right_arrow';

const ShortcutEmmetContentMenu = ({ setContent }) => {
    return (
        <div>
            <div className="collapse collapse-arrow bg-base-100  rounded-sm">
                <input type="checkbox" className='peer' />
                <div className="collapse-title bg-primary text-primary-content peer-checked:bg-base-100 peer-checked:text-base-content">
                    Shortcut Emmet
                </div>
                <div className="collapse-content bg-primary text-primary-content  peer-checked:bg-base-100 peer-checked:text-base-content">
                    <ul className="menu bg-base-100 w-full">
                        <li>
                            <button onClick={() => setContent('HTML Tags shortcut emmet')}>
                                <Right_arrow />
                                Html Tags
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setContent('HTML Attribute shortcut emmet')}>
                                <Right_arrow />
                                Html Attribute
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShortcutEmmetContentMenu;