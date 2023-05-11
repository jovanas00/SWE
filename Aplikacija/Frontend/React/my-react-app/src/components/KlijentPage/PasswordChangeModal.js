import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";

const PasswordChangeModal = ({ onClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordChange = async () => {
        try {
            const korisnicko_ime = vratiKorisnickoIme();
            await axios.put(
                `http://localhost:5169/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`,
                    },
                }
            );
            console.log('Password changed successfully');
            onClose();
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <div className="change-password-modal">
            <h3>Change Password</h3>
            <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="password-input"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="password-input"
            />
            <div className="button-container">
                <button onClick={handlePasswordChange} className="confirm-button">
                    Confirm
                </button>
                <button onClick={onClose} className="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
