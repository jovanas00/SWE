import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { vratiRole } from '../Auth/VratiRole';
import { obavestenja } from '../UI/Obavestenja';

const Footer = () => {
  const [prijava, setPrijava] = useState({
    korisnickoIme: '',
    lozinka: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setPrijava(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .get(`http://localhost:5169/Korisnik/Login/${prijava.korisnickoIme}/${prijava.lozinka}`)
      .then(response => {
        const { token } = response.data;
        //console.log(token);
        Cookies.set('token', token, { expires: 3600 / (24 * 60 * 60) });//1h
        const userRole = vratiRole();
        //console.log(userRole);
        if (userRole === 'Klijent') {
          window.location.href = '/klijent';
        } else if (userRole === 'Salon') {
          window.location.href = '/salon';
        } else if (userRole === 'Admin') {
          window.location.href = '/admin';
        } else {
          console.log('Nepoznat tip!');
        }
      })
      .catch(error => {
        console.log(error);
        obavestenja('Pogrešno korisničko ime ili lozinka!', 'danger');
      });
  };

  return (
    <div className="login-container">
      <div className="login-form-left"></div>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form-inner">
          
          <div className="form-group">
            <label htmlFor="korisnickoIme">Korisničko ime:</label>
            <input
              type="text"
              id="korisnickoIme"
              name="korisnickoIme"
              value={prijava.korisnickoIme}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lozinka">Lozinka:</label>
            <input
              type="password"
              id="lozinka"
              name="lozinka"
              value={prijava.lozinka}
              onChange={handleChange}
              required
            />
          </div>
          <div className="loginForm-button">
            <button className="prijava-button" type="submit">
              Prijavi se
            </button>
          </div>
          <p className="registration-login1">
            Nemaš nalog? <Link to="/registracija">Registruj se</Link>
          </p>
        </div>
      </form>
      <div className="login-form-right"></div>
    </div>
  );
};

export default Footer;

