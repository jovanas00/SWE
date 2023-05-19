import React, { useState, useRef } from 'react';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import Cookies from 'js-cookie';
import '../UI/Button.css';

const UploadFile = ({id}) => {
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

        fetch(`http://localhost:5169/Proizvod/UploadProizvodSlika/${id}`, {
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
            <button onClick={handleClickUpload} className="customButton">Promeni sliku</button>
        </div>
    );
};

export default UploadFile;
