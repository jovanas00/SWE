import { useState } from "react";
import "./AdminPage.css"
import api from "../Auth/Interceptor";
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import { obavestenja } from "../UI/Obavestenja";

const AdminInfoModal = ({ adminInfo, onClose }) => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');

    const handleChangeAdminInfo = async () => {
        if (ime === "" || prezime === "") {
            obavestenja("Niste popunili sva polja!", "danger");
            return;
        }

        const korisnickoIme = vratiKorisnickoIme();
        try {
            const response = await api.put(
                `/Admin/IzmeniAdmina/${korisnickoIme}/${ime}/${prezime}`
            );
            console.log(response.data);
            onClose();
            window.location.reload();
        } catch (error) {
            console.error("Error changing user info:", error);
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
                <div>
                    <button onClick={handleChangeAdminInfo} className="confirm">
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

export default AdminInfoModal;