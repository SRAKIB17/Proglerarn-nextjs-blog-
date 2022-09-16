import React, { useEffect } from 'react';
import useProfilePicUploader from '../../hooks/uploader/useProfilePicUploader';

const ProfilePic = ({ setProfileThumbnail, profileThumbnail }) => {
    const { fileData, uploadFileHandler, message, result, uploading } = useProfilePicUploader({ dropdownId: "#uploaderProfilePhotoManual" });
    useEffect(() => {
        // setThumbnailData(fileData);
        setProfileThumbnail(result?.data?.url)
    }, [fileData, result])

    const imageDrop = (e) => {
        uploadFileHandler(e)
    }
    const hightLightHandle = event => {
        event.preventDefault()
        event.stopPropagation()
        event.target.ownerDocument.querySelector('#uploaderProfileFile').classList.add('highlight')
    }
    const unHightLightHandel = event => {
        event.preventDefault()
        event.stopPropagation()
        event.target.ownerDocument.querySelector('#uploaderProfileFile').classList.remove('highlight')
    }


    return (
        <div>

            <div className=' max-w-xs w-full'>
                <h1 className='text-primary text-xl font-bold m-2'>
                    Profile Photo
                </h1>
                <div>
                    <p className='text-red-600'>
                        {message}
                    </p>
                    <div className='relative'>

                        <div
                            onDragEnter={hightLightHandle}
                            onDragOver={hightLightHandle}
                            onDragLeave={unHightLightHandel}
                            onDrop={imageDrop} id="uploaderProfileFile">

                            <p>Upload a file with the file dialog or by dragging and dropping images onto the dashed region</p>
                        </div>

                        {
                            uploading &&
                            <div>
                                <div className='flex justify-center pt-8 mb-8 overflow-hidden'>
                                    <div className='animate-spin text-center absolute top-0 border-l-4 w-28 h-28 rounded-[50%] border-primary'>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="divider">OR</div>
                    <div>
                        <label className="  btn btn-primary btn-sm text-white mb-2">
                            <input
                                type="file" name="image_file" id="uploaderProfilePhotoManual"
                                className='form-control absolute top-[-10000px] p-3'
                                onChange={(e) => uploadFileHandler(e)}
                            />

                            <span>Select a file</span>
                        </label>
                    </div >
                </div>
                <div className='shadow-md w-fit p-2'>
                    {/* <img src={pictureThumbnail} className='max-w-40 max-h-40 rounded-md' alt="" /> */}
                </div>

            </div>
        </div>
    );
};

export default ProfilePic;