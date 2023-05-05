import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import clientChat from '../../images/clientChatIcon.png';

const Recenzije = ({ id }) => {
    const [recenzije, setRecenzije] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5169/Salon/VratiRecenzijeSalona/${id}`)
            .then((response) => {
                setRecenzije(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div>
            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "40px" }}><strong><u>Recenzije</u></strong></p>
            </div> */}
            {recenzije.map((recenzija) => (
                <Card>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="col-xl-12">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img src={clientChat} alt="" />
                                <div>
                                    <h5>{recenzija.klijentImePrezime}</h5>
                                    <p>Postavljeno: {formatirajDatum(recenzija.datumPostavljanja)}</p>
                                    <h5><strong>Ocenjujem: {recenzija.salonNaziv}</strong></h5>
                                    <h4><strong>Recenzija: {recenzija.tekst}</strong></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
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

export default Recenzije;