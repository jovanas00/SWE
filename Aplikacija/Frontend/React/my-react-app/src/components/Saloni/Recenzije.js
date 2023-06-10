import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import user from '../../images/user.webp';
import { vratiRole } from "../Auth/VratiRole";
import { BsStarFill, BsStar } from 'react-icons/bs';
import Cookies from "js-cookie";
import api from "../Auth/Interceptor";
import { formatirajDatum } from "../UI/FormatirajDatum";
import './Recenzije.css';
import { obavestenja } from "../UI/Obavestenja";

const Recenzije = ({ id }) => {
    const [recenzije, setRecenzije] = useState([]);
    const [inputText, setInputText] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5169/Salon/VratiRecenzijeSalona/${id}`)
            .then((response) => {
                setRecenzije(response.data);
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const [recenzija, setRecenzija] = useState({
        tekst: '',
        ocena: 1
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRecenzija((prevRecenzija) => ({
            ...prevRecenzija,
            [name]: value
        }));

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputText === "") {
            obavestenja('Niste uneli tekst recenzije!', 'warning');
            return;
        }

        const selectedValue = document.querySelector('input[name="ocena"]:checked').value;

        api.post(
            `http://localhost:5169/Klijent/OceniSalon/${encodeURIComponent(inputText)}/${selectedValue}/${id}`
        )
            .then((response) => {
                obavestenja(response.data, 'success');
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.data === false) {
                    obavestenja('Već ste ocenili salon!', 'warning');
                }
            });
    };

    const prikazOcene = (ocena) => {
        const zvezdice = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= ocena) {
                zvezdice.push(<BsStarFill key={i} size={20} />);
            } else {
                zvezdice.push(<BsStar key={i} size={20} />);
            }
        }
        return zvezdice;
    };

    const grupisaneRecenzije = recenzije.reduce((grupe, recenzija) => {
        const ocena = recenzija.ocena.toString();
        if (!grupe[ocena]) {
            grupe[ocena] = [];
        }
        grupe[ocena].push(recenzija);
        return grupe;
    }, {});

    const role = vratiRole();
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                {role === "Klijent" && (
                    <div className="row justify-content-center mb-4">
                        <div className="col-lg-6">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(event) => setInputText(event.target.value)}
                                placeholder="Unesite svoju recenziju"
                                className="input-text"
                            />
                        </div>
                        <div className="col-lg-3">
                            <div className="d-flex">
                                <p className="mr-2">Ocena:</p>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} style={{ marginRight: "5px" }}>
                                        <input
                                            type="radio"
                                            name="ocena"
                                            value={value}
                                            checked={recenzija.ocena === value}
                                            onChange={handleInputChange}
                                            style={{ display: "none" }}
                                        />
                                        {value <= recenzija.ocena ? (
                                            <BsStarFill size={20} onClick={() => handleInputChange({ target: { name: 'ocena', value: value } })} />
                                        ) : (
                                            <BsStar size={20} onClick={() => handleInputChange({ target: { name: 'ocena', value: value } })} />
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <button type="submit" className="btn btn-primary">Oceni</button>
                        </div>
                    </div>
                )}
            </form>
            <div className="row justify-content-center recenzije-list">
                {[5, 4, 3, 2, 1].map((ocena) => (
                    grupisaneRecenzije[ocena.toString()] && (
                        <div key={ocena.id} className="col-lg-12 mb-4">
                            <h3>Ocena: {ocena}</h3>
                            <div className="recenzije-grupa">
                                {grupisaneRecenzije[ocena.toString()].map((recenzija) => (
                                    <Card key={recenzija.id}>
                                        <div className="text-center">
                                            <img
                                                src={recenzija.slika ? recenzija.slika : user}
                                                alt={user}
                                                className="recenzija-slika"
                                            />
                                            <h5>{recenzija.klijentImePrezime}</h5>
                                            <p>Postavljeno: {formatirajDatum(recenzija.datumPostavljanja)}</p>
                                            <h5><strong>Ocenjujem: {recenzija.salonNaziv}</strong></h5>
                                            <h4><strong>Recenzija: {recenzija.tekst}</strong></h4>
                                            <strong>{prikazOcene(recenzija.ocena)}</strong>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div >
    );
};

export default Recenzije;