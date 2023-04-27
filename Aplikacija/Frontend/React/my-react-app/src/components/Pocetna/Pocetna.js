import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';

function Pocetna() {
  return (
    <div className="Pocetna">
      <Header />
      <Slider />
      <div className="main-content">
      </div>
      <Footer />
    </div>
  );
}

export default Pocetna;