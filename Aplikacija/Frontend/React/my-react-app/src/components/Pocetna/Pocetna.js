import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';

function Pocetna() {
  return (
    <div className="Pocetna">
      <Header />
      <Slider />
      <Footer />
    </div>
  );
}

export default Pocetna;