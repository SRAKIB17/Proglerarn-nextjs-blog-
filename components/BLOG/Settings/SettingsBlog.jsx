import React, { useState } from 'react';
import DrawerContentList from './Drawer/DrawerContentList';
import DrawerMenuSettings from './Drawer/DrawerMenuSettings';
import Right_arrow from './SvgComponent/Right_arrow';
// import DrawerMenu from '../../components/BLOG/HelpDocs/Drawer/DrawerMenuDocs';

const Index = () => {
    const showSubmenu = event => {
        console.log(event.target)
        // document.getElementById('sfs').
    }
    const [content, setContent] = useState('');
    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="settingsMenuContent" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* <!-- Page content here --> */}
                    <div>
                        <label
                            htmlFor="settingsMenuContent"
                            className="btn btn-ghost drawer-button lg:hidden m-1"
                        >
                            <Right_arrow  strokeWidth='16'/>
                        </label>
                    </div>
                    <div>
                        <DrawerContentList content={content} />
                    </div>
                </div>
                {/* ************** DRAWER MENU****************** */}
                <DrawerMenuSettings setContent={setContent} />
            </div>


        </div>
    );
};

export default Index;