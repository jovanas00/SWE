import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import './Proizvodi.css';
import { vratiRole } from "../Auth/VratiRole";
import Cookies from "js-cookie"
import { BsCart } from 'react-icons/bs';

const Proizvodi = ({ id }) => {
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodID, setProizvodID] = useState();
    const [kategorije, setKategorije] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5169/Proizvod/VratiProizvodeSalona/${id}`)
            .then((response) => {
                setProizvodi(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const token = Cookies.get('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };
    const handleDodajKorpa =
        async (proizvodID) => {
            try {
                const response = await axios.put(`http://localhost:5169/Klijent/DodajUKorpu/${proizvodID}`, {}, config);
                console.log(response.data); // response message
            } catch (error) {
                console.error('There was a problem with the PUT request:', error);
            }
        }

    const handleButtonClick = async (id) => {
        setProizvodID(id);
        console.log(proizvodID)
        await handleDodajKorpa(id);
    }

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
    const role = vratiRole();
    const klijent = role === "Klijent" ? "Klijent" : null
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
                            {klijent && <p>{proizvod.id}</p>}
                            <h3>Naziv: {proizvod.naziv}</h3>
                            <p>Cena: {proizvod.cena}</p>
                            {console.log(proizvod.dostupnost)}
                            <p>Dostupnost: {proizvod.dostupnost ? "NA STANJU" : "NEMA NA STANJU"}</p>
                            <button className="btn-cart" onClick={() => handleButtonClick(proizvod.id)}>
                                <BsCart className="btn-cart__icon" />
                                Dodaj u korpu
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
        // </div>
    );
};

export default Proizvodi;