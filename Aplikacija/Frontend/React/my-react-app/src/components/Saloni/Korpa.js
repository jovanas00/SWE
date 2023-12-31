import React, { useState, useEffect } from "react";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { vratiRole } from "../Auth/VratiRole";
import "./Korpa.css";
import api from "../Auth/Interceptor";
import item from "../../images/item.jpg"
import { obavestenja } from "../UI/Obavestenja";

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
                if (klijent) {
                    const response = await api.get(
                        `http://localhost:5169/Klijent/VratiKorpuID/${korisnicko_ime}`,
                    );

                    const korpaId = response.data;
                    VratiProizvodeIzKorpe(korpaId)
                    setKorpaId(korpaId);
                }
            } catch (error) {
                console.error("Error retrieving Korpa ID:", error);
            }
        };
        fetchKorpaId();
        const VratiProizvodeIzKorpe = async (korpaId) => {
            try {
                const response = await api.get(`/Klijent/VratiProizvodeIzKorpe/${korpaId}`);
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
            obavestenja(response.data,'success');
            setProizvodi(prevProizvodi => prevProizvodi.filter(proizvod => proizvod.proizvodID !== proizvodID));
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleNaruciClick = async (proizvodID) => {
        try {
            const response = await api.post(`/Klijent/Naruci/${korpaId}/${id}`, null);
            obavestenja(response.data,'success');
            setProizvodi([]);
        } catch (error) {
            console.error('Error placing the order:', error);
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
            {/*"Nemate ništa u korpi"*/}
            {proizvodi.length === 0 && <p className="empty-cart-message">Ovde ce biti prikazani dodati proizvodi kada ih dodate u korpu!</p>}
            {/* Naruci button */}
            {proizvodi.length > 0 && (
                <button className="naruci-button" onClick={handleNaruciClick}>Naruci</button>
            )}
        </div>
    );



};

export default Korpa;
