import React, { useState, useRef, Fragment } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';
import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { ImCross } from 'react-icons/im';

const Header = () => {
  const navRef = useRef(); //referenca na element s kojim se radi na ekranu

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return (
    <header >
      <div className="logo">
        <a href="/#"><img src={logo} alt="Logo" /></a>
        <h3>Pet Planet</h3>
      </div>
      {/* <h3 className="logo"><a href="/#"><img src={logo} alt="Logo" /></a></h3> */}
      <nav ref={navRef}>
        <a href="/#">Pocetna</a>
        <a href="/#">Saloni</a>
        <a href="/#">Prijavi se</a>
        <a href="/#">Registruj se</a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes/>
        </button>
      </nav>
      {/* za ptvaranje navbara u nav screenu */}
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
    // <nav className="navbar">
    //   <div className="container">
    //     <h3 className="logo">Logo</h3>

    //     <ul className={mobile? "nav-links-mobile" : "nav-links"} onClick={() =>setMobile(false)}>
    //       <Link to="/" className="pocetna">
    //         <li>Pocetna</li>
    //       </Link>
    //       <Link to="/saloni" className="saloni">
    //         <li>Saloni</li>
    //       </Link>
    //       <Link to="/prijavise" className="prijavise">
    //         <li>Prijavi se</li>
    //       </Link>
    //       <Link to="/registrujse" className="registrujse">
    //         <li>Registruj se</li>
    //       </Link>
    //     </ul>
    //     <button className="mobile-menu-icon" onClick={() => setMobile(!mobile)}>
    //       {mobile? <ImCross/> : <FaBars/>}
    //     </button>
    //   </div>
    //</nav>


  );
};

export default Header;