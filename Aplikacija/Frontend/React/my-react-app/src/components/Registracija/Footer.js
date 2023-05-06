import React, { useState } from "react";
import KlijentRegistracija from "./KlijentRegistracija";
import SalonRegistracija from "./SalonRegistracija";
import '../Registracija/Footer.css';

const Footer = () => {
  const [isClient, setIsClient] = useState(true);

  const handleRegistrationTypeChange = (event) => {
    setIsClient(event.target.value === "client");
  };

  return (
    <div className="registration-container">
      <h3>Želite da se registrujete kao</h3>
      <div>
        <label>
          <input
            type="radio"
            name="registrationType"
            value="client"
            checked={isClient}
            onChange={handleRegistrationTypeChange}
          />
          Klijent
        </label>
        <label>
          <input
            type="radio"
            name="registrationType"
            value="salon"
            checked={!isClient}
            onChange={handleRegistrationTypeChange}
          />
          Salon
        </label>
      </div>
      {isClient ? <KlijentRegistracija /> : <SalonRegistracija />}
    </div>
  );

};

export default Footer;




