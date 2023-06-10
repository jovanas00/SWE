import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Registracija/Footer.css';
import { obavestenja } from '../UI/Obavestenja';

const SalonRegistracija = () => {
  const [salon, setSalon] = useState({
    korisnickoIme: '',
    lozinka: '',
    email: '',
    naziv: '',
    grad: '',
    adresa: '',
    broj: ''
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
    axios.post(`http://localhost:5169/Korisnik/RegistracijaSalon/${salon.korisnickoIme}/${salon.lozinka}/${salon.email}/${salon.naziv}/${salon.grad}/${salon.adresa}/${salon.broj}`)

      .then(response => {
        console.log(response);
        obavestenja("Uspešno ste se registrovali!", "success");
        resetFields();
      })
      .catch(error => {
        console.log(error);
        obavestenja("Greška pri registraciji, proverite sva polja ili možda već imate nalog.", "danger");
      });
  };

  const resetFields = () => {
    setSalon({
      korisnickoIme: '',
      lozinka: '',
      email: '',
      naziv: '',
      grad: '',
      adresa: '',
      broj: ''
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <p>Registrujete se kao salon</p>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="korisnickoIme">Korisničko ime:</label>
        <input type="text" id="korisnickoIme" name="korisnickoIme" onChange={handleChange} value={salon.korisnickoIme} required />
        <label htmlFor="lozinka">Lozinka:</label>
        <input type="password" id="lozinka" name="lozinka" onChange={handleChange} value={salon.lozinka} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} value={salon.email} required />
        <label htmlFor="naziv">Naziv:</label>
        <input type="text" id="naziv" name="naziv" onChange={handleChange} value={salon.naziv} required />
        <label htmlFor="grad">Grad:</label>
        <input type="text" id="grad" name="grad" onChange={handleChange} value={salon.grad} required />
        <label htmlFor="adresa">Adresa:</label>
        <input type="text" id="adresa" name="adresa" onChange={handleChange} value={salon.adresa} required />
        <label htmlFor="broj">Broj telefona:</label>
        <input type="text" id="broj" name="broj" onChange={handleChange} value={salon.broj} required />
        <button type="submit">Registruj se</button>
        <p className="registration-login">Već imaš nalog? <Link to="/prijava">Prijavi se</Link></p>
      </form>
    </div>
  );
};

export default SalonRegistracija;