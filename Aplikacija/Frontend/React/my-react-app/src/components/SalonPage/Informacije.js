import React, { useState, useEffect, useRef, setError } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Card from "../UI/Card";
import icon from '../../images/salonIcon.png';
import { useNavigate } from "react-router-dom";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
// import SalonProfilIzmene from "./SalonProfilIzmene";
import './Informacije.css';


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
            const response = await axios.get(`http://localhost:5169/Salon/VratiSalonPrekoKI/${korisnicko_ime}`, {
                headers: {
                    'Authorization': `Bearer ${Cookies.get('token')}`,
                },
            });
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
            const response = await axios.put(
                `http://localhost:5169/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            setShowModal(false);
            setCurrentPassword('');
            setNewPassword('');
            alert(response.data); // Display the response status code
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
            alert("Niste popunili sva polja!")
            return;
        }
        try {
            const response = await axios.put(
                `http://localhost:5169/Salon/IzmeniProfilSalona/${korisnicko_ime}/${naziv}/${adresa}/${grad}/${brojTelefona}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            setShowInfoModal(false);
            setNaziv("");
            setAdresa("");
            setGrad("");
            setBrojTelefona("");
            setSalon(response.data);
            alert("Izmenjene informacije!"); // Display success message
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

    return (
        <div>
            <div>
                <Card className="container-i">
                    <img src={icon} alt="Salon" className="image" />
                    <div className="salon-details">
                        {salon && (
                            <div className="salon-card__text">
                                <h5>Naziv: {salon.naziv}</h5>
                                <p>Adresa: {salon.adresa}</p>
                                <p>Grad: {salon.grad}</p>
                                <p>Broj telefona: {salon.brojTelefona}</p>
                                {/* <p>Prosecna ocena: {salon.prosecnaOcena}</p> */}
                            </div>
                        )}
                    </div>
                    {/* Password change section */}
                    <div className="password-change">
                        {/* Change password button */}
                        <button
                            onClick={() => setShowModal(true)}
                            className="button-primary"
                        >
                            Promeni lozinku
                        </button>
                    </div>
                    {/* Modal */}
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
                    {/* Modal for changing user information */}
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
                </Card>
            </div>

            {/* <div>
                {salon && <SalonProfilIzmene salon={salon} fetchSalon={fetchSalon}/>}
            </div> */}
        </div>
    );

};

export default Informacije;