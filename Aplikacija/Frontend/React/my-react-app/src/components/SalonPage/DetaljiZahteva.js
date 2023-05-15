import React, { useState, useEffect } from "react";
import { Modal, Button } from 'react-bootstrap';
import { formatirajDatum } from "../UI/FormatirajDatum";
import axios from "axios";

const DetaljiZahteva = ({ zahtev, ucitajZahteve }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [obradaOpen, setObradaOpen] = useState(false);
    const [status, setStatus] = useState("");
    const [komentarSalona, setKomentarSalona] = useState("");
    const statusi = ["Neobrađen", "Obrađen"];

    // const ucitajProizvodeNarudzbine = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:5169/Klijent/VratiProizvodeNarudzbina/${narudzbina.narudzbinaID}`);
    //         const proizvodi = response.data;
    //         setProizvodi(proizvodi);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // useEffect(() => {
    //     ucitajProizvodeNarudzbine();
    // }, []);

    const obradiZahtev = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5169/Salon/ObradiZahtev/${zahtev.zahtevID}/${status}/${komentarSalona}`
            );
            console.log(response.data);
            ucitajZahteve();
            setObradaOpen(false);
        } catch (error) {
            console.error(error);
            if (status === "" || komentarSalona === "")
                window.alert("Niste uneli sva polja!");
            if (zahtev.status === "Obrađen")
                window.alert("Zahtev je već obrađen!");
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const openObradaForma = () => {
        setObradaOpen(true);
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
                    <p>Ime: {zahtev.klijent.ime}</p>
                    <p>Prezime: {zahtev.klijent.prezime}</p>
                    <p>Grad: {zahtev.klijent.grad}</p>
                    <p>Adresa: {zahtev.klijent.adresa}</p>
                    <p>Broj telefona: {zahtev.klijent.brojTelefona}</p>

                    <h5><u><strong>Detalji narudžbine:</strong></u></h5>
                    <p>Ime ljubimca: {zahtev.imeLjubimca}</p>
                    <p>Zivotinja: {zahtev.zivotinja}</p>
                    <p>Status: {zahtev.status}</p>
                    <p>Komentar: {zahtev.komentarSalona}</p>
                    <p>Ukupna cena: {zahtev.cena}</p>
                    <p>Datum: {formatirajDatum(zahtev.datumVreme)}</p>

                    {obradaOpen && (
                        <div>
                            <h5>Obrada zahteva</h5>
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
                            <Button variant="primary" onClick={obradiZahtev}>
                                Sačuvaj obradu
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button variant="primary" onClick={openObradaForma}>
                                Obradi zahtev
                            </Button>
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

export default DetaljiZahteva;