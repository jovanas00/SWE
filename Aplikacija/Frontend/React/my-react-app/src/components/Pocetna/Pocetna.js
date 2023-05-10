import React from 'react';
import Header from './Header';
import Slider from './Slider';
import Footer from './Footer';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';

const role = vratiRole();
function Pocetna() {
  if(!role)
  {
  return (
    <div className="Pocetna">
      <Header />
      <Slider />
      <Footer />
    </div>
  );
  }
  else{
    return <Navigate to={{ pathname: `/${role.toLowerCase()}` }} />;
  }
}

export default Pocetna;