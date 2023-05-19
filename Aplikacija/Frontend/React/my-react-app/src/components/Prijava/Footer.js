import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { vratiRole } from '../Auth/VratiRole';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`http://localhost:5169/Korisnik/Login/${prijava.korisnickoIme}/${prijava.lozinka}`)
      .then(response => {
        const { token } = response.data;
        console.log(token);
        Cookies.set('token', token, { expires: 3600 / (24 * 60 * 60) }); //postavlja cookie i vreme kad ističe (1h)
        const userRole = vratiRole();

        console.log(userRole); // pristupanje ulozi korisnika
        if (userRole === 'Klijent') {
          window.location.href = '/klijent';
        } else if (userRole === 'Salon') {
          window.location.href = '/salon';
        } else if (userRole === 'Admin') {
          window.location.href = '/admin';
        } else {
          console.log('Ne znam koji je tip korisnika!');
        }
      })
      .catch(error => {
        console.log(error);
        window.alert('Pogrešno korisničko ime ili lozinka!');
      });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Prijavi se</h2>
        <div className="form-group">
          <label htmlFor="korisnickoIme">Korisničko ime:</label>
          <input type="text" id="korisnickoIme" name="korisnickoIme" value={prijava.korisnickoIme} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lozinka">Lozinka:</label>
          <input type="password" id="lozinka" name="lozinka" value={prijava.lozinka} onChange={handleChange} required />
        </div>
        <div className="loginForm-button">
          <button className="prijava-button" type="submit">Prijavi se</button>
        </div>
        <p className="registration-login">Nemaš nalog? <Link to="/registracija">Registruj se</Link></p>
      </form>
    </div>
  );
};

export default Footer;
