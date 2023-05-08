import React from 'react';
import { isSalon } from '../Auth/AuthSalon';
import { Navigate } from 'react-router-dom';

const SalonPage = () => {
  if(isSalon())
  {
  return (
    <div>
      <h2>Dobrodošli na stranicu Salona!</h2>
      <p>Ovde možete pregledati informacije o salonu i njegove usluge.</p>
      {/* Dodajte odgovarajući sadržaj za stranicu Salona */}
    </div>
  );
  }
  else
  {
    return <Navigate to={{ pathname: '/prijava'}}/>
  }
};

export default SalonPage;