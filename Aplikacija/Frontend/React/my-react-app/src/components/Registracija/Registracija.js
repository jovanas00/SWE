import React from "react";
import Header from '../Pocetna/Header';
import Footer from '../Registracija/Footer'

const Registracija = () => {
    return (
      <div>
        <Header />
        <div style={{ textAlign: "center", marginTop: "1em" }}>
          <h2>Napravite novi nalog kao klijent ili salon!</h2>
        </div>
        <Footer />
      </div>
    );
  };

export default Registracija;