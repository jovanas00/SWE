import React from 'react';
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
import { useState } from 'react';

// Importujte komponente za administratora, salon i klijenta
import AdminPage from './components/AdminPage/AdminPage';
import SalonPage from './components/SalonPage/SalonPage';
import SalonUpravljanje from './components/SalonPage/SalonUpravljanje';
import KlijentPage from './components/KlijentPage/KlijentPage';
import Profil from './components/KlijentPage/Profil';


function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Pocetna />} />
            <Route path="/saloni" element={<Saloni />} />
            <Route path="/prijava" element={<Prijava />} />
            <Route path="/registracija" element={<Registracija />} />
            <Route path="/saloni/:id" element={<SalonStranica />} />

            {/* Dodajte rute za administratora, salon i klijenta */}
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/salon" element={<SalonPage />} />
            <Route path="/klijent" element={<KlijentPage />} />
            <Route path="/klijent/saloni" element={<Saloni />} />
            <Route path="/klijent/saloni/:id" element={<SalonStranica />} />
            <Route path="/klijent/profil" element={<Profil />} />
            <Route path="/salon/upravljanje" element={<SalonUpravljanje />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;