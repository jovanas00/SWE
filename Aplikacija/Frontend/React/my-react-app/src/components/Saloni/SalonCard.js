import React from "react";
import Card from '../UI/Card';
//import { Card } from 'react-bootstrap';
import icon from '../../images/salonIcon.png';
import './SalonCard.css';

const SalonCard = ({ salon }) => {
    return (
        <Card className="salon-card">
            <div className="salon-card__image">
                <img src={icon} alt="{salon.naziv}" />
            </div>
            <div className="salon-card__text">
                <h5>Naziv: {salon.naziv}</h5>
                <p>Adresa: {salon.adresa}</p>
                <p>Grad: {salon.grad}</p>
                <p>Broj telefona: {salon.brojTelefona}</p>
                <p>Prosecna ocena: {salon.prosecnaOcena}</p>
            </div>
        </Card>
    );
};

export default SalonCard;