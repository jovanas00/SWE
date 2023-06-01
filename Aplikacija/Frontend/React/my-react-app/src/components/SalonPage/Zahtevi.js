import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { formatirajDatum } from "../UI/FormatirajDatum";
import DetaljiZahteva from "./DetaljiZahteva";
import Card from "../UI/Card";
import api from "../Auth/Interceptor";

const Zahtevi = () => {
    const korisnicko_ime = vratiKorisnickoIme();
    const [zahtevi, setZahtevi] = useState([]);

    const ucitajZahteve = async () => {
        try {
            const response = await api.get(`/Salon/VratiZahteveSalona/${korisnicko_ime}`);
            const noveZahteve = response.data;
            const sortiraniZahtevi = noveZahteve.sort((a, b) => {
                if (a.status === "Neobrađen" && b.status !== "Neobrađen") {
                    return -1;
                } else if (a.status !== "Neobrađen" && b.status === "Neobrađen") {
                    return 1;
                } else {
                    return 0;
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
        <Card>
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
                            <td style={{ color: zahtev.status === 'Neobrađen' ? 'red' : 'inherit' }}>{zahtev.status}</td>
                            <td>{zahtev.komentarSalona}</td>
                            <td>{formatirajDatum(zahtev.datumVreme)}</td>
                            <td>
                                <DetaljiZahteva zahtev={zahtev} ucitajZahteve={ucitajZahteve} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Card>
    );
};

export default Zahtevi;