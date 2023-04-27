import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Header from './components/Pocetna/Header';
import Slider from './components/Pocetna/Slider';
import Pocetna from './components/Pocetna/Pocetna';
import Saloni from './components/Saloni/Saloni';
import Prijava from './components/Prijava/Prijava';
import Registracija from './components/Registracija/Registracija';


function App() {
  return (
    <Router>
      <div>


        <Routes>
          <Route path="/" element={<Pocetna />} />
          <Route path="/saloni" element={<Saloni />} />
          <Route path="/prijavise" element={<Prijava />} />
          <Route path="/registrujse" element={<Registracija />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;