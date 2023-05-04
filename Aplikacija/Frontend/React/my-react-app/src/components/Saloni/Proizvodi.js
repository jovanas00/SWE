import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import './Proizvodi.css';

const Proizvodi = ({ id }) => {
    const [proizvodi, setProizvodi] = useState([]);
    const [kategorije, setKategorije] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5079/ProizvodUsluga/VratiProizvodeSalona/${id}`)
            .then((response) => {
                setProizvodi(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // useEffect(() => {
    //     axios.get()
    //     .theh((response) => {
    //         setKategorije(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }, []);

    // const handleFilterSubmit = (selektovaneKategorije) => {
    //     axios.get()
    //     .then((response) => setProizvodi(response.data))
    //     .catch((error) => console.log(error));
    // };

    return (
        <div>
            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "40px" }}><strong><u>Proizvodi</u></strong></p>
            </div> */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            {/* <div className="col-md-4 mb-3"> */}
            {/* <Kategorije kategoije={kategorije} onSubmit={handleFilterSubmit} /> */}
            {proizvodi.map((proizvod) => (
                <Card >
                    <div className="prozvod-card__image">
                        <img src={proizvod.slika} alt="{salon.naziv}" />
                    </div>
                    <div>
                        <h3>Naziv: {proizvod.naziv}</h3>
                        <p>Cena: {proizvod.cena}</p>
                        {console.log(proizvod.dostupnost)}
                        <p>Dostupnost: {proizvod.dostupnost ? "NA STANJU" : "NEMA NA STANJU"}</p>
                    </div>
                </Card>
            ))}
        </div>
        </div>
        // </div>
    );
};

export default Proizvodi;