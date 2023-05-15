import React, { useState } from "react";
import Card from '../UI/Card';

const FormDodajProizvod = ({ dodajProizvod, kategorije }) => {
    //fali slika
    const [naziv, setNaziv] = useState('');
    const [cena, setCena] = useState('');
    const [dostupnost, setDostupnost] = useState(false);
    const [odabranaKategorija, setOdabranaKategorija] = useState('');


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const noviProizvod = {
            naziv,
            cena,
            dostupnost,
            kategorija: odabranaKategorija,
        };
        if (!naziv || !cena || !odabranaKategorija) {
            alert('Molimo popunite sva polja');
            return;
        }
        dodajProizvod(noviProizvod);

        setNaziv('');
        setCena('');
        setDostupnost(false);
        setOdabranaKategorija('');
    };

    const handleKategorijaChange = (e) => {
        // console.log("ID:", e.target.value);
        setOdabranaKategorija(e.target.value);
    };

    return (
        <Card>
            <form onSubmit={handleFormSubmit}>
                <label>
                    Naziv:
                    <input type="text" value={naziv} onChange={(e) => setNaziv(e.target.value)} />
                </label>
                <br />
                <label>
                    Cena:
                    <input type="number" value={cena} onChange={(e) => setCena(e.target.value)} />
                </label>
                <br />
                <label>
                    Dostupnost:
                    <input
                        type="checkbox"
                        checked={dostupnost === true}
                        onChange={(e) => setDostupnost(e.target.checked)}
                    />
                </label>
                <br />
                <div>
                    Kategorija:
                    <select value={odabranaKategorija} onChange={handleKategorijaChange}>
                        <option value="">Odaberite kategoriju</option>
                        {kategorije.map((kategorija) => (
                            <option key={kategorija.id} value={kategorija.id}>
                                {kategorija.naziv}
                            </option>
                        ))}
                    </select>
                </div>
                <br />
                <button type="submit">Dodaj proizvod</button>
            </form>
        </Card>
    );
};

export default FormDodajProizvod;