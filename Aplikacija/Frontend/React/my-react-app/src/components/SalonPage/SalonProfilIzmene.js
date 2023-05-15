import React, { useState } from "react";
import axios from 'axios';
import './SalonProfilIzmene.css';

const SalonProfilIzmene = ({ salon, fetchSalon }) => {
    console.log("Iz izmene: " + salon.naziv);
    const [korisnickoIme, setKorisnickoIme] = useState(salon.korisnik.korisnickoIme);
    const [naziv, setNaziv] = useState(salon.naziv);
    const [adresa, setAdresa] = useState(salon.adresa);
    const [grad, setGrad] = useState(salon.grad);
    const [brojTelefona, setBrojTelefona] = useState(salon.brojTelefona);

    const izmeniProfilSalona = (korisnickoIme, naziv, adresa, grad, brojTelefona) => {
        axios
            .put(`http://localhost:5169/Salon/IzmeniProfilSalona/${korisnickoIme}/${naziv}/${adresa}/${grad}/${brojTelefona}`)
            .then((response) => {
                console.log("Profil salona je uspešno izmenjen:", response.data);
                fetchSalon();
            })
            .catch((error) => {
                console.error("Greška pri izmeni profila salona:", error);
                if (korisnickoIme || naziv || adresa || grad || brojTelefona === null) {
                    window.alert("Niste uneli sva polja!")
                }
            });
    };

    const handleIzmeniProfil = (e) => {
        e.preventDefault();
        izmeniProfilSalona(korisnickoIme, naziv, adresa, grad, brojTelefona);
    };

    return (
        <div>
            <div>
                <h2>Dodaj sliku</h2>
            </div>
            <div>
                <h2>Promeni lozinku</h2>

            </div>
            <div>
                <h2>Promeni informacije</h2>
                <form onSubmit={handleIzmeniProfil}>
                    <div>
                        <label htmlFor="korisnickoIme">Korisničko ime:</label>
                        <input
                            type="text"
                            id="korisnickoIme"
                            value={korisnickoIme}
                            onChange={(e) => setKorisnickoIme(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="naziv">Naziv:</label>
                        <input
                            type="text"
                            id="naziv"
                            value={naziv}
                            onChange={(e) => setNaziv(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="adresa">Adresa:</label>
                        <input
                            type="text"
                            id="adresa"
                            value={adresa}
                            onChange={(e) => setAdresa(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="grad">Grad:</label>
                        <input
                            type="text"
                            id="grad"
                            value={grad}
                            onChange={(e) => setGrad(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="brojTelefona">Broj telefona:</label>
                        <input
                            type="text"
                            id="brojTelefona"
                            value={brojTelefona}
                            onChange={(e) => setBrojTelefona(e.target.value)}
                        />
                    </div>
                    <button type="submit">Sačuvaj izmene</button>
                </form>
            </div>
        </div>
    );
};

export default SalonProfilIzmene;