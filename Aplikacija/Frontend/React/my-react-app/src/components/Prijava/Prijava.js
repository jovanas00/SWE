import React from "react";
import Header from '../Pocetna/Header';
import Footer from '../Prijava/Footer';

const Prijava = () => {
  return (
    <div>
      <Header />
      <div style={{ textAlign: "center", marginTop: "1em" }}>
        <h2>Stranica za prijavu</h2>
      </div>
      <Footer />
    </div>
    
  );
};

export default Prijava;