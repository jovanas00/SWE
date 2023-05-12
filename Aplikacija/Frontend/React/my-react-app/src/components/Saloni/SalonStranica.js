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

const SalonStranica = ({ korpaId }) => {
    const { id } = useParams(); // uzima se id iz Route(prosledjuje se u App.js)
    const [salon, setSalon] = useState(null); // inicijalizuje se state salon na null
    const [proizvodi, setProizvodi] = useState([]);
    const [showNaruciButton, setShowNaruciButton] = useState(false);
    


    const handleKorpaClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5169/Klijent/VratiProizvodeIzKorpe/${korpaId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });

            console.log(response.data); // Log the response data
            setProizvodi(response.data);
            setShowNaruciButton(true);
        } catch (error) {
            console.error('Error retrieving data from server:', error);
        }
    };

    const handleDeleteClick = async (proizvodID) => {
        try {
            const response = await axios.delete(`http://localhost:5169/Klijent/IzbaciIzKorpe/${proizvodID}/${korpaId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });
            console.log('Product removed from cart successfully!');
            alert(response.data);
            setProizvodi([]);
            // Optionally, you can update the local state or perform any other necessary actions after successfully removing the product
        } catch (error) {
            console.error('Error removing product from cart:', error);
            // Handle error case if the product could not be removed from the cart
        }
    };

    const handleNaruciClick = async (proizvodID) => {
        try {
            const response = await axios.post(`http://localhost:5169/Klijent/Naruci/${korpaId}/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`,
                },
            });
            alert(response.data);
            setProizvodi((prevProizvodi) => prevProizvodi.filter((proizvod) => proizvod.proizvodID !== proizvodID));
            // Optionally, you can perform any necessary actions after placing the order
        } catch (error) {
            console.error('Error placing the order:', error);
            // Handle error case if the order could not be placed
        }
    };

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
                {isKlijent() && <button onClick={handleKorpaClick}>Korpa</button>}

                {/* Render div for each product */}
                {proizvodi.map((proizvod) => (
                    <div key={proizvod.proizvodID}>
                        <img src={proizvod.slikaProizvoda} alt={proizvod.naziv} />
                        <p>Naziv: {proizvod.nazivProizvoda}</p>
                        <p>Kolicina: {proizvod.kolicina}</p>
                        <button onClick={() => handleDeleteClick(proizvod.proizvodID)}>Obrisi</button>
                    </div>
                ))}
                {/* Naruci button */}
                {showNaruciButton && (
                    <button onClick={handleNaruciClick}>Naruci</button>
                )}
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