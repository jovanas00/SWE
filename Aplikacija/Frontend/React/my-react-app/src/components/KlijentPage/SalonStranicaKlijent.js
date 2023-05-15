import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import Body from '../Saloni/Body';
import SalonStranica from '../Saloni/SalonStranica';


const SalonStranicaKlijent = () => {
    if (isKlijent()) {
        return (
            <div>
                <SalonStranica/>
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

export default SalonStranicaKlijent;