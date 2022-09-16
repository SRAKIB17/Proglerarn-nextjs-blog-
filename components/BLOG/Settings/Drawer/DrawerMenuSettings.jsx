import React from 'react';
import CommonMenu from './SpecificMenu/CommonMenu';
import PostMenu from './SpecificMenu/PostMenu';
// import ShortcutEmmet from './DrawerDocsSpecific/ShortcutEmmetContentMenu';

const DrawerMenuSettings = ({ setContent }) => {
    const showSubMenu = (e) => {
        console.log(e)
    }
    return (
        <div className="drawer-side">
            <label htmlFor="settingsMenuContent" className="drawer-overlay"></label>
            <ul
                className="menu p-4 overflow-y-auto w-64 rounded-md shadow-md  bg-[#201B4E] gap-1"
            >
                <CommonMenu setContent={setContent} />

                {/* *********for post menu***** */}

                <PostMenu setContent={setContent}/>
            </ul>

        </div>
    );
};

export default DrawerMenuSettings;
