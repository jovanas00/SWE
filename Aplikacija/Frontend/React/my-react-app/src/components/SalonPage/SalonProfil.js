import React from "react";
import { isSalon } from "../Auth/AuthSalon";
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import Informacije from "./Informacije";
import TokenChecker from "../Auth/TokenChecker";

const SalonProfil = () => {
    if (isSalon()) {
        return (
            <div>
                <Informacije />
                <TokenChecker/>
            </div>     
        );
    }
    else {
        const role = vratiRole();
        if (role === "Admin")
            return <Navigate to={{ pathname: '/admin' }} />
        if (role === "Klijent")
            return <Navigate to={{ pathname: '/klijent' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default SalonProfil;