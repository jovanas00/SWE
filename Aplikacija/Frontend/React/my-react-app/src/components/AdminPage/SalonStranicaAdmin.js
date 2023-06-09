import React from 'react';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import SalonStranica from '../Saloni/SalonStranica';
import TokenChecker from '../Auth/TokenChecker';
import { isAdmin } from '../Auth/AuthAdmin';


const SalonStranicaAdmin = () => {
    if (isAdmin()) {
        return (
            <div>
                <TokenChecker/>
                <SalonStranica/>
            </div>
        );
    }
    else {
        const role = vratiRole();
        if (role === "Klijent")
            return <Navigate to={{ pathname: '/klijent' }} />
        if (role === "Salon")
            return <Navigate to={{ pathname: '/salon' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default SalonStranicaAdmin;