import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./Informacije.css";

const ChangePasswordModal = ({ korisnicko_ime, showModal, setShowModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5169/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      alert(response.data);
    } catch (error) {
      console.error("Greška pri izmeni lozinke", error);
    }
  };

  const handleCancelPasswordChange = () => {
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  return (
    showModal && (
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
            <button onClick={handlePasswordChange} className="confirm">
              Potvrdi
            </button>
            <button onClick={handleCancelPasswordChange} className="cancel">
              Odustani
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ChangePasswordModal