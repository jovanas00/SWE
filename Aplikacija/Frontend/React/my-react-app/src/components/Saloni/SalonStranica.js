import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Pocetna/Header';
import Card from '../UI/Card';
import SalonInfo from './SalonInfo';
import "./SalonStranica.css";
import Korpa from './Korpa';
import Cookies from 'js-cookie';
import icon from '../../images/salonIcon.png';
import { isKlijent } from '../Auth/AuthKlijent';
import { vratiRole } from '../Auth/VratiRole';

const SalonStranica = () => {
    const { id } = useParams();
    const [salon, setSalon] = useState(null);
    const [prosecnaOcena, setProsecnaOcena] = useState(0);
    const role = vratiRole();
    const klijent = role === "Klijent" ? "Klijent" : null;

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5169/Salon/VratiSalon/${id}`)
                .then(response => {
                    console.log(response.data);
                    setSalon(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
        if (klijent) {
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
        }
        const dohvatiProsecnuOcenu = async () => {
            try {
                const id_salon = id;
                const response = await axios.get(`http://localhost:5169/Salon/ProsecnaOcena/${id_salon}`);
                const data = response.data;
                setProsecnaOcena(data.prosecnaOcena);
            } catch (error) {
                console.log(error);
            }
        };

        dohvatiProsecnuOcenu();
    }, [id]);

    if (!salon) {
        return <div></div>;
    }

    return (
        <div>
            <Header />

                <div className="salon-info1">
                    <div className="salon-card1">
                        <div className="salon-card__image1">
                            <img className="slika" src={icon} alt="{salon.naziv}" />
                        </div>
                        <div className="salon-card__text1">
                            <h5>Naziv: {salon.naziv}</h5>
                            <p>Adresa: {salon.adresa}</p>
                            <p>Grad: {salon.grad}</p>
                            <p>Broj telefona: {salon.brojTelefona}</p>
                            <p>Prosecna ocena: {prosecnaOcena}</p>
                        </div>
                    </div>
                    <div className="salon-info__items">
                        <SalonInfo salon={salon} id={id} />
                    </div>
                </div>
        </div>
    );
}

export default SalonStranica;

