import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import Body from '../Saloni/Body';
import TokenChecker from '../Auth/TokenChecker';


const SaloniKlijent = () => {
    if (isKlijent()) {
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
        if (role === "Admin")
            return <Navigate to={{ pathname: '/admin' }} />
        if (role === "Salon")
            return <Navigate to={{ pathname: '/salon' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default SaloniKlijent;