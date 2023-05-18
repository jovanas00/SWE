import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./AdminPage.css"

const AdminInfoModal = ({ adminInfo, onClose }) => {
    const [ime, setIme] = useState();
    const [prezime, setPrezime] = useState();
    const [korisnickoIme, setkorisnickoIme] = useState();

    const handleChangeAdminInfo = async () => {
        if (ime === "" || prezime === "" || korisnickoIme === "") {
            alert("Niste popunili sva polja!");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5169/Admin/IzmeniAdmina/${korisnickoIme}/${ime}/${prezime}`,
                {
                    ime,
                    prezime,
                    korisnickoIme,
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                }
            );
            onClose();
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
                    placeholder="Korisničko ime"
                    value={korisnickoIme}
                    onChange={(e) => setkorisnickoIme(e.target.value)}
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