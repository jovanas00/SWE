import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { isSalon } from "../Auth/AuthSalon";
import { formatirajDatum } from "../UI/FormatirajDatum";
import DetaljiNarudzbine from "./DetaljiNarudzbine";

const Narudzbine = () => {
    const korisnicko_ime = vratiKorisnickoIme();
    const [narudzbine, setNarudzbine] = useState([]);

    const ucitajNarudzbine = async () => {
        try {
            const response = await axios.get(`http://localhost:5169/Salon/VratiNarudzbineSalona/${korisnicko_ime}`);
            setNarudzbine(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ucitajNarudzbine();
    }, []);

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Korisnik(korisničko ime)</th>
                    <th>Status</th>
                    <th>Komentar</th>
                    <th>Ukupna cena</th>
                    <th>Datum</th>
                    <th>Detalji</th>
                </tr>
            </thead>
            <tbody>
                {narudzbine.map((narudzbina) => (
                    <tr>
                        <td>{narudzbina.korisnickoIme}</td>
                        <td>{narudzbina.status}</td>
                        <td>{narudzbina.komentarSalona}</td>
                        <td>{narudzbina.ukupnaCena}</td>
                        <td>{formatirajDatum(narudzbina.datum)}</td>
                        <td>
                            <DetaljiNarudzbine narudzbina={narudzbina} ucitajNarudzbine={ucitajNarudzbine} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Narudzbine;