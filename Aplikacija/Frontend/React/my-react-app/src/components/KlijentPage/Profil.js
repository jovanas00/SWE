import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import Informacije from './Informacije';


const Profil = () => {
    if (isKlijent()) {
        return (
            <div>
                <Header />
                <Informacije/>
                <h1>Detalji o narudzbinama i zahtevima</h1>
            </div>

        );
    }
    else {
        const role = vratiRole();
        if (role === "Admin")
            return <Navigate to={{ pathname: '/admin' }} />
        if (role === "Salon")
            return <Navigate to={{ pathname: '/salon' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default Profil;