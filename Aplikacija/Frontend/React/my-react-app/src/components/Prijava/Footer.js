import React, { useState } from 'react';
import './Footer.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

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
        const token = response.data;
        console.log(token);
        localStorage.setItem('token', token); // čuvamo token u local storage
        console.log(localStorage.getItem('token')); // <--- dodajte ovo
        const decodedToken = jwt_decode(token);
        if (decodedToken.Role === 'Klijent') {
          window.location.href = '/klijent'; // redirektujemo na klijentsku stranicu
        } else if (decodedToken.Role === 'Salon') {
          window.location.href = '/salon'; // redirektujemo na salonsku stranicu
        } else {
          console.log('Unknown user role');
        }
      })
      .catch(error => {
        console.log(error);
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
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Footer;