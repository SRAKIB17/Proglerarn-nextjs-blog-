import React from 'react';
import HtmlAttributes from '../../../hooks/HtmlAttributes';
import EmmetShow from './EmmetShow';

const AttributeEmmet = () => {


    return (
        <div>
            <h1 className='text-center font-extrabold text-xl text-primary'>Html Attribute Shortcut Emmet</h1>
            {
                HtmlAttributes?.map((attr, index) => <EmmetShow
                    key={index}
                    code={attr.attFull}
                    des={attr.des}
                    emmet={attr.attEmmet}
                    index={index + 1}
                    language="css"
                />)
            }
        </div>
    );
};

export default AttributeEmmet;