import { useState, useEffect, useRef,setError } from "react";
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

  const handleChangeUserInfo = (newInfo) => {
    console.log('New Info:', newInfo);
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
    </Card>
  );
};
export default Informacije;

