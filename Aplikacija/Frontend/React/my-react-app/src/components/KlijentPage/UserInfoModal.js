import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Informacije.css"
import api from "../Auth/Interceptor";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";

const UserInfoModal = ({ userInfo, onClose }) => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [adresa, setAdresa] = useState('');
    const [grad, setGrad] = useState('');
    const [brojTelefona, setBrojTelefona] = useState('');

    const korisnicko_ime = vratiKorisnickoIme();

    const handleChangeUserInfo = async () => {
        if (ime === "" || prezime === "" || adresa === "" || grad === "" || brojTelefona === "") {
            alert("Niste popunili sva polja!");
            return;
        }
        try {
            await api.put(
                `/Klijent/IzmeniProfilKlijenta/${korisnicko_ime}/${ime}/${prezime}/${adresa}/${grad}/${brojTelefona}`
            );
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error changing user info:", error);
            // Handle the error
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Izmena informacija</h3>
                <input
                    type="text"
                    placeholder="Ime"
                    value={ime}
                    onChange={(e) => setIme(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Prezime"
                    value={prezime}
                    onChange={(e) => setPrezime(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Adresa"
                    value={adresa}
                    onChange={(e) => setAdresa(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Grad"
                    value={grad}
                    onChange={(e) => setGrad(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Broj telefona"
                    value={brojTelefona}
                    onChange={(e) => setBrojTelefona(e.target.value)}
                />
                <div>
                    <button onClick={handleChangeUserInfo} className="confirm">
                        Potvrdi
                    </button>
                    <button onClick={onClose} className="cancel">
                        Odustani
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserInfoModal;

