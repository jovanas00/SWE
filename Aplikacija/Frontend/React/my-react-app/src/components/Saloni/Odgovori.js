import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import salonChat from '../../images/salon.jpg';
import user from '../../images/user.webp';
import { vratiRole } from '../Auth/VratiRole';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../Auth/Interceptor";
import { formatirajDatum } from "../UI/FormatirajDatum";
import '../UI/Button.css';
import './Odgovori.css';


const Odgovori = ({ id }) => {
    const [odgovori, setOdgovori] = useState([]);
    const [inputText, setInputText] = useState("");
    const [odgovorInput, setOdgovorInput] = useState("");
    // const navigate = useNavigate();

    const UcitajPitanja = () => {
        axios.get(`http://localhost:5169/Salon/VratiPitanjaSalona/${id}`)
            .then((response) => {
                setOdgovori(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        UcitajPitanja();
    }, [id]);

    const sortirajOdgovore = (odgovori) => {
        const neodgovoreni = odgovori.filter((odgovor) => odgovor.tekstO === null);
        const odgovoreni = odgovori.filter((odgovor) => odgovor.tekstO !== null);
        const sortiraniOdgovori = [...neodgovoreni, ...odgovoreni];
        return sortiraniOdgovori;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText === "") {
            alert("Niste postavili pitanje!");
            return;
        }

        api
            .post(`http://localhost:5169/Klijent/PostaviPitanje/${encodeURIComponent(inputText)}/${id}`)
            .then((response) => {
                console.log(response.data);
                alert(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.data);
            });
    };

    const odgovoriNaPitanje = (idPitanje, tekst) => {
        if (typeof tekst === 'undefined' || odgovorInput === "") {
            window.alert("Niste uneli tekst odgovora!");
            return;
        }
        api.put(`/Salon/OdgovoriNaPitanje/${idPitanje}/${tekst}`)
            .then((response) => {
                console.log("Pitanje je uspešno odgovoreno:", response.data);
                UcitajPitanja();
            })
            .catch((error) => {
                console.error("Greška pri odgovaranju na pitanje:", error);
                if (idPitanje == null)
                    window.alert("Pitanje ne postoji!");
            });
    };

    const role = vratiRole();
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {role === "Klijent" && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                        <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} placeholder="Unesite svoje pitanje" class="input-text" />
                        <button type="submit" class="btn btn-primary">Pitaj</button>
                    </div>
                )}
            </form >
            <div className="row odgovori-row">
                {sortirajOdgovore(odgovori).map((odgovor) => (
                    <div className="col-lg-4 col-md-6 mb-4">
                        <Card className="odgovor-card" style={{ position: "relative" }}>
                            <div className="row odgovor-card-content">
                                <div className="odgovor-card-header">
                                    <img
                                        src={odgovor.slikaKlijenta ? odgovor.slikaKlijenta : user}
                                        alt={user}
                                        className="odgovor-card-image"
                                    />
                                    <div>
                                        <h5>{odgovor.klijentImePrezime}</h5>
                                        <p>Postavljeno: {formatirajDatum(odgovor.datumPostavljanja)}</p>
                                        <h4><strong>{odgovor.tekstP}</strong></h4>
                                    </div>
                                </div>
                                <div className="odgovor-card-body">
                                    <div className="odgovor-card-avatar">
                                        <img
                                            src={odgovor.slikaSalona ? odgovor.slikaSalona : salonChat}
                                            alt={user}
                                            className="odgovor-card-image"
                                        />
                                    </div>
                                    <div className="odgovor-card-text">
                                        {role === "Salon" && odgovor.tekstO === null && odgovor.datumOdgovaranja === null && (
                                            <div style={{ display: "flex" }}>
                                                <input
                                                    type="text"
                                                    value={odgovorInput[odgovor.id] || ""}
                                                    onChange={(e) => setOdgovorInput({ ...odgovorInput, [odgovor.id]: e.target.value })}
                                                />
                                                <button onClick={() => odgovoriNaPitanje(odgovor.id, odgovorInput[odgovor.id])} className="customButton">Odgovori</button>
                                            </div>
                                        )}
                                        {role === "Salon" && odgovor.tekstO != null && odgovor.datumOdgovaranja != null && (
                                            <div>
                                                <p>Postavljeno: {formatirajDatum(odgovor.datumOdgovaranja)}</p>
                                                <h4><strong>{odgovor.tekstO}</strong></h4>
                                            </div>
                                        )}
                                        {role !== "Salon" && (
                                            <div>
                                                <p>Postavljeno: {(odgovor.datumOdgovaranja !== null) ? formatirajDatum(odgovor.datumOdgovaranja) : "Datum nije dostupan"}</p>
                                                <h4><strong>{(odgovor.tekstO !== null) ? odgovor.tekstO : "Još uvek nije odgovoreno..."}</strong></h4>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Odgovori;