import React, { useState, useEffect } from "react";
import axios from "axios";
//import Card from "../UI/Card";
import { Card } from "react-bootstrap";
import salonChat from '../../images/salon.jpg';
import user from '../../images/user.webp';
import { vratiRole } from '../Auth/VratiRole';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import api from "../Auth/Interceptor";
import { formatirajDatum } from "../UI/FormatirajDatum";
import '../UI/Button.css';


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
        axios.put(`http://localhost:5169/Salon/OdgovoriNaPitanje/${idPitanje}/${tekst}`)
            .then((response) => {
                console.log("Pitanje je uspešno odgovoreno:", response.data);
                UcitajPitanja();
            })
            .catch((error) => {
                console.error("Greška pri odgovaranju na pitanje:", error);
                if (tekst == "" || tekst == null)
                    window.alert("Niste uneli tekst odgovora!");
                if (idPitanje == null)
                    window.alert("Pitanje ne postoji!");
            });
    };

    const role = vratiRole();
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {role === "Klijent" && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                        <input type="text" value={inputText} onChange={(event) => setInputText(event.target.value)} placeholder="Unesite svoje pitanje" class="input-text" />
                        <button type="submit" class="btn btn-primary">Pitaj</button>
                    </div>
                )
                }
            </form >
            {odgovori.map((odgovor) => (
                <Card>
                    <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img
                                src={odgovor.slikaKlijenta ? odgovor.slikaKlijenta : user}
                                alt={user}
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <div>
                                <h5>{odgovor.klijentImePrezime}</h5>
                                <p>Postavljeno: {formatirajDatum(odgovor.datumPostavljanja)}</p>
                                <h4><strong>{odgovor.tekstP}</strong></h4>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid black",
                            backgroundColor: "#fc6c6c",
                            borderRadius: "14px"
                        }}>
                            <img
                                src={odgovor.slikaSalona ? odgovor.slikaSalona : salonChat}
                                alt={user}
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <div>
                                {role === "Salon" && odgovor.tekstO === null && odgovor.datumOdgovaranja === null && (
                                    <div>
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
                                        <p>Postavljeno: {(formatirajDatum(odgovor.datumOdgovaranja))}</p>
                                        <h4><strong>{(odgovor.tekstO)}</strong></h4>
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
            ))
            }
        </div >
    );
};

// function formatirajDatum(datum) {
//     const formatiran = new Date(datum);
//     const opcije = {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//         hour: 'numeric',
//         minute: 'numeric',
//         hour12: true
//     };
//     return formatiran.toLocaleString('en-US', opcije);
// }

{/* <div className="proizvodi-items" style={{display: "flex", flexDirection: "column"}}>
                        <div style={{marginBottom: "0.5rem", border: "1px solid black", borderRadius: "5px"}}>
                            <h6>{odgovor.klijentImePrezime}</h6>
                            <h6>{odgovor.datumPostavljanja}</h6>
                            <h5><strong>Pitanje: {odgovor.tekstP}</strong></h5>
                        </div>
                        <div style={{marginLeft: "1.5rem", border: "1px solid black", borderRadius: "5px"}}>
                            <h6>{odgovor.salonNaziv}</h6>
                            <h6>{odgovor.datumOdgovaranja}</h6 >
                            <h5><strong>Odgovor: {(odgovor.tekstO !== null)? odgovor.tekstO : "Jos uvek nije odgovoreno..."}</strong></h5>
                        </div>
                    </div> */}



export default Odgovori;