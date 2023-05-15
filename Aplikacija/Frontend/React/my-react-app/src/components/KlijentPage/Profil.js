import React, { useEffect, useState } from 'react';
import { isKlijent } from '../Auth/AuthKlijent';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import axios from 'axios';
import Header from '../Pocetna/Header';
import Informacije from './Informacije';
import './Profil.css';
import Cookies from 'js-cookie';


const Profil = () => {
  const [narudzbine, setNarudzbine] = useState([]);
  const [prikazNarudzbina, setPrikazNarudzbina] = useState(true);
  const [zahtevi, setZahtevi] = useState([]);
  const [proizvodi, setProizvodi] = useState([]);


  // Autorizacija
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const korisnickoIme = vratiKorisnickoIme();

  const handleDeleteZahtev = async (idZahteva) => {
    try {
      await axios.delete(`http://localhost:5169/Klijent/ObrisiZahtev/${idZahteva}`,{config});
      // Zahtev je uspešno obrisan, možete ažurirati listu zahteva ako je potrebno
      alert("Uspešno ste obrisali zahtev!");
      const updatedZahtevi = zahtevi.filter(zahtev => zahtev.id !== idZahteva)
      setZahtevi(updatedZahtevi);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Zahtev je obradjen,nije moguce obrisati ga!");
      } else {
        alert("Greska prilikom brisanja!");
      }
      // Došlo je do greške prilikom brisanja zahteva, možete prikazati odgovarajuću poruku ili preduzeti druge akcije
    }
  };

  const handleFetchProizvodi = async (idNarudzbine) => {
    try {
      const response = await axios.get(`http://localhost:5169/Klijent/VratiProizvodeNarudzbina/${idNarudzbine}`);
      const proizvodiNarudzbine = response.data;
      const updatedNarudzbine = narudzbine.map((narudzbina) => {
        if (narudzbina.id === idNarudzbine) {
          return {
            ...narudzbina,
            proizvodi: proizvodiNarudzbine,
          };
        }
        return narudzbina;
      });
      setNarudzbine(updatedNarudzbine);
    } catch (error) {
      console.error(error);
    }
  };




  useEffect(() => {
    if (isKlijent()) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5169/Klijent/PrikaziNarudzbineISalone/${korisnickoIme}`);
          setNarudzbine(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchZahtevi = async () => {
        try {
          const zahteviResponse = await axios.get(`http://localhost:5169/Klijent/PrikaziZahteveISalone/${korisnickoIme}`);
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
        <Header />
        <Informacije />
        <div className="button-list">
          <button onClick={handleNarudzbineClick}>Narudžbine</button>
          <button onClick={handleZahteviClick}>Zahtevi</button>
        </div>
        <div className="content"></div>
        <div className="narudzbine-container">
          {prikazNarudzbina ? (
            <>
              <h5 style={{ marginLeft: '14px' }}>Informacije o narudžbinama:</h5>
              {narudzbine.length > 0 ? (
                <ul>
                  {narudzbine.map((narudzbina, index) => (
                    <li key={narudzbina.id}>
                      <p className="narudzbina-brojac">Narudžbina {index + 1}.</p>
                      <p>Status narudžbine: {narudzbina.status}</p>
                      <p>Komentar salona: {narudzbina.komentarSalona}</p>
                      <p>Ukupna cena: {narudzbina.ukupnaCena}</p>
                      <p>Datum: {narudzbina.datumVreme}</p>
                      <p><strong>Vaši podaci:</strong></p>
                      <p>Korisničko ime: {narudzbina.korisnickoIme}</p>
                      <p>Grad klijenta: {narudzbina.grad}</p>
                      <p>Adresa klijenta: {narudzbina.adresa}</p>
                      <p><strong>Podaci salona:</strong></p>
                      <p>Naziv salona: {narudzbina.salon.naziv}</p>
                      <p>Adresa salona: {narudzbina.salon.adresa}</p>
                      <p>Grad salona: {narudzbina.salon.grad}</p>
                      <p>Broj telefona salona: {narudzbina.salon.brojTelefona}</p>
                      <button className="sviProizvodi-button" onClick={() => handleFetchProizvodi(narudzbina.id)}>Svi proizvodi</button>

                      {narudzbina.proizvodi && narudzbina.proizvodi.length > 0 && (
                        <div className="proizvodi-container">
                          <h5>Svi proizvodi:</h5>
                          <ul>
                            {narudzbina.proizvodi.map((proizvod, index2) => (
                              <li key={index2}>
                                <p className="proizvodi-brojac">Proizvod {index2 + 1}.</p>
                                <p>Naziv proizvoda: {proizvod.nazivProizvoda}</p>
                                <p>Slika proizvoda: {proizvod.slikaProizvoda}</p>
                                <p>Količina: {proizvod.kolicina}</p>
                              </li>
                            ))}
                          </ul>
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
              <h5 style={{ marginLeft: '14px' }}>Informacije o zahtevima:</h5>
              {zahtevi.length > 0 ? (
                <ul>
                  {zahtevi.map((zahtev, index) => (
                    <li key={zahtev.id}>
                      <p className="zahtev-brojac">Zahtev {index + 1}.</p>
                      <p>Ime ljubimca: {zahtev.imeLjubimca}</p>
                      <p>Životinja: {zahtev.zivotinja}</p>
                      <p>Cena zahteva: {zahtev.cena}</p>
                      <p>Datum i vreme: {zahtev.datumVreme}</p>
                      <p>Status zahteva: {zahtev.status}</p>
                      <p>Komentar salona: {zahtev.komentarSalona}</p>
                      <p><strong>Podaci salona:</strong></p>
                      <p>Naziv salona: {zahtev.salon.naziv}</p>
                      <p>Adresa salona: {zahtev.salon.adresa}</p>
                      <p>Grad salona: {zahtev.salon.grad}</p>
                      <p>Kontakt telefon salona: {zahtev.salon.brojTelefona}</p>
                      <button className="obrisi-zahtev-button" onClick={() => handleDeleteZahtev(zahtev.id)}>Obriši zahtev</button>
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


