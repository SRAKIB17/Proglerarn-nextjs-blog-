import React, { useEffect } from 'react';
import AttributeEmmet from './SpecificContent.jsx/ShortcutEmmet/AttributeEmmet';
import HtmlEmmet from './SpecificContent.jsx/ShortcutEmmet/HtmlEmmet';

const DrawerSpecificContentShow = ({ content }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [content])
    return (
        <div>
            {/* Shortcut emmet** */}
            <div>
                {
                    content === "HTML Tags shortcut emmet" &&
                    <HtmlEmmet />
                }
                {
                    content === 'HTML Attribute shortcut emmet' &&
                    <AttributeEmmet />
                }
            </div>
        </div>
    );
};

export default DrawerSpecificContentShow;