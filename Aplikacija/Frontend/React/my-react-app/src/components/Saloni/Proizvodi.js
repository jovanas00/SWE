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
import UploadFile from "../SalonPage/UploadProizvodSlika";
import '../UI/Button.css';
import { obavestenja } from '../UI/Obavestenja';

const Proizvodi = ({ id }) => {
    const [proizvodi, setProizvodi] = useState([]);
    const [proizvodID, setProizvodID] = useState();
    const [kategorije, setKategorije] = useState([]);
    const [odabranaKategorija, setOdabranaKategorija] = useState("");

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
        if(id!=null)
        ucitajProizvode();
    }, [id]);

    const ucitajKategorije = () => {
        axios.get(`http://localhost:5169/Admin/SveKategorije`)
            .then((response) => {
                setKategorije(response.data)
                setOdabranaKategorija(null);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        ucitajKategorije();
    }, []);


    const dodajProizvod = (noviProizvod) => {
        api.post(`/Proizvod/DodajProizvod/${noviProizvod.naziv}/${noviProizvod.cena}/${noviProizvod.dostupnost}/${noviProizvod.kategorija}/${id}`)
            .then((response) => {
                obavestenja('Proizvod uspešno dodat.', 'success');
                ucitajProizvode();
            })
            .catch((error) => {
                console.log('Greška prilikom dodavanja proizvoda:', error);
                if (noviProizvod == null)
                    obavestenja("Proizvod ne postoji!", "danger");
            });

    };

    const obrisiProizvod = (proizvodId) => {
        api.delete(`/Proizvod/ObrisiProizvod/${proizvodId}`)
            .then((response) => {
                obavestenja('Proizvod uspešno obrisan.', 'success');
                ucitajProizvode();
            })
            .catch((error) => {
                window.alert('Greška prilikom brisanja proizvoda:', error);
                if (proizvodId == null)
                    obavestenja("Proizvod ne postoji!", "danger");
            });
    };

    const izmeniProizvod = (izmenjenProizvod) => {
        const putanja = `/Proizvod/IzmeniProizvod/${izmenjenProizvod.id}?`;

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
            parametri.push(`kategorijaId=${izmenjenProizvod.kategorija}`);
        }

        if (parametri.length > 0) {
            const putanjaSaParametrima = putanja + parametri.join("&");
            api
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
            //console.log(response.data); // Response message
            //alert(response.data);
            obavestenja(response.data,'success')
            //obavestenja("Uspešno ste dodali proizvod u korpu! Možete pregledati svoju korpu i naručiti proizvode.", "success");
        } catch (error) {
            console.error('There was a problem with the PUT request:', error);
        }
    }

    const handleButtonClick = async (id) => {
        setProizvodID(id);
        console.log(proizvodID)
        await handleDodajKorpa(id);
    }

    const handleUploadFinished = (response, proizvodID) => {
        const { dbPath } = response;
        console.log(dbPath);

        setProizvodi((prevProizvodi) => {
            const updatedProizvodi = prevProizvodi.map((proizvod) => {
                console.log(proizvod.slika);
                if (proizvod.id === proizvodID) {
                    return {
                        ...proizvod,
                        slika: dbPath ? `http://localhost:5169/${dbPath}` : product,
                    };
                }
                return proizvod;
            });
            ucitajProizvode();
            return updatedProizvodi;
        });
    };

    const filtrirajProizvode = () => {
        if (odabranaKategorija) {
            const filtriraniProizvodi = proizvodi.filter((proizvod) => proizvod.kategorijaNaziv === odabranaKategorija);
            return filtriraniProizvodi;
        }
        return proizvodi;
    };

    const role = vratiRole();
    const klijent = role === "Klijent" ? "Klijent" : null
    return (
        <div>
            <div>
                {role === "Salon" && <FormDodajProizvod dodajProizvod={dodajProizvod} kategorije={kategorije} />}
            </div>
            <div className="container">
                <div>
                    <select
                        value={odabranaKategorija}
                        onChange={(e) => setOdabranaKategorija(e.target.value)}
                    >
                        <option value="">Sve kategorije</option>
                        {kategorije.map((kategorija) => (
                            <option key={kategorija.id} value={kategorija.naziv}>
                                {kategorija.naziv}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="card-grid">
                    {filtrirajProizvode().map((proizvod) => (
                        <div className="card-item" key={proizvod.id}>
                            <Card>
                                <div className="image-container">
                                    <img src={proizvod.slika ? proizvod.slika : product} alt={proizvod.naziv} className="image-item" />
                                </div>
                                <div className="product-details">
                                    <h3>Naziv: {proizvod.naziv}</h3>
                                    <p>Cena: {proizvod.cena}</p>
                                    <p>Dostupnost: {proizvod.dostupnost ? "NA STANJU" : "NEMA NA STANJU"}</p>
                                    {klijent && (
                                        <button className="btn-cart" onClick={() => handleButtonClick(proizvod.id)}>
                                            <BsCart className="btn-cart__icon" />
                                            Dodaj u korpu
                                        </button>
                                    )}

                                    {role === "Salon" && (
                                        <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", topMargin: "20px" }}>
                                            <FormIzmeniProizvod proizvod={proizvod} izmeniProizvod={izmeniProizvod} kategorije={kategorije} />
                                            <UploadFile id={proizvod.id} onUploadFinished={(response) => handleUploadFinished(response, proizvod.id)} />
                                            <button onClick={() => obrisiProizvod(proizvod.id)} className="customButton">Obriši</button>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Proizvodi;