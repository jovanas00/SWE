import React, { useState } from "react";
import Card from '../UI/Card';

const FormDodajUslugu = ({ dodajUslugu }) => {
    const [naziv, setNaziv] = useState('');
    const [cena, setCena] = useState('');
    const [opis, setOpis] = useState('');
    const [dostupnost, setDostupnost] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kreiranje objekta usluge sa unetim podacima
        const novaUsluga = {
            naziv,
            cena: parseFloat(cena),
            opis,
            dostupnost
        };
        if (!naziv || !cena || !opis) {
            alert('Molimo popunite sva polja');
            return;
        }
        // Prosleđivanje nove usluge funkciji za dodavanje
        dodajUslugu(novaUsluga);

        // Resetovanje polja forme nakon slanja
        setNaziv('');
        setCena('');
        setOpis('');
        setDostupnost(false);
    };

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <label>
                    Naziv:
                    <input
                        type="text"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                    />
                </label>

                <label>
                    Cena:
                    <input
                        type="number"
                        value={cena}
                        onChange={(e) => setCena(e.target.value)}
                    />
                </label>

                <label>
                    Opis:
                    <textarea
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                    ></textarea>
                </label>

                <label>
                    Dostupnost:
                    <input
                        type="checkbox"
                        checked={dostupnost}
                        onChange={(e) => setDostupnost(e.target.checked)}
                    />
                </label>

                <button type="submit">Dodaj Uslugu</button>
            </form>
        </Card>

    );
};

export default FormDodajUslugu;