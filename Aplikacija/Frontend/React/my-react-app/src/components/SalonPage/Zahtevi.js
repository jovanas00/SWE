import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { formatirajDatum } from "../UI/FormatirajDatum";
import DetaljiZahteva from "./DetaljiZahteva";

const Zahtevi = () => {
    const korisnicko_ime = vratiKorisnickoIme();
    const [zahtevi, setZahtevi] = useState([]);

    // const ucitajZahteve = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5169/Salon/VratiZahteveSalona/${korisnicko_ime}`);
    //         setZahtevi(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const ucitajZahteve = async () => {
        try {
            const response = await axios.get(`http://localhost:5169/Salon/VratiZahteveSalona/${korisnicko_ime}`);
            const noveZahteve = response.data;
            const sortiraniZahtevi = noveZahteve.sort((a, b) => {
                if (a.status === "Neobrađen" && b.status !== "Neobrađen") {
                    return -1; // Ako je a neobrađen, a b nije, a treba biti ispred b u sortiranju
                } else if (a.status !== "Neobrađen" && b.status === "Neobrađen") {
                    return 1; // Ako je a obrađen, a b neobrađen, a treba biti iza b u sortiranju
                } else {
                    return 0; // Ako su oba statusa ista, ne menjamo redosled
                }
            });
            setZahtevi(sortiraniZahtevi);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ucitajZahteve();
    }, []);

    return (
        <Table striped bordered responsive>
            <thead>
                <tr>
                    <th>Tip zivotinje</th>
                    <th>Status</th>
                    <th>Komentar</th>
                    <th>Datum</th>
                    <th>Detalji</th>
                </tr>
            </thead>
            <tbody>
                {zahtevi.map((zahtev) => (
                    <tr>
                        <td>{zahtev.zivotinja}</td>
                        <td>{zahtev.status}</td>
                        <td>{zahtev.komentarSalona}</td>
                        <td>{formatirajDatum(zahtev.datumVreme)}</td>
                        <td>
                            <DetaljiZahteva zahtev={zahtev} ucitajZahteve={ucitajZahteve} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default Zahtevi;