import React from 'react';

const NameGender = () => {
    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder="Name"
                    id='name'
                    className="input rounded-3xl input-bordered border-primary w-full"
                    required
                />
            </div>
            <div className='flex gap-1 items-center'>
                <select id='Gender' name='gender' className="rounded-3xl select border-primary select-bordered select-md w-full" required>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                </select>
            </div>
        </>
    );
};

export default NameGender;