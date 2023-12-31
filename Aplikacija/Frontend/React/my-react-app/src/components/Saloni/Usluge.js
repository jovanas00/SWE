import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Card from "../UI/Card";
import FormDodajUslugu from "../SalonPage/FormDodajUslugu";
import { vratiRole } from "../Auth/VratiRole";
import '../UI/Button.css';
import api from "../Auth/Interceptor";
import { obavestenja } from '../UI/Obavestenja';

const Usluge = ({ id }) => {
    const [usluge, setUsluge] = useState([]);
    const [trenutnoIzmenjenRed, setTrenutnoIzmenjenRed] = useState(null);
    const [izmenjeneVrednosti, setIzmenjeneVrednosti] = useState({});

    const ucitajUsluge = () => {
        axios.get(`http://localhost:5169/Usluga/VratiUslugeSalona/${id}`)
            .then((response) => {
                setUsluge(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    useEffect(() => {
        ucitajUsluge();
    }, []);

    const dodajUslugu = (novaUsluga) => {
        if(novaUsluga.cena<=0)
            {
                obavestenja("Cena mora da bude veca od 0!","danger");
                return;
            }
        api.post(`/Usluga/DodajUslugu/${novaUsluga.naziv}/${novaUsluga.cena}/${novaUsluga.opis}/${novaUsluga.dostupnost}/${id}`)
            .then((response) => {
                obavestenja(response.data, 'success');
                ucitajUsluge();
            })
            .catch((error) => {
                console.log('Greška prilikom dodavanja usluge:', error);
                if (novaUsluga == null)
                    obavestenja("Usluga ne postoji!", "danger");
            });

    };

    const obrisiUslugu = (idUsluge) => {
        api
            .delete(`/Usluga/ObrisiUslugu/${idUsluge}`)
            .then((response) => {
                obavestenja('Usluga je uspešno obrisana!', 'success');
                ucitajUsluge();
            })
            .catch((error) => {
                console.log('Greška prilikom brisanja usluge:', error);
                console.log('Detalji greške:', error.response.data);
            });
    };

    const izmeniUslugu = (id, index) => {
        const putanja = `/Usluga/IzmeniUslugu/${id}?`;
        if(izmenjeneVrednosti.cena<=0)
            {
                obavestenja("Cena mora da bude veca od 0!","danger");
                return;
            }
        let parametri = [];
        const naziv = izmenjeneVrednosti.naziv;
        const cena = izmenjeneVrednosti.cena;
        const opis = izmenjeneVrednosti.opis;
        const dostupnost = izmenjeneVrednosti.dostupnost !== undefined ?
            izmenjeneVrednosti.dostupnost :
            usluge[index].dostupnost;
        
        if (naziv !== undefined) {
            parametri.push(`naziv=${naziv}`);
        }

        if (cena !== undefined) {
            parametri.push(`cena=${cena}`);
        }

        if (opis !== undefined) {
            parametri.push(`opis=${opis}`);
        }

        if (dostupnost !== undefined) {
            parametri.push(`dostupnost=${dostupnost}`);
        }

        if (parametri.length > 0) {
            const putanjaSaParametrima = putanja + parametri.join("&");

            api
                .put(putanjaSaParametrima)
                .then((response) => {
                    obavestenja(response.data, 'success');
                    ucitajUsluge();
                    setTrenutnoIzmenjenRed(null);
                    setIzmenjeneVrednosti({});
                })
                .catch((error) => {
                    console.log('Greška prilikom izmene usluge:', error);
                    console.log('Detalji greške:', error.response.data);
                });
        } else {
            obavestenja('Nema izmenjenih vrednosti.', 'danger');
            ucitajUsluge();
            setTrenutnoIzmenjenRed(null);
            setIzmenjeneVrednosti({});
        }

    };


    const handleIzmeni = (index) => {
        setTrenutnoIzmenjenRed(index);
        setIzmenjeneVrednosti({});
    };

    const role = vratiRole();

    return (
        <div>
            <div>
                {role === "Salon" && <FormDodajUslugu dodajUslugu={dodajUslugu} />}
            </div>
            <div style={{ marginTop: "20px" }}>
                <Card>
                    <div>
                        <Table striped bordered responsive>
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                    <th>Cena(RSD)</th>
                                    <th>Opis usluge</th>
                                    {/* <th>Kapacitet</th> */}
                                    <th>Dostupnost</th>
                                    {role === "Salon" && <th>Izmeni/Obriši</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {usluge.map((usluga, index) => (
                                    <tr key={usluga.id}>
                                        <td>
                                            {trenutnoIzmenjenRed === index ? (
                                                <input
                                                    type="text"
                                                    name="naziv"
                                                    value={izmenjeneVrednosti.naziv === undefined ? usluga.naziv : izmenjeneVrednosti.naziv}
                                                    onChange={(e) => setIzmenjeneVrednosti({ ...izmenjeneVrednosti, naziv: e.target.value })}
                                                />
                                            ) : (
                                                usluga.naziv
                                            )}
                                        </td>
                                        <td>
                                            {trenutnoIzmenjenRed === index ? (
                                                <input
                                                    type="number"
                                                    name="cena"
                                                    value={izmenjeneVrednosti.cena === undefined ? usluga.cena : izmenjeneVrednosti.cena}
                                                    onChange={(e) => setIzmenjeneVrednosti({ ...izmenjeneVrednosti, cena: e.target.value })}
                                                />
                                            ) : (
                                                usluga.cena
                                            )}
                                        </td>
                                        <td>
                                            {trenutnoIzmenjenRed === index ? (
                                                <input
                                                    type="text"
                                                    name="opis"
                                                    value={izmenjeneVrednosti.opis === undefined ? usluga.opis : izmenjeneVrednosti.opis}
                                                    onChange={(e) => setIzmenjeneVrednosti({ ...izmenjeneVrednosti, opis: e.target.value })}
                                                />
                                            ) : (
                                                usluga.opis
                                            )}
                                        </td>
                                        <td>
                                            {trenutnoIzmenjenRed === index ? (
                                                <input
                                                    type="checkbox"
                                                    name="dostupnost"
                                                    checked={izmenjeneVrednosti.dostupnost !== undefined ? izmenjeneVrednosti.dostupnost : usluga.dostupnost}
                                                    onChange={(e) => setIzmenjeneVrednosti({ ...izmenjeneVrednosti, dostupnost: e.target.checked })}
                                                />
                                            ) : (
                                                usluga.dostupnost ? "DOSTUPNO" : "NIJE DOSTUPNO"
                                            )}
                                        </td>
                                        {role === "Salon" && (
                                            <td>
                                                {trenutnoIzmenjenRed === index ? (
                                                    <>
                                                        <button onClick={() => izmeniUslugu(usluga.id, index)} className="customButton">Potvrdi</button>
                                                        <button onClick={() => setTrenutnoIzmenjenRed(null)} className="customButton">Odustani</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => handleIzmeni(index)} className="customButton">Izmeni</button>
                                                )}
                                                <button onClick={() => obrisiUslugu(usluga.id)} className="customButton">Obriši</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Usluge;