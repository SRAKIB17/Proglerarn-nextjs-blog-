import React, { useEffect, useState } from 'react';
import useUploadImagePost from '../../hooks/uploader/useUploadImagePost';

const ImageUpload = ({ props }) => {
    // console.log(props)
    const { setThumbnail, setThumbnailData } = props || {};
    const { fileData, uploadFileHandler, message, result } = useUploadImagePost();

    useEffect(() => {
        setThumbnailData(fileData);
        setThumbnail(result?.data?.url)
    }, [fileData, result, setThumbnail, setThumbnailData])


    const imageDrop = (e) => {
        uploadFileHandler(e)
    }
    const hightLightHandle = event => {
        event.preventDefault()
        event.stopPropagation()
        event.target.ownerDocument.querySelector('#uploaderFile').classList.add('highlight')
    }
    const unHightLightHandel = event => {
        event.preventDefault()
        event.stopPropagation()
        event.target.ownerDocument.querySelector('#uploaderFile').classList.remove('highlight')
    }

    return (
        <div className=' max-w-xs w-full'>
            <div>
                <div
                    onDragEnter={hightLightHandle}
                    onDragOver={hightLightHandle}
                    onDragLeave={unHightLightHandel}
                    onDrop={imageDrop} id="uploaderFile">

                    <p>Upload a file with the file dialog or by dragging and dropping images onto the dashed region</p>


                </div>
                <div className="divider">OR</div>
                <div>
                    <label className="  btn btn-primary btn-sm text-white">
                        <input type="file" name="image_file" id="uploaderManually" className='form-control absolute top-[-10000px] p-3' onChange={(e) => uploadFileHandler(e)} />
                        <span>Select a file</span>
                    </label>
                </div>
                {message && <span className='label-text-alt text-red-500 mb-4'>  {message}</span>}
            </div >

        </div>
    );
};

export default ImageUpload;