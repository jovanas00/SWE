import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';

const KlijentPage = () => {
if(isKlijent())
{
  return (
    <Header>
    <div>
      <h2>Dobrodošli na stranicu Klijenta!</h2>
      <p>Ovde možete pregledati informacije o klijentu i obavljati odgovarajuće akcije.</p>
      {/* Dodajte odgovarajući sadržaj za stranicu Klijenta */}
    </div>
    </Header>
  );
}
else
{
    const role = vratiRole();
      if(role==="Admin")
        return <Navigate to={{ pathname: '/admin' }} />
      if(role==="Salon")
        return <Navigate to={{ pathname: '/salon' }} />
    return <Navigate to={{ pathname: '/prijava'}}/>
}
};

export default KlijentPage;