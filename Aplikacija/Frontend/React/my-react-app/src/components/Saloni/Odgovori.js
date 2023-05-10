import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import salonChat from '../../images/salon.png';
import clientChat from '../../images/clientChatIcon.png';
import { vratiRole } from '../Auth/VratiRole';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


const Odgovori = ({ id }) => {
    const [odgovori, setOdgovori] = useState([]);
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputText === "") {
            alert("Niste postavili pitanje!")
            return;
        }
        axios.post('http://localhost:5169/Klijent/PostaviPitanje/' + encodeURIComponent(inputText) + '/' + id, {
        }, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.log(error.data);
            });
    };

    useEffect(() => {
        axios.get(`http://localhost:5169/Salon/VratiPitanjaSalona/${id}`)
            .then((response) => {
                setOdgovori(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

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
            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "40px" }}><strong><u>Pitanja i Odgovori</u></strong></p>
            </div> */}

            {
                odgovori.map((odgovor) => (
                    <Card>
                        <div className="row" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img src={clientChat} alt="" />
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
                                backgroundColor: "#ea99a2",
                                borderRadius: "14px"
                            }}>
                                {/* <div className="col-xl"> */}
                                <img src={salonChat} alt="" />
                                <div style={{}}>
                                    <h5>{odgovor.salonNaziv}</h5>
                                    <p>Postavljeno: {formatirajDatum(odgovor.datumOdgovaranja)}</p>
                                    <h4><strong>{(odgovor.tekstO !== null) ? odgovor.tekstO : "Jos uvek nije odgovoreno..."}</strong></h4>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))
            }
        </div >
    );
};

function formatirajDatum(datum) {
    const formatiran = new Date(datum);
    const opcije = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return formatiran.toLocaleString('en-US', opcije);
}

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