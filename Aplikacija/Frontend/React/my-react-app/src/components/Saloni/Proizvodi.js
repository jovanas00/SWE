import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../UI/Card";
import './Proizvodi.css';
import { vratiRole } from "../Auth/VratiRole";
import Cookies from "js-cookie"
import { BsCart } from 'react-icons/bs';
import FormDodajProizvod from "../SalonPage/FormDodajProizvod";
import FormIzmeniProizvod from "../SalonPage/FormIzmeniProizvod";
import product from "../../images/item.jpg";
import api from "../Auth/Interceptor";
// import { Form } from "react-router-dom";

const Proizvodi = ({ id }) => {
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodID, setProizvodID] = useState();
    const [kategorije, setKategorije] = useState([]);
    // const [izmenaProizvoda, setIzmenaProizvoda] = useState(false);

    const token = Cookies.get('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    };

    const ucitajProizvode = () => {
        axios.get(`http://localhost:5169/Proizvod/VratiProizvodeSalona/${id}`)
            .then((response) => {
                setProizvodi(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        ucitajProizvode();
    }, [id]);

    const ucitajKategorije = () => {
        axios.get(`http://localhost:5169/Admin/SveKategorije`)
            .then((response) => {
                setKategorije(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        ucitajKategorije();
    }, []);


    const dodajProizvod = (noviProizvod) => {
        axios.post(`http://localhost:5169/Proizvod/DodajProizvod/${noviProizvod.naziv}/${noviProizvod.cena}/${noviProizvod.dostupnost}/${noviProizvod.kategorija}/${id}`)
            .then((response) => {
                console.log('Proizvod uspešno dodat.');
                ucitajProizvode();
            })
            .catch((error) => {
                console.log('Greška prilikom dodavanja proizvoda:', error);
                if (noviProizvod == null)
                    window.alert("Proizvod ne postoji!");
            });

    };

    const obrisiProizvod = (proizvodId) => {
        axios.delete(`http://localhost:5169/Proizvod/ObrisiProizvod/${proizvodId}`)
            .then((response) => {
                window.alert('Proizvod uspešno obrisan.');
                ucitajProizvode();
            })
            .catch((error) => {
                window.alert('Greška prilikom brisanja proizvoda:', error);
                if (proizvodId == null)
                    window.alert("Proizvod ne postoji!");
            });
    };

    const izmeniProizvod = (izmenjenProizvod) => {
        const putanja = `http://localhost:5169/Proizvod/IzmeniProizvod/${izmenjenProizvod.id}?`;

        let parametri = [];

        if (izmenjenProizvod.naziv !== undefined) {
            parametri.push(`naziv=${izmenjenProizvod.naziv}`);
        }

        if (izmenjenProizvod.cena !== undefined) {
            parametri.push(`cena=${izmenjenProizvod.cena}`);
        }

        if (izmenjenProizvod.dostupnost !== undefined) {
            parametri.push(`dostupnost=${izmenjenProizvod.dostupnost}`);
        }

        if (izmenjenProizvod.kategorija !== undefined) {
            parametri.push(`kategorija=${izmenjenProizvod.kategorija}`);
        }

        if (parametri.length > 0) {
            const putanjaSaParametrima = putanja + parametri.join("&");
            axios
                .put(putanjaSaParametrima)
                .then((response) => {
                    console.log("Proizvod je uspešno izmenjen:", response.data);
                    ucitajProizvode();
                })
                .catch((error) => {
                    console.error("Greška prilikom izmene proizvoda:", error);
                });
        }
    };

    const handleDodajKorpa = async (proizvodID) => {
        try {
            const response = await api.put(`http://localhost:5169/Klijent/DodajUKorpu/${proizvodID}`, {});
            console.log(response.data); // Response message
            alert(response.data);
        } catch (error) {
            console.error('There was a problem with the PUT request:', error);
        }
    }

    const handleButtonClick = async (id) => {
        setProizvodID(id);
        console.log(proizvodID)
        await handleDodajKorpa(id);
    }

    //ovde bi mozda moglo da se podesi da se filtrira po kategorije, nije dovrseno
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
            <div>
                {role === "Salon" && <FormDodajProizvod dodajProizvod={dodajProizvod} kategorije={kategorije} />}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(500px, 1fr))", gap: "10px" }}>
                {proizvodi.map((proizvod) => (
                    <div className="product-item">
                        <div className="image-container">
                            <img src={proizvod.slika ? proizvod.slika : product} className="image-item" />
                        </div>
                        <div className="product-details">
                            <h3>Naziv: {proizvod.naziv}</h3>
                            <p>Cena: {proizvod.cena}</p>
                            <p className="dostupnost">Dostupnost: {proizvod.dostupnost ? "NA STANJU" : "NEMA NA STANJU"}</p>
                            {klijent && (
                                <button className="btn-cart" onClick={() => handleButtonClick(proizvod.id)}>
                                    <BsCart className="btn-cart__icon" />
                                    Dodaj u korpu
                                </button>
                            )}

                            {role === "Salon" && (
                                <div>
                                    <FormIzmeniProizvod proizvod={proizvod} izmeniProizvod={izmeniProizvod} kategorije={kategorije} />
                                    <button onClick={() => obrisiProizvod(proizvod.id)}>Obriši</button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

        </div>
        // </div>
    );
};

export default Proizvodi;