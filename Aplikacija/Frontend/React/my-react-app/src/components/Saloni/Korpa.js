import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import { isKlijent } from '../Auth/AuthKlijent';
import { vratiRole } from '../Auth/VratiRole';
import './Korpa.css'
import api from '../Auth/Interceptor';
import item from "../../images/item.jpg"

const Korpa = ({ id }) => {
    const [korpaId, setKorpaId] = useState(null);
    const [proizvodi, setProizvodi] = useState([]);
    const [showNaruciButton, setShowNaruciButton] = useState(false);
    const korisnicko_ime = vratiKorisnickoIme();
    const uloga = vratiRole()
    const klijent = uloga === "Klijent" ? "Klijent" : null;

    useEffect(() => {
        const fetchKorpaId = async () => {
            try {
                const token = Cookies.get('token'); // Retrieve the token from the cookie

                if (klijent) {
                    const response = await axios.get(
                        `http://localhost:5169/Klijent/VratiKorpuID/${korisnicko_ime}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Include the token in the request headers
                            },
                        }
                    );

                    const korpaId = response.data;
                    VratiProizvodeIzKorpe(korpaId)
                    setKorpaId(korpaId); // Pass the korpaId to the parent component
                }
            } catch (error) {
                console.error('Error retrieving Korpa ID:', error);
            }
        };
        fetchKorpaId();
        const VratiProizvodeIzKorpe = async (korpaId) => {
            try {
                const response = await api.get(`/Klijent/VratiProizvodeIzKorpe/${korpaId}`);
                console.log(response.data); // Log the response data
                setProizvodi(response.data);
                setShowNaruciButton(true);
            } catch (error) {
                console.error('Error retrieving data from server:', error);
            }
        };
    }, [korisnicko_ime, setKorpaId]);

    const handleDeleteClick = async (proizvodID) => {
        try {
            const response = await api.delete(`/Klijent/IzbaciIzKorpe/${proizvodID}/${korpaId}`);
            console.log('Product removed from cart successfully!');
            alert(response.data);
            setProizvodi(prevProizvodi => prevProizvodi.filter(proizvod => proizvod.proizvodID !== proizvodID));
            // Optionally, you can update the local state or perform any other necessary actions after successfully removing the product
        } catch (error) {
            console.error('Error removing product from cart:', error);
            // Handle error case if the product could not be removed from the cart
        }
    };

    const handleNaruciClick = async (proizvodID) => {
        try {
            const response = await api.post(`/Klijent/Naruci/${korpaId}/${id}`, null);
            alert(response.data);
            setProizvodi([]);
            // Optionally, you can perform any necessary actions after placing the order
        } catch (error) {
            console.error('Error placing the order:', error);
            // Handle error case if the order could not be placed
        }
    };
    return (
        <div className="korpa-container">
            {/* Render div for each product */}
            {proizvodi.map((proizvod) => (
                <div key={proizvod.proizvodID} className="proizvod">
                    <img className="image-item" src={proizvod.slikaProizvoda ? proizvod.slikaProizvoda : item} alt={proizvod.naziv} />
                    <p className="proizvod-naziv">Naziv: {proizvod.nazivProizvoda}</p>
                    <p className="proizvod-kolicina">Kolicina: {proizvod.kolicina}</p>
                    <button className="obrisi-button" onClick={() => handleDeleteClick(proizvod.proizvodID)}>Obrisi</button>
                </div>
            ))}
            {/* Show "Nemate ništa u korpi" if there are no proizvodi in the cart */}
            {proizvodi.length === 0 && <p className="empty-cart-message">Ovde ce biti prikazani dodati proizvodi kada ih dodate u korpu!</p>}
            {/* Naruci button */}
            {proizvodi.length > 0 && (
                <button className="naruci-button" onClick={handleNaruciClick}>Naruci</button>
            )}
        </div>
    );



};

export default Korpa;
