import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';


const ProfilKlijent = () => {
    if (isKlijent()) {
        return (
            <div>
                <Header />
                <h1>Detalji o profilu</h1>
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

export default ProfilKlijent;