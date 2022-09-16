import React from 'react';
import CodeHighLight from './SpecificContent/Common/CodeHighLight';
import PostCodeTemplate from './SpecificContent/Post/PostCodeTemplate';

const DrawerContentList = ({ content }) => {
    console.log(content)
    return (
        <div>
            {/* *******FOR COMMON ***** */}
            <div>
                {
                    content == 'Code Highlight' &&
                    <CodeHighLight />
                }
            </div>

            {/* ************FOR POST MENU*********** */}

            <div>
            
                {
                    content == 'Post Code Template' &&
                    <PostCodeTemplate/>
                }
            </div>
        </div>
    );
};

export default DrawerContentList;