import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Pocetna from './components/Pocetna/Pocetna';
import Saloni from './components/Saloni/Saloni';
import Prijava from './components/Prijava/Prijava';
import Registracija from './components/Registracija/Registracija';
import SalonStranica from './components/Saloni/SalonStranica';
import AdminPage from './components/AdminPage/AdminPage';
import SalonPage from './components/SalonPage/SalonPage';
import Profil from './components/KlijentPage/Profil';
import SaloniKlijent from './components/KlijentPage/SaloniKlijent';
import SalonStranicaKlijent from './components/KlijentPage/SalonStranicaKlijent';
import SaloniAdmin from './components/AdminPage/SaloniAdmin'
import SalonStranicaAdmin from './components/AdminPage/SalonStranicaAdmin';


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

            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/saloni" element={<SaloniAdmin />} />
            <Route path="/admin/saloni/:id" element={<SalonStranicaAdmin />} />
            <Route path="/salon" element={<SalonPage />} />
            <Route path="/klijent" element={<SaloniKlijent />} />
            <Route path="/klijent/:id" element={<SalonStranicaKlijent />} />

            <Route path="/klijent/profil" element={<Profil />} />

          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;