import React, { useState, useEffect, useRef, setError } from "react";
import Cookies from "js-cookie";
import Card from "../UI/Card";
import icon from '../../images/salonIcon.png';
import { useNavigate } from "react-router-dom";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
// import SalonProfilIzmene from "./SalonProfilIzmene";
import './Informacije.css';
import UploadFile from "../KlijentPage/Upload";
import '../UI/Button.css';
import api from "../Auth/Interceptor";
import { obavestenja } from "../UI/Obavestenja";


const Informacije = () => {
    const [salon, setSalon] = useState();
    const [showModal, setShowModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [naziv, setNaziv] = useState('');
    const [adresa, setAdresa] = useState('');
    const [grad, setGrad] = useState('');
    const [brojTelefona, setBrojTelefona] = useState('');

    const korisnicko_ime = vratiKorisnickoIme();

    useEffect(() => {
        fetchSalon();
    }, []);
    const navigate = useNavigate();

    const fetchSalon = async () => {
        try {
            const response = await api.get(`/Salon/VratiSalonPrekoKI/${korisnicko_ime}`);
            const data = response.data.salon;
            setSalon(data);
        } catch (error) {
            Cookies.remove('token');
            navigate('/prijava');

            console.error('Error fetching user info:', error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put(
                `/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`
            );
            setShowModal(false);
            setCurrentPassword('');
            setNewPassword('');
            // alert(response.data); // Display the response status code
            obavestenja("Uspešno ste promenili lozinku!", "success");
        } catch (error) {
            console.error('Error changing password:', error);
            setError('An error occurred while changing the password. Please try again.');
        }
    };

    const handleCancelPasswordChange = () => {
        setShowModal(false);
        setCurrentPassword('');
        setNewPassword('');
    };

    const handleChangeUserInfo = async (e) => {
        e.preventDefault();
        if (naziv == "" || adresa == "" || grad == "" || brojTelefona == "") {
            obavestenja("Niste popunili sva polja!", "danger")
            return;
        }
        try {
            const response = await api.put(
                `/Salon/IzmeniProfilSalona/${korisnicko_ime}/${naziv}/${adresa}/${grad}/${brojTelefona}`,
            );
            setShowInfoModal(false);
            setNaziv("");
            setAdresa("");
            setGrad("");
            setBrojTelefona("");
            setSalon(response.data);
            obavestenja("Uspešno ste izmenili informacije!", "success"); // Display success message
            window.location.reload()
        } catch (error) {
            console.error("Error changing user info:", error);
            setError(
                "An error occurred while changing the user information. Please try again."
            );
        }
    };

    const handleCancelUserInfoChange = () => {
        setShowInfoModal(false);
        setNaziv('');
        setAdresa('');
        setGrad('');
        setBrojTelefona('');
    };

    const handleUploadFinished = (response) => {
        const { dbPath } = response;
        console.log(dbPath)
        setSalon((prevUserInfo) => ({
            ...prevUserInfo,
            slika: `http://localhost:5169/${dbPath}`,
        })
        );
    };

    return (
        <div>
            <div>
                <Card className="container-i">
                    <div className="salon-details">
                        {salon && (
                            <div>
                                <img
                                    src={salon.korisnik.slika ? salon.korisnik.slika : icon}
                                    alt="Salon"
                                    className="image"
                                />
                                <h5><strong>Naziv: {salon.naziv}</strong></h5>
                                <p><strong>Adresa:</strong> {salon.adresa}</p>
                                <p><strong>Grad:</strong> {salon.grad}</p>
                                <p><strong>Broj telefona:</strong> {salon.brojTelefona}</p>
                                {/* <p>Prosecna ocena: {salon.prosecnaOcena}</p> */}
                            </div>
                        )}
                    </div>
                    <div className="password-change">
                        <button
                            onClick={() => setShowModal(true)}
                            className="button-primary"
                        >
                            Promeni lozinku
                        </button>
                    </div>
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Promena lozinke</h3>
                                <input
                                    type="password"
                                    placeholder="Trenutna lozinka"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                                <input
                                    type="password"
                                    placeholder="Nova lozinka"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div>
                                    <button
                                        onClick={handlePasswordChange}
                                        className="confirm"
                                    >
                                        Potvrdi
                                    </button>
                                    <button onClick={handleCancelPasswordChange} className="cancel">
                                        Odustani
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <button onClick={() => setShowInfoModal(true)} className="button-primary">
                        Izmeni informacije
                    </button>
                    {showInfoModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <h3>Izmena informacija</h3>
                                <input
                                    type="text"
                                    placeholder="Naziv"
                                    value={naziv}
                                    onChange={(e) => setNaziv(e.target.value)}
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

                                    <button onClick={handleCancelUserInfoChange} className="cancel">
                                        Odustani
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <UploadFile onUploadFinished={handleUploadFinished} /> 
                </Card>
            </div>

            {/* <div>
                {salon && <SalonProfilIzmene salon={salon} fetchSalon={fetchSalon}/>}
            </div> */}
        </div>
    );

};

export default Informacije;