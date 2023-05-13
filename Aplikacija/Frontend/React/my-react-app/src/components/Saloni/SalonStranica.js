import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Pocetna/Header';
import SalonCard from './SalonCard';
import Card from '../UI/Card';
import SalonInfo from './SalonInfo';
import "./SalonStranica.css";
import Korpa from './Korpa';
import Cookies from 'js-cookie';
import { isKlijent } from '../Auth/AuthKlijent';

const SalonStranica = () => {
    const { id } = useParams(); // uzima se id iz Route(prosledjuje se u App.js)
    const [salon, setSalon] = useState(null); // inicijalizuje se state salon na null

    useEffect(() => {
        // uzima se salon iz baze
        if (id) {
            axios.get(`http://localhost:5169/Salon/VratiSalon/${id}`)
                .then(response => {
                    console.log(response.data);
                    setSalon(response.data); // setujemo novi state salon na dobijene podatke
                })
                .catch(error => {
                    console.error(error);
                });

            }
            axios.delete(`http://localhost:5169/Klijent/IsprazniKorpu/${id}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
    }, [id]); // ova se funkcija zove kad se promeni id

    if (!salon) {
        return <div></div>; // iz nekog razloga kad ova rpovera ne postoji greska se javi 
    }//ovde se samo treba pojavi ova poruka dok se ne uzmu podaci iz baze

    return (
        <div>
            <Header />
            <div className="salon-info">
                <div className="salon-card__div">
                    <SalonCard salon={salon} />
                </div>
                {/* ako se ne koristi SalonCard */}
                {/* <div className="salon-card__image">
                    <img src={icon} alt="{salon.naziv}" />
                </div> */}
                {/* <div className="salon-card__text">
                    <h5>Naziv: {salon.naziv}</h5>
                    <p>Adresa: {salon.adresa}</p>
                    <p>Grad: {salon.grad}</p>
                    <p>Broj telefona: {salon.brojTelefona}</p>
                    <p>Prosecna ocena: {salon.prosecnaOcena}</p>
                </div> */}
                <div className="salon-info__items">
                    <SalonInfo salon={salon} id={id} />
                </div>
            </div>
        </div>
    );
}

export default SalonStranica;