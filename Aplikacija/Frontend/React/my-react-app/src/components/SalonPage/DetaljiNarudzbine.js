import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { formatirajDatum } from "../UI/FormatirajDatum";
import axios from "axios";

const DetaljiNarudzbine = ({ narudzbina, ucitajNarudzbine }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [proizvodi, setProizvodi] = useState([]);
    const [obradaOpen, setObradaOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [komentarSalona, setKomentarSalona] = useState("");
    const statusi = ["Neobrađena", "Obrađena"];

    const ucitajProizvodeNarudzbine = async () => {
        try {
            const response = await axios.get(`http://localhost:5169/Klijent/VratiProizvodeNarudzbina/${narudzbina.narudzbinaID}`);
            const proizvodi = response.data;
            setProizvodi(proizvodi);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ucitajProizvodeNarudzbine();
    }, []);

    const obradiNarudzbinu = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5169/Salon/ObradiNarudzbinu/${narudzbina.narudzbinaID}/${status}/${komentarSalona}`
            );
            console.log(response.data);
            ucitajNarudzbine();
            setObradaOpen(false);
        } catch (error) {
            console.error(error);
            if (status === "" || komentarSalona === "")
                window.alert("Niste uneli sva polja!");
            if (narudzbina.status === "Obrađena")
                window.alert("Narudžbina je već obrađena!");
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openObradaForma = () => {
        if (narudzbina.status !== "Obrađena") {
            setObradaOpen(true);
        } else {
            window.alert("Narudžbina je već obrađena!");
        }
    };

    const closeObradaForma = () => {
        setObradaOpen(false);
        setStatus("");
        setKomentarSalona("");
    };


    return (
        <>
            <button onClick={openModal}>Pogledaj detalje</button>

            <Modal show={modalOpen} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Detalji narudžbine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5><u><strong>Detalji Kupca:</strong></u></h5>
                    <p>Ime: {narudzbina.klijent.ime}</p>
                    <p>Prezime: {narudzbina.klijent.prezime}</p>
                    <p>Korisničko ime: {narudzbina.korisnickoIme}</p>
                    <p>Grad: {narudzbina.grad}</p>
                    <p>Adresa: {narudzbina.adresa}</p>
                    <p>Broj telefona: {narudzbina.klijent.brojTelefona}</p>

                    <h5><u><strong>Proizvodi:</strong></u></h5>
                    {proizvodi.map((proizvod, index) => (
                        <div key={proizvod.id}>
                            <p>{index + 1}. Naziv: {proizvod.nazivProizvoda}</p>
                            {/*slika*/}
                            {/* <p>Cena: {proizvod.cena}</p> */}
                            <p>Količina: {proizvod.kolicina}</p>
                        </div>
                    ))}

                    <h5><u><strong>Detalji narudžbine:</strong></u></h5>
                    <p>Status: {narudzbina.status}</p>
                    <p>Komentar: {narudzbina.komentarSalona}</p>
                    <p>Ukupna cena: {narudzbina.ukupnaCena}</p>
                    <p>Datum: {formatirajDatum(narudzbina.datum)}</p>

                    {obradaOpen && (
                        <div>
                            <h5>Obrada narudžbine</h5>
                            <label>Status:</label>
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                {statusi.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <label>Komentar:</label>
                            <input
                                type="text"
                                value={komentarSalona}
                                onChange={(e) => setKomentarSalona(e.target.value)}
                            />
                        </div>
                    )}


                </Modal.Body>
                <Modal.Footer>
                    {obradaOpen ? (
                        <div>
                            <Button variant="secondary" onClick={closeObradaForma}>
                                Zatvori
                            </Button>
                            <Button variant="primary" onClick={obradiNarudzbinu}>
                                Sačuvaj obradu
                            </Button>
                        </div>
                    ) : (
                        <div>
                            {narudzbina.status !== "Obrađena" && (
                                <Button variant="primary" onClick={openObradaForma}>
                                    Obradi narudžbinu
                                </Button>
                            )}
                            <Button variant="secondary" onClick={closeModal}>
                                Otkaži
                            </Button>
                        </div>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DetaljiNarudzbine;