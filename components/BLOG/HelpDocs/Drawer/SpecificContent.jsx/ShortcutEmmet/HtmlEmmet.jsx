import React from 'react';
import htmlTagsEmmet from '../../../hooks/HtmlTagsEmmetList';
import EmmetShow from './EmmetShow';

const HtmlEmmet = () => {
    const htmlEmmet = htmlTagsEmmet

    return (
        <div>
            <h1 className='text-center font-extrabold text-xl text-primary'>Html Tags Shortcut Emmet</h1>
            {
                htmlEmmet?.map((tags, index) => <EmmetShow
                    key={index}
                    code={tags.tagCode}
                    des={tags.des}
                    emmet={tags.tagEmmet}
                    index={index + 1}
                    language="html"
                />)
            }
        </div>
    );
};

export default HtmlEmmet;