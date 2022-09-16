/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';

const PostCodeTemplate = () => {
    const [postTheme, setPostTheme] = useState('')
    useEffect(() => {
        const postTheme = localStorage.getItem('postTheme')
        setPostTheme(postTheme)
    }, [])


    const savePostThemeHandle = (e) => {
        e.preventDefault()
        localStorage.setItem('postCodeTemplate', e.target.postCodeTemplate.value)
        alert('save change')
    }
    return (
        <div>
            <form onSubmit={savePostThemeHandle}>

                <div className=" m-6 flex flex-col gap-10">

                    <div className='flex gap-3 flex-col'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="postCodeTemplate"
                                id='default'
                                className="radio radio-accent" checked
                                value='default'
                            />
                            <label htmlFor="default">
                                Default
                            </label>
                        </div>
                        <div className='ml-4'>
                            <img src='/settings/post/code_template/default.png' alt="" className='w-full md:max-w-md border rounded-sm h-full' />
                        </div>
                    </div>




                    <div className='flex gap-3 flex-col'>
                        <div className='flex items-center gap-2'>
                            <input
                                type="radio"
                                name="postCodeTemplate"
                                id='Colorful Template'
                                className="radio radio-accent"
                                checked
                                value="Colorful Template"
                            />
                            <label htmlFor="Colorful Template">
                                Colorful Template
                            </label>
                        </div>
                        <div className='ml-4'>
                            <img src='/settings/post/code_template/Colorful Template.png' alt="" className='w-full md:max-w-md border rounded-sm h-full' />
                        </div>
                    </div>

                    <div>
                        <button className='btn btn-primary btn-sm text-white'>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default PostCodeTemplate;