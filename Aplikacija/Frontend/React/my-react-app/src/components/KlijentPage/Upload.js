import React, { useState, useRef } from 'react';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import api from '../Auth/Interceptor';
import { obavestenja } from '../UI/Obavestenja';

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

        api.post(`/Korisnik/Upload/${korisnicko_ime}`, formData)
            .then((response) => response.data)
            .then((data) => {
                console.log(data);
                obavestenja('Uspesno promenjena slika','success')
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.data)
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
