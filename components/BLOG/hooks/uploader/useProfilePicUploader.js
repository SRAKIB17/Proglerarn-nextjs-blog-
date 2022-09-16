import React, { useState } from 'react';


const useProfilePicUploader = ({ dropdownId }) => {
    const [result, setResult] = useState('');
    const [uploading, setUploading] = useState(false)

    const [fileData, setFileData] = useState('');
    const [message, setMessage] = useState('')

    const uploadFileHandler = async (e) => {
        try {
            setUploading(true)
            e.preventDefault()
            e.stopPropagation()
            let dt = e.dataTransfer;
            let files = dt?.files[0];
            if (!files) {
                files = e.target.ownerDocument.querySelector(dropdownId).files[0];
            }



            const type = files?.type;



            const formData = new FormData()
            formData.append('image', files)


            const oReader = new FileReader()
            oReader.onload = (e) => {
                const rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;


                // image check sizes and type 
                if (!rFilter.test(type)) {
                    setMessage(<span className='label-text-alt text-success mb-8'>You should select valid files / file only!</span>)
                }
                else {


                    const result = e.target.result;
                    setMessage(<span className='label-text-alt text-success mb-8'>Successfully uploaded</span>);
                    setFileData(result);

                    fetch(`https://api.imgbb.com/1/upload?key=15847c16066308ed3e47892c5212cefd`, {
                        method: 'POST',
                        body: formData,
                    })
                        .then(response => response.json())
                        .then(resultImage => {
                            setResult(resultImage)
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });

                }
            }
            setUploading(false)
            oReader.readAsDataURL(files);
        }
        catch {

        }
    }
    return { fileData, message, uploadFileHandler, result, uploading }
};

export default useProfilePicUploader;