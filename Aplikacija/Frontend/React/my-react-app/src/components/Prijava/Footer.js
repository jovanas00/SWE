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
        const { token } = response.data;
        console.log(token);
        localStorage.setItem('token', token);
        console.log(localStorage.getItem('token'));
        const decodedToken = jwt_decode(token);
        const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
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
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Footer;
