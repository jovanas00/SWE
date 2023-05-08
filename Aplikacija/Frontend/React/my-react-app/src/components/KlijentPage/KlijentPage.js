import React from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';

const KlijentPage = () => {
if(isKlijent())
{
  return (
    <div>
      <h2>Dobrodošli na stranicu Klijenta!</h2>
      <p>Ovde možete pregledati informacije o klijentu i obavljati odgovarajuće akcije.</p>
      {/* Dodajte odgovarajući sadržaj za stranicu Klijenta */}
    </div>
  );
}
else
{
  return <Navigate to={{ pathname: '/prijava'}}/>
}
};

export default KlijentPage;