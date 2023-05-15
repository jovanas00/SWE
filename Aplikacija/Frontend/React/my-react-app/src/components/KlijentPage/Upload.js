import React, { useState, useRef } from 'react';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import Cookies from 'js-cookie';

const UploadFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
    const korisnicko_ime = vratiKorisnickoIme();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        handleFileSelected(file);
    };

    const handleFileSelected = (file) => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        fetch(`http://localhost:5169/Korisnik/Upload/${korisnicko_ime}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                // Handle any errors
            });
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <button className='button-primary' onClick={handleClickUpload}>Promeni sliku</button>
        </div>
    );
};

export default UploadFile;
