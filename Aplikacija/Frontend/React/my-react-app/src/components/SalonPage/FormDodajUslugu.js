import React, { useState } from "react";
import Card from '../UI/Card';
import Button from '../UI/Button';

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
                <div>
                    <label>
                        Naziv: &nbsp;
                        <input
                            type="text"
                            value={naziv}
                            onChange={(e) => setNaziv(e.target.value)}
                            placeholder="Naziv usluge"
                            style={{ width: "350px" }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cena: &nbsp;
                        <input
                            type="number"
                            value={cena}
                            onChange={(e) => setCena(e.target.value)}
                            placeholder=" Cena usluge"
                        />
                    </label>
                </div>
                <div>
                <label>
                    Opis: <br />
                    <textarea
                        value={opis}
                        onChange={(e) => setOpis(e.target.value)}
                        placeholder=" Opis usluge"
                        style={{ width: "397px" }} 
                    ></textarea>
                </label>

                </div>
                <div>
                    <label>
                        Dostupnost: &nbsp;
                        <input
                            type="checkbox"
                            checked={dostupnost}
                            onChange={(e) => setDostupnost(e.target.checked)}
                        />
                    </label>
                </div>
                <Button type="submit" naziv={"Dodaj uslugu"}>Dodaj Uslugu</Button>
            </form>
        </Card>

    );
};

export default FormDodajUslugu;