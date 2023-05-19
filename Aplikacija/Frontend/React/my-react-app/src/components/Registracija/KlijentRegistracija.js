import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Registracija/Footer.css';

const KlijentRegistracija = () => {
  const [client, setClient] = useState({
    korisnickoIme: '',
    sifra: '',
    email: '',
    ime: '',
    prezime: '',
    adresa: '',
    brojTelefona: '',
    grad: ''
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
    axios.post(`http://localhost:5169/Korisnik/RegistracijaKlijent/${client.korisnickoIme}/${client.sifra}/${client.email}/${client.ime}/${client.prezime}/${client.adresa}/${client.brojTelefona}/${client.grad}`)

      .then(response => {
        console.log(response);
        window.alert('Uspešno ste se registrovali!');
        resetFields(); // Poziv funkcije za resetovanje polja
      })
      .catch(error => {
        console.log(error);
        window.alert('Greška pri registraciji, proverite sva polja ili možda već imate nalog.');
      });
  };

  const resetFields = () => {
    setClient({
      korisnickoIme: '',
      sifra: '',
      email: '',
      ime: '',
      prezime: '',
      adresa: '',
      brojTelefona: '',
      grad: ''
    });
  };

  return (
    <div className="registration-container">
      <div className="registration-header">
        <p>Registrujete se kao klijent</p>
      </div>
      <form onSubmit={handleSubmit} className="registration-form">
        <label htmlFor="korisnickoIme">Korisničko ime:</label>
        <input type="text" id="korisnickoIme" name="korisnickoIme" onChange={handleChange} value={client.korisnickoIme} required />
        <label htmlFor="sifra">Lozinka:</label>
        <input type="password" id="sifra" name="sifra" onChange={handleChange} value={client.sifra} required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" onChange={handleChange} value={client.email} required />
        <label htmlFor="ime">Ime:</label>
        <input type="text" id="ime" name="ime" onChange={handleChange} value={client.ime} required />
        <label htmlFor="prezime">Prezime:</label>
        <input type="text" id="prezime" name="prezime" onChange={handleChange} value={client.prezime} required />
        <label htmlFor="adresa">Adresa:</label>
        <input type="text" id="adresa" name="adresa" onChange={handleChange} value={client.adresa} required />
        <label htmlFor="brojTelefona">Broj:</label>
        <input type="text" id="brojTelefona" name="brojTelefona" onChange={handleChange} value={client.brojTelefona} required />
        <label htmlFor="grad">Grad:</label>
        <input type="text" id="grad" name="grad" onChange={handleChange} value={client.grad} required />
        <button type="submit">Registruj se</button>
        <p className="registration-login">Već imaš nalog? <Link to="/prijava">Prijavi se</Link></p>
      </form>
    </div>
  );
};

export default KlijentRegistracija;