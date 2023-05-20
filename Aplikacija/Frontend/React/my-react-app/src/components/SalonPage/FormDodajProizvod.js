import React, { useState } from "react";
import Card from '../UI/Card';
import Button from '../UI/Button';

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
                <div>
                    <label>
                        Naziv: &nbsp;
                        <input type="text" value={naziv} onChange={(e) => setNaziv(e.target.value)} 
                        placeholder="Naziv proizvoda" 
                        style={{ width: "350px" }}/>
                        
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