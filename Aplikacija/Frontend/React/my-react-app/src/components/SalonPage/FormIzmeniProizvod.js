import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './Modal.css';
import '../UI/Button.css';
import { obavestenja } from "../UI/Obavestenja";

const FormIzmeniProizvod = ({ proizvod, izmeniProizvod, kategorije }) => {
    const [naziv, setNaziv] = useState(proizvod.naziv);
    const [cena, setCena] = useState(proizvod.cena);
    const [dostupnost, setDostupnost] = useState(proizvod.dostupnost);
    const [kategorija, setKategorija] = useState(proizvod.kategorijaId);

    const [showModal, setShowModal] = useState(false);


    const handleIzmeniProizvod = () => {
        const izmenjenProizvod = {
            id: proizvod.id,
            naziv,
            cena,
            dostupnost,
            kategorija
        };
        if (izmenjenProizvod.cena <= 0) {
            obavestenja("Cena mora da bude veca od 0!", "danger");
            return;
        }
        if (naziv === "" || cena === "" || kategorija === "") {
            obavestenja("Niste uneli sva polja!", "danger");
            setNaziv(proizvod.naziv);
            setCena(proizvod.cena);
            setDostupnost(proizvod.dostupnost);
            setKategorija(proizvod.kategorijaId);
        }
        else {
            izmeniProizvod(izmenjenProizvod);
            setShowModal(false);
            obavestenja("Uspesno ste promenili proizvod!", "success");
        }
    };

    const handleOdustaniOdIzmene = () => {
        setShowModal(false);
        setNaziv(proizvod.naziv);
        setCena(proizvod.cena);
        setDostupnost(proizvod.dostupnost);
        setKategorija(proizvod.kategorijaId);
    };

    const handleKategorijaChange = (e) => {
        setKategorija(e.target.value);
    };

    return (
        <div>
            <button variant="primary" onClick={() => setShowModal(true)} className="customButton">
                Izmeni
            </button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Izmena proizvoda</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Naziv:</Form.Label>
                            <Form.Control
                                type="text"
                                value={naziv}
                                onChange={(e) => setNaziv(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cena:</Form.Label>
                            <Form.Control
                                type="number"
                                value={cena}
                                onChange={(e) => setCena(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="Dostupnost"
                                checked={dostupnost}
                                onChange={(e) => setDostupnost(e.target.checked)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kategorija:</Form.Label>
                            <Form.Control
                                as="select"
                                value={kategorija}
                                onChange={handleKategorijaChange}
                            >
                                <option value="">Odaberite kategoriju</option>
                                {kategorije.map((k) => (
                                    <option key={k.id} value={k.id} selected={proizvod.kategorijaNaziv === k.naziv}>{k.naziv}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <div className="modal-buttons-container">
                        <Button variant="primary" onClick={handleIzmeniProizvod} className="action-button">
                            Sačuvaj izmene
                        </Button>
                        <Button variant="secondary" onClick={handleOdustaniOdIzmene} className="action-button">
                            Zatvori
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FormIzmeniProizvod;