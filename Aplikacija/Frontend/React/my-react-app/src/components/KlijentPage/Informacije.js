import { useState, useEffect, useRef } from "react";
import icon from '../../images/user.webp';
import axios from "axios";
import Cookies from "js-cookie";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import PasswordChangeModal from "./PasswordChangeModal";
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
            await axios.put(
                `http://localhost:5169/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            setShowModal(false);
            console.log('Password changed successfully'); 
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    const handleChangeUserInfo = (newInfo) => {
        console.log('New Info:', newInfo);
    };


    return (
        <Card className="container">
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
      Change Password
    </button>
  </div>
  {/* Modal */}
  {showModal && (
    <div className="modal">
      <div className="modal-content">
        <h3>Change Password</h3>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <div>
          <button
            onClick={handlePasswordChange}
            className="confirm"
          >
            Confirm
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</Card>
    );
};
export default Informacije;

