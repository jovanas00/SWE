import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './components/Pocetna/Header';
import Slider from './components/Pocetna/Slider';
import Pocetna from './components/Pocetna/Pocetna';
import Saloni from './components/Saloni/Saloni';
import Prijava from './components/Prijava/Prijava';
import Registracija from './components/Registracija/Registracija';
import SalonStranica from './components/Saloni/SalonStranica';
import axios, { Axios } from 'axios';


function App() {
  // useEffect(()=>{
  //   axios.get('http://localhost:5169/Proizvod/VratiSveProizvode')
  //   .then((response)=>{
  //     console.log(response.data);
  //   })
  // })
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/saloni" element={<Saloni />} />
          <Route path="/prijava" element={<Prijava />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/saloni/:id" element={<SalonStranica />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;