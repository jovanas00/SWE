import React, { useState } from "react";
import Card from '../UI/Card';
import Button from '../UI/Button';
import { obavestenja } from "../UI/Obavestenja";

const FormDodajProizvod = ({ dodajProizvod, kategorije }) => {
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
            obavestenja('Molimo popunite sva polja', 'danger');
            return;
        }
        dodajProizvod(noviProizvod);

        setNaziv('');
        setCena('');
        setDostupnost(false);
        setOdabranaKategorija('');
    };

    const handleKategorijaChange = (e) => {
        setOdabranaKategorija(e.target.value);
    };

    return (
        <Card>
            <form onSubmit={handleFormSubmit}>
                <div>
                <label>
                    Naziv: &nbsp;
                    <input
                        type="text"
                        value={naziv}
                        onChange={(e) => setNaziv(e.target.value)}
                        placeholder="Naziv proizvoda"
                        style={{ width: "100%", maxWidth: "350px" }}
                    />
                </label>
                </div>
                <div>
                <label>
                    Cena: &nbsp; 
                    <input type="number" value={cena} onChange={(e) => setCena(e.target.value)} 
                    placeholder=" Cena proizvoda" />
                </label>
                </div>
                <div>
                    <label>
                        Dostupnost: &nbsp;
                        <input
                            type="checkbox"
                            checked={dostupnost === true}
                            onChange={(e) => setDostupnost(e.target.checked)}
                        />
                    </label>
                </div>
                <div>
                    Kategorija: &nbsp;
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
                <Button type="submit" naziv={"Dodaj proizvod"}>Dodaj proizvod</Button>
            </form>
        </Card>
    );
};

export default FormDodajProizvod;