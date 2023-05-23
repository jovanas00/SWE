import React, { useState, useRef } from 'react';
import { FaBars, FaTimes, FaCogs } from 'react-icons/fa';
import './Header.css';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Header = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const navigate = useNavigate()

  const showNavbar = () => {
    setIsNavbarVisible(true);
  };

  const hideNavbar = () => {
    setIsNavbarVisible(false);
  };

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/prijava')
  };

  const role = vratiRole();
  const klijent = role === "Klijent" ? "Klijent" : null;
  const salon = role === "Salon" ? "Salon" : null;
  const admin = role === "Admin" ? "Admin" : null;

  if (!role) {
    return (
      <header>
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <h3>Pet Planet</h3>
        </div>
        <nav className={isNavbarVisible ? 'responsive_nav' : ''}>
          {/* url */}
          <Link to="/">Pocetna</Link>
          <Link to="/saloni">Saloni</Link>
          <Link to="/prijava">Prijavi se</Link>
          <Link to="/registracija">Registruj se</Link>
          <button className="nav-btn nav-close-btn" onClick={hideNavbar}>
            <FaTimes />
          </button>
        </nav>
        {/* za otvaranje navbara u nav screenu */}
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    );
  } else {
    return (
      <header>
        {(admin || salon) && (
          <div className="logo">
            <img src={logo} alt="Logo" />
            <h3>Pet Planet</h3>
          </div>
        )}
        {klijent && (<div className="logo">
          <Link to="/klijent">
            <img src={logo} alt="Logo" />
          </Link>
          <h3>Pet Planet</h3>
        </div>)}
        <nav className={isNavbarVisible ? 'responsive_nav' : ''}>
          {/* url */}
          {klijent && <Link to="/klijent">Saloni</Link>}
          {admin && <Link to="/admin/saloni">Saloni</Link>}
          {klijent && <Link to="/klijent/profil">Profil</Link>}
          {salon && <Link to="/salon">Profil</Link>}
          {(klijent || salon || admin) &&
            <Link to="/prijava" onClick={handleLogout}>
              Log out
            </Link>
          }
          {/* {salon && <Link to="/salon/upravljanje"><FaCogs style={{ fontSize: '1.5rem' }} /></Link>} */}
          <button className="nav-btn nav-close-btn" onClick={hideNavbar}>
            <FaTimes />
          </button>
        </nav>
        {/* za ptvaranje navbara u nav screenu */}
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    );
  }
};



export default Header;