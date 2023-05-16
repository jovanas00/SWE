import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import user from '../../images/user.webp';
import { vratiRole } from "../Auth/VratiRole";
import { BsStarFill, BsStar } from 'react-icons/bs';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


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
        event.preventDefault()
        if (inputText === "") {
            alert("Niste uneli tekst recenzije!")
            return;
        }
        const selectedValue = document.querySelector('input[name="ocena"]:checked').value;
        axios.post('http://localhost:5169/Klijent/OceniSalon/' + encodeURIComponent(inputText) + '/' + selectedValue + '/' + id, {
        }, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`
            }
        })
            .then((response) => {
                alert(response.data);
                window.location.reload();
            })
            .catch((error) => {
                if (error.response && error.response.data === false) {
                    alert("Vec ste ocenili salon!");
                }
            });
    };
    const role = vratiRole();
    return (
        <div>
            {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                <p style={{ fontSize: "40px" }}><strong><u>Recenzije</u></strong></p>
            </div> */}
            <form onSubmit={handleSubmit}>
                {role === "Klijent" && (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                        <input
                            type="text"
                            value={inputText}
                            onChange={(event) => setInputText(event.target.value)}
                            placeholder="Unesite svoju recenziju"
                            className="input-text"
                        />
                        <div style={{ display: "flex" }}>
                            <p style={{ marginRight: "10px" }}>Ocena:</p>
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
                        <button type="submit" className="btn btn-primary">Oceni</button>
                    </div>
                )}
            </form>
            {recenzije.map((recenzija) => (
                <Card>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="col-xl-12">
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <div>
                                    <h5>
                                        <img
                                            src={recenzija.slika ? recenzija.slika : user}
                                            alt={user}
                                            style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                        />
                                        {recenzija.klijentImePrezime}
                                    </h5>
                                    <p>Postavljeno: {formatirajDatum(recenzija.datumPostavljanja)}</p>
                                    <h5><strong>Ocenjujem: {recenzija.salonNaziv}</strong></h5>
                                    <h4><strong>Recenzija: {recenzija.tekst}</strong></h4>
                                    <h4><strong>Ocena:{recenzija.ocena}</strong></h4>
                                </div>
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

export default Recenzije;