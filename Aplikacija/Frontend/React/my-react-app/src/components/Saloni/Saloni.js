import React from 'react';
import Body from '../Saloni/Body';
import Header from '../Pocetna/Header';

const Salon = () => {
  return (
    <div>
      <Header />
      <div style={{ textAlign: "center", marginTop: "1em" }}>
        <h1>Dobrodošli na stranicu za salone!</h1>
        <p>Ovde ćete pronaći sve informacije o salonima za vaše ljubimce.</p>
      </div>
      <Body />
    </div>
  );
};

export default Salon;