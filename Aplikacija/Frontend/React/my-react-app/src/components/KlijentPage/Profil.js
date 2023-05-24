import React, { useEffect, useState } from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import axios from 'axios';
import iconP from "../../images/nemaSlike.gif";
import Header from '../Pocetna/Header';
import Informacije from './Informacije';
import './Profil.css';
import Cookies from 'js-cookie';
import TokenChecker from '../Auth/TokenChecker';
import api from '../Auth/Interceptor';
import { formatirajDatum } from "../UI/FormatirajDatum";
import { Card } from "react-bootstrap";
import { obavestenja } from '../UI/Obavestenja';


const Profil = () => {
  const [narudzbine, setNarudzbine] = useState([]);
  const [prikazNarudzbina, setPrikazNarudzbina] = useState(true);
  const [zahtevi, setZahtevi] = useState([]);
  const [prikazProizvoda, setPrikazProizvoda] = useState(false);
  const [prikaziModal, setPrikaziModal] = useState(false);
  const [modalProizvodi, setModalProizvodi] = useState([]);


  // Autorizacija
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const korisnickoIme = vratiKorisnickoIme();

  const handleDeleteZahtev = async (idZahteva) => {
    try {
      await api.delete(`/Klijent/ObrisiZahtev/${idZahteva}`);
      // Zahtev je uspešno obrisan, možete ažurirati listu zahteva ako je potrebno
      obavestenja('Uspešno ste obrisali zahtev!','success');
      const updatedZahtevi = zahtevi.filter((zahtev) => zahtev.id !== idZahteva);
      setZahtevi(updatedZahtevi);
    } catch (error) {
      console.error(error);
      // Došlo je do greške prilikom brisanja zahteva, možete prikazati odgovarajuću poruku ili preduzeti druge akcije
    }
  };

  const handleFetchProizvodi = async (idNarudzbine) => {
    try {
      const response = await api.get(`/Klijent/VratiProizvodeNarudzbina/${idNarudzbine}`);
      const proizvodiNarudzbine = response.data;
      setModalProizvodi(proizvodiNarudzbine); // Ažuriranje modalProizvodi stanja
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleShowProizvodi = (idNarudzbine) => {
    handleFetchProizvodi(idNarudzbine);
    setPrikaziModal(true);
  };

  const handleCloseModal = () => {
    setPrikaziModal(false);
  };

  
  useEffect(() => {
    if (isKlijent()) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/Klijent/PrikaziNarudzbineISalone/${korisnickoIme}`);
          setNarudzbine(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      const fetchZahtevi = async () => {
        try {
          const zahteviResponse = await api.get(`/Klijent/PrikaziZahteveISalone/${korisnickoIme}`);
          setZahtevi(zahteviResponse.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
      fetchZahtevi();
    }
  }, []);

  const handleNarudzbineClick = () => {
    setPrikazNarudzbina(true);
  };


  const handleZahteviClick = () => {
    setPrikazNarudzbina(false);
  };

  if (isKlijent()) {
    return (
      <div>
        <TokenChecker />
        <Header />
        <Informacije />
        <div className="button-list">
          <button onClick={handleNarudzbineClick}><strong>Narudžbine</strong></button>
          <button onClick={handleZahteviClick}><strong>Zahtevi</strong></button>
        </div>
        <div className="content"></div>
        <div className="narudzbine-container">
          {prikazNarudzbina ? (
            <>
              <h5 style={{ marginLeft: '14px', fontWeight: 'bold', fontStyle: 'italic' }}>Informacije o narudžbinama:</h5>
              {narudzbine.length > 0 ? (
                <ul>
                  {narudzbine
                  .sort((a, b) => new Date(b.datumVreme) - new Date(a.datumVreme)) // Sortiranje po opadajućem redosledu datuma
                  .map((narudzbina, index) => (

                    <li key={narudzbina.id}>
                      <div className="container">
                        <div className="card">
                          <p className="narudzbina-brojac">Narudžbina {index + 1}.</p>
                          <p><strong>Status narudžbine:</strong> {narudzbina.status}</p>
                          <p><strong>Komentar salona:</strong> {narudzbina.komentarSalona}</p>
                          <p><strong>Ukupna cena:</strong> {narudzbina.ukupnaCena}</p>
                          <p><strong>Datum:</strong> {formatirajDatum(narudzbina.datumVreme)}</p>
                        </div>
                        <div className="card">
                          <p className="podaci-salona"><strong>Podaci salona:</strong></p>
                          <p><strong>Naziv salona:</strong> {narudzbina.salon.naziv}</p>
                          <p><strong>Adresa salona:</strong> {narudzbina.salon.adresa}</p>
                          <p><strong>Grad salona:</strong> {narudzbina.salon.grad}</p>
                          <p><strong>Broj telefona salona:</strong> {narudzbina.salon.brojTelefona}</p>
                        </div>
                      </div>

                      <button className="sviProizvodi-button" onClick={() => handleShowProizvodi(narudzbina.id)}>Svi proizvodi</button>
                      {prikaziModal && (
                        <div className="modal">
                          <div className="modal-content">
                            {/* Ovde dodajte prikaz proizvoda u modalu */}
                              <div className="proizvodi-container">
                          <h5 style={{fontWeight: 'bold', fontStyle: 'italic' }}>Svi proizvodi:</h5>
                          <ul>
                            {modalProizvodi.map((proizvod, index2) => (
                              <li key={index2}>
                                <p className="proizvodi-brojac">Proizvod {index2 + 1}.</p>
                                <img
                                  src={proizvod.slikaProizvoda ? proizvod.slikaProizvoda : iconP}
                                  alt="Proizvod"
                                  className="image"
                                />
                                <p><strong>Naziv proizvoda:</strong> {proizvod.nazivProizvoda}</p>
                                <p><strong>Količina:</strong> {proizvod.kolicina}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      <button className="zatvori-button" onClick={handleCloseModal}>Zatvori</button>
                    </div>
                  </div>
                )}
                      <hr /> {/* Linija na kraju narudžbine */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nema dostupnih narudžbina.</p>
              )}
            </>
          ) : (
            <>
              <h5 style={{ marginLeft: '14px', fontWeight: 'bold', fontStyle: 'italic' }}>Informacije o zahtevima:</h5>
              {zahtevi.length > 0 ? (
                <ul>
                  {zahtevi.map((zahtev, index) => (
                    <li key={zahtev.id}>
                      <div className="container">
                        <div className="card">
                          <p className="zahtev-brojac">Zahtev {index + 1}.</p>
                          <p><strong>Ime ljubimca:</strong> {zahtev.imeLjubimca}</p>
                          <p><strong>Životinja:</strong> {zahtev.zivotinja}</p>
                          <p><strong>Usluga:</strong> {zahtev.ime_usluge}</p>
                          <p><strong>Cena zahteva:</strong> {zahtev.cena}</p>
                          <p><strong>Datum i vreme:</strong> {formatirajDatum(zahtev.datumVreme)}</p>
                          <p><strong>Status zahteva:</strong> {zahtev.status}</p>
                          <p><strong>Komentar salona:</strong> {zahtev.komentarSalona}</p>
                        </div>
                        <div className="card">
                          <p className="podaci-salona"><strong>Podaci salona:</strong></p>
                          <p><strong>Naziv salona:</strong> {zahtev.salon.naziv}</p>
                          <p><strong>Adresa salona:</strong> {zahtev.salon.adresa}</p>
                          <p><strong>Grad salona:</strong> {zahtev.salon.grad}</p>
                          <p><strong>Kontakt telefon salona:</strong> {zahtev.salon.brojTelefona}</p>
                        </div>
                      </div>
                      {zahtev.status == "Neobrađen" && <button className="obrisi-zahtev-button" onClick={() => handleDeleteZahtev(zahtev.id)}>Obriši zahtev</button>}
                      <hr /> {/* Linija na kraju zahteva */}

                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nema dostupnih zahteva.</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  } else {
    const role = vratiRole();
    if (role === 'Admin') return <Navigate to={{ pathname: '/admin' }} />;
    if (role === 'Salon') return <Navigate to={{ pathname: '/salon' }} />;
    return <Navigate to={{ pathname: '/prijava' }} />;
  }
};

export default Profil;


