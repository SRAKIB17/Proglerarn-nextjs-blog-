import React, { useEffect, useState } from 'react';
import DrawerMenu from '../../components/BLOG/HelpDocs/Drawer/DrawerMenuDocs';
import DrawerSpecificContentShow from '../../components/BLOG/HelpDocs/Drawer/DrawerSpecificContentShow';
import Right_arrow from '../../components/BLOG/Settings/SvgComponent/Right_arrow';

const Index = () => {

    const [content, setContent] = useState('HTML Tags shortcut emmet');

    return (
        <div>
            <div className="drawer drawer-mobile">
                <input id="docsMenuContent" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col ">
                    {/* <!-- Page content here --> */}
                    <div className='m-1'>
                        <label
                            htmlFor="docsMenuContent"
                            className="btn btn-ghost drawer-button lg:hidden m-1"
                        >
                            <Right_arrow strokeWidth='16' />
                        </label>
                    </div>
                <div>
                    <DrawerSpecificContentShow content={content} />
                </div>
            </div>
            {/* ************** DRAWER MENU****************** */}
            <DrawerMenu setContent={setContent} />
        </div>


        </div >
    );
};

export default Index;