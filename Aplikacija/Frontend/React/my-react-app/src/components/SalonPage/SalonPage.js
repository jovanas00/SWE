import React from 'react';
import { isSalon } from '../Auth/AuthSalon';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';

const SalonPage = () => {
  if(isSalon())
  {
  return (
    <Header>
    <div>
      <h2>Dobrodošli na stranicu Salona!</h2>
      <p>Ovde možete pregledati informacije o salonu i njegove usluge.</p>
      {/* Dodajte odgovarajući sadržaj za stranicu Salona */}
    </div>
    </Header>
  );
  }
  else
  {
    const role = vratiRole();
    if(role==="Klijent")
      return <Navigate to={{ pathname: '/klijent' }} />
    if(role==="Admin")
      return <Navigate to={{ pathname: '/admin' }} />
    return <Navigate to={{ pathname: '/prijava'}}/>
  }
};

export default SalonPage;