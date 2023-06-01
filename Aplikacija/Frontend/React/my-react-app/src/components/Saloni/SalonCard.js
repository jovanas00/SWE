import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '../UI/Card';
import icon from '../../images/salonIcon.png';
import './SalonCard.css';

const SalonCard = ({ salon, slika }) => {
    const [prosecnaOcena, setProsecnaOcena] = useState(0);

    useEffect(() => {
        const dohvatiProsecnuOcenu = async () => {
            try {
                const id_salon=salon.id;
                const response = await axios.get(`http://localhost:5169/Salon/ProsecnaOcena/${id_salon}`);
                const data = response.data;
                setProsecnaOcena(data.prosecnaOcena);
            } catch (error) {
                console.log(error);
            }
        };

        dohvatiProsecnuOcenu();
    }, [salon.ID]);

    return (
        <Card className="salon-card">
            <div className="salon-card__image">
                <img src={slika ? slika : icon} alt={salon.naziv} className="image_salon" />
            </div>
            <div className="salon-card__text">
                <h5><strong>Naziv: {salon.naziv}</strong></h5>
                <p>Adresa: {salon.adresa}</p>
                <p>Grad: {salon.grad}</p>
                <p>Broj telefona: {salon.brojTelefona}</p>
                <p>Prosečna ocena: {prosecnaOcena}</p>
            </div>
        </Card>
    );
};

export default SalonCard;

