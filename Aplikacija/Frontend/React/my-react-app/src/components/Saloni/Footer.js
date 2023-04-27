import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [saloni, setSaloni] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/salon')
      .then(res => {
        setSaloni(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="saloni-container">
      <h1>Saloni</h1>
      <table>
        <thead>
          <tr>
            <th>Naziv</th>
            <th>Adresa</th>
            <th>Grad</th>
            <th>Broj telefona</th>
          </tr>
        </thead>
        <tbody>
          {saloni.map(salon => (
            <tr key={salon._id}>
              <td>{salon.name}</td>
              <td>{salon.address}</td>
              <td>{salon.city}</td>
              <td>{salon.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Footer;