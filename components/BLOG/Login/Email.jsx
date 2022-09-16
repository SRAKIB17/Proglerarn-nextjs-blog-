import React from 'react';

const Email = ({ emailCheckHandler }) => {
    return (
        <div>
            <input
                type="email"
                placeholder="email"
                id='email'
                onKeyUp={emailCheckHandler}
                className="input rounded-3xl input-bordered border-primary w-full"
                required
            />
        </div>
    );
};

export default Email;