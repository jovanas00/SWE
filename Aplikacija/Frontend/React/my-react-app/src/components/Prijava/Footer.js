import React, { useState } from 'react';
import './Footer.css';
import axios from 'axios';

const Footer = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      alert('Uspešno ste se prijavili!');
    } else {
      setError('Pogrešno korisničko ime ili lozinka!');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Prijavi se</h2>
        <div className="form-group">
          <label htmlFor="username">Korisničko ime:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Lozinka:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Prijavi se</button>
      </form>
    </div>
  );
};

export default Footer;