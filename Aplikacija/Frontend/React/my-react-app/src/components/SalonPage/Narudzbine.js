import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { formatirajDatum } from "../UI/FormatirajDatum";
import DetaljiNarudzbine from "./DetaljiNarudzbine";
import Card from "../UI/Card";
import api from "../Auth/Interceptor";

const Narudzbine = () => {
    const korisnicko_ime = vratiKorisnickoIme();
    const [narudzbine, setNarudzbine] = useState([]);

    const ucitajNarudzbine = async () => {
        try {
            const response = await api.get(`/Salon/VratiNarudzbineSalona/${korisnicko_ime}`);
            const noveNarudzbine = response.data;
            const sortiraneNarudzbine = noveNarudzbine.sort((a, b) => {
                if (a.status === "Neobrađena" && b.status !== "Neobrađena") {
                    return -1; // Ako je a neobrađena, a b nije, a treba biti ispred b u sortiranju
                } else if (a.status !== "Neobrađena" && b.status === "Neobrađena") {
                    return 1; // Ako je a obrađena, a b neobrađena, a treba biti iza b u sortiranju
                } else {
                    return 0; // Ako su oba statusa ista, ne menjamo redosled
                }
            });
            setNarudzbine(sortiraneNarudzbine);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ucitajNarudzbine();
    }, []);

    return (
        <Card>
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
                            <td style={{ color: narudzbina.status === 'Neobrađena' ? 'red' : 'inherit' }}>{narudzbina.status}</td>
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
        </Card>
    );
};

export default Narudzbine;