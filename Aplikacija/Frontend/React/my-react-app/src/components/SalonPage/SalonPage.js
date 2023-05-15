import React from 'react';
import { isSalon } from '../Auth/AuthSalon';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import SalonProfil from './SalonProfil';

const SalonPage = () => {
  if (isSalon()) {
    return (
          <div>
            <Header />
            <SalonProfil />
          </div>
    );
  }
  else {
    const role = vratiRole();
    if (role === "Klijent")
      return <Navigate to={{ pathname: '/klijent' }} />
    if (role === "Admin")
      return <Navigate to={{ pathname: '/admin' }} />
    return <Navigate to={{ pathname: '/prijava' }} />
  }
};

export default SalonPage;