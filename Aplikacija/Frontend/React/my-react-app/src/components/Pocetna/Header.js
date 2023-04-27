import React, { useState, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navRef = useRef(null); // dodaj null da se ne bi javila greška

  const showNavbar = () => {
    if (navRef.current) { // proveri da li postoji referenca
      navRef.current.classList.toggle("responsive_nav");
    }
  }

  return (
    <header>
      <div className="logo">
        <a href="/#"><img src={logo} alt="Logo" /></a>
        <h3 className="petplanet-header">Pet Planet</h3> {/* ispravi klasu */}
      </div>
      <nav className={isNavOpen ? 'nav-open' : ''} ref={navRef}> {/* dodaj ref */}
        <Link to="/" onClick={() => setIsNavOpen(false)}>
          Početna
        </Link>
        <Link to="/saloni" onClick={() => setIsNavOpen(false)}>
          Saloni
        </Link>
        <Link to="/prijavise" onClick={() => setIsNavOpen(false)}>
          Prijavi se
        </Link>
        <Link to="/registrujse" onClick={() => setIsNavOpen(false)}>
          Registruj se
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes/>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default Header;
