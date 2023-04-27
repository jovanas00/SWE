import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Registracija/Footer.css';

const KlijentRegistracija = () => {
  const [client, setClient] = useState({
    username: '',
    password: '',
    email: '',
    name: '',
    surname: '',
    address: '',
    phone: '',
    city: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setClient(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:3000/client', client)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <p>Registrujete se kao klijent</p>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="username">Korisničko ime:</label>
        <input type="text" id="username" name="username" onChange={handleChange} value={client.username} required />
        <label htmlFor="password">Lozinka:</label>
        <input type="password" id="password" name="password" onChange={handleChange} value={client.password} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} value={client.email} required />
        <label htmlFor="name">Ime:</label>
        <input type="text" id="name" name="name" onChange={handleChange} value={client.name} required />
        <label htmlFor="surname">Prezime:</label>
        <input type="text" id="surname" name="surname" onChange={handleChange} value={client.surname} required />
        <label htmlFor="address">Adresa:</label>
        <input type="text" id="address" name="address" onChange={handleChange} value={client.address} required />
        <label htmlFor="phone">Broj:</label>
        <input type="text" id="phone" name="phone" onChange={handleChange} value={client.phone} required />
        <label htmlFor="city">Grad:</label>
        <input type="text" id="city" name="city" onChange={handleChange} value={client.city} required />
        <button type="submit">Registruj se</button>
      </form>
      <p className="registration-login">Već imaš nalog? <Link to="/prijavise">Prijavi se</Link></p>
    </div>
  );
};

export default KlijentRegistracija;