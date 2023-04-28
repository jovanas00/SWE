import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Registracija/Footer.css';

const SalonRegistracija = () => {
  const [salon, setSalon] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    city: '',
    address: '',
    phone: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setSalon(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/salon', salon)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <p>Registrujete se kao salon</p>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="username">Korisničko ime:</label>
        <input type="text" id="username" name="username" onChange={handleChange} value={salon.username} required />
        <label htmlFor="password">Lozinka:</label>
        <input type="password" id="password" name="password" onChange={handleChange} value={salon.password} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} value={salon.email} required />
        <label htmlFor="name">Naziv:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={salon.name} required />
        <label htmlFor="city">Grad:</label>
        <input type="text" id="city" name="city" onChange={handleChange} value={salon.city} required />
        <label htmlFor="address">Adresa:</label>
        <input type="text" id="address" name="address" onChange={handleChange} value={salon.address} required />
        <label htmlFor="phone">Broj:</label>
        <input type="text" id="phone" name="phone" onChange={handleChange} value={salon.phone} required />
        <button type="submit">Registruj se</button>
      </form>
      <p className="registration-login">Već imaš nalog? <Link to="/prijava">Prijavi se</Link></p>
    </div>
  );
};

export default SalonRegistracija;