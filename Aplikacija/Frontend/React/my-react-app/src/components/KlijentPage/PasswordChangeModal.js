import { useState } from "react";
import "./Informacije.css";
import api from "../Auth/Interceptor";
import { obavestenja } from "../UI/Obavestenja";

const ChangePasswordModal = ({ korisnicko_ime, showModal, setShowModal }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = async () => {
    try {
      if (currentPassword === "" || newPassword == "") {
        obavestenja("Niste popunili sva polja", "danger")
        return;
      }
      const response = await api.put(`/Korisnik/IzmeniLozinku/${korisnicko_ime}/${currentPassword}/${newPassword}`, {});
      setShowModal(false);
      setCurrentPassword("");
      setNewPassword("");
      obavestenja(response.data);
    } catch (error) {
      console.error('Greška pri izmeni lozinke', error);
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