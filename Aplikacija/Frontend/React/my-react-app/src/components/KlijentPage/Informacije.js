import { useState, useEffect, useRef, setError } from "react";
import icon from '../../images/user.webp';
import axios from "axios";
import Cookies from "js-cookie";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import './PasswordChangeModal.css';
import './Informacije.css'


const Informacije = () => {
  const [picture, setPicture] = useState(icon);
  const [userInfo, setUserInfo] = useState(null);
  const korisnicko_ime = vratiKorisnickoIme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [adresa, setAdresa] = useState('');
  const [grad, setGrad] = useState('');
  const [brojTelefona, setBrojTelefona] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`http://localhost:5169/Klijent/VratiKlijenta/${korisnicko_ime}`, {
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = response.data;
      setUserInfo(data);
    } catch (error) {
      Cookies.remove('token');
      navigate('/prijava');

      console.error('Error fetching user info:', error);
    }
  };

  const handlePasswordChange = async () => {
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

  const handleChangeUserInfo = async () => {
    if(ime=="" || prezime=="" || adresa=="" || grad=="" || brojTelefona=="")
    {
      alert("Niste popunili sva polja!")
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:5169/Klijent/IzmeniProfilKlijenta/${korisnicko_ime}/${ime}/${prezime}/${adresa}/${grad}/${brojTelefona}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setShowInfoModal(false);
      setIme("");
      setPrezime("");
      setAdresa("");
      setGrad("");
      setBrojTelefona("");
      setUserInfo(response.data);
      alert("Izmenjene informacije!"); // Display success message
      window.location.reload()
    } catch (error) {
      console.error("Error changing user info:", error);
      setError(
        "An error occurred while changing the user information. Please try again."
      );
    }
  };



  return (
    <Card className="container-i">
      <img src={picture} alt="User" className="image" />
      <div className="user-details">
        {/* Display user details */}
        {userInfo && (
          <div>
            <p>Ime: {userInfo.ime}</p>
            <p>Prezime: {userInfo.prezime}</p>
            <p>Adresa: {userInfo.adresa}</p>
            <p>Grad: {userInfo.grad}</p>
            <p>Broj telefona: {userInfo.brojTelefona}</p>
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
              <button
                onClick={() => setShowModal(false)}
                className="cancel"
              >
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
              <button onClick={() => setShowInfoModal(false)} className="cancel">
                Odustani
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default Informacije;

