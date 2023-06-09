import React from 'react';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import Body from '../Saloni/Body';
import TokenChecker from '../Auth/TokenChecker';
import { isAdmin } from '../Auth/AuthAdmin';


const SaloniStranicaAdmin = () => {
    if (isAdmin()) {
        return (
            <div>
                <Header />
                <TokenChecker/>
                <Body/>
            </div>
        );
    }
    else {
        const role = vratiRole();
        if (role === "Klijent")
            return <Navigate to={{ pathname: '/admin' }} />
        if (role === "Salon")
            return <Navigate to={{ pathname: '/salon' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default SaloniStranicaAdmin;