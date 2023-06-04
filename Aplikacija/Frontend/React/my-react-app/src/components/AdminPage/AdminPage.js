import React, { useState, useEffect, useRef } from 'react';
import Header from '../Pocetna/Header';
import axios from 'axios';
import './AdminPage.css';
import { isAdmin } from '../Auth/AuthAdmin';
import { vratiRole } from '../Auth/VratiRole';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import { Navigate } from 'react-router-dom';
import { Card } from "react-bootstrap";
import icon from "../../images/user.webp";
import Cookies from 'js-cookie';
import UploadFile from "../KlijentPage/Upload";
import ChangePasswordModal from "../KlijentPage/PasswordChangeModal";
import AdminInfoModal from "./AdminInfoModal";
import TokenChecker from '../Auth/TokenChecker';
import api from '../Auth/Interceptor';
import { obavestenja } from '../UI/Obavestenja';
import Informacije from './Informacije';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTip, setSelectedTip] = useState('');
  const [unosKorisnickogImena, setUnosKorisnickogImena] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [isAdminInfoLoaded, setIsAdminInfoLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  // Autorizacija
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleError = () => {
    window.location.reload();
  };

  // Funkcija za dohvatanje informacija o adminu
  const fetchAdminInfo = async () => {
    try {
      const response = await api.get('/Admin/SviAdmini');
      const korIme = vratiKorisnickoIme();
      const adminInfo = response.data;
      const admin = adminInfo.find((admin) => admin.korisnik.korisnickoIme === korIme);
      if (admin) {
        setAdminInfo(admin);
        setIsAdminInfoLoaded(true);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleUploadFinished = (response) => {
    const { dbPath } = response;
    console.log(dbPath)
    setAdminInfo((prevAdminInfo) => ({
      ...prevAdminInfo,
      slika: `http://localhost:5169/${dbPath}`,
    })
    );
  };


  const handleCancelAdminInfoChange = () => {
    setShowInfoModal(false);
  };

  const handleShowImage = (imagePath) => {
    setSelectedImage(imagePath);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  //Funkcija za prikaz svih kategorija preko Axios
  const fetchCategories = async () => {
    try {
      const response = await api.get('/Admin/SveKategorije');
      setCategories(response.data); // Postavljanje podataka o kategorijama u state
    } catch (error) {
      handleError();
    }
  };

  // Funkcija za dodavanje kategorije preko Axios
  const addCategory = async (naziv) => {
    try {
      const response = await api.post(`/Admin/DodajKategoriju/${naziv}`);
      fetchCategories(); // osvežava listu kategorija u prozoru
      obavestenja("Uspešno dodata kategorija!", "success");
    } catch (error) {
      obavestenja("Greška pri dodavanju kategorije!", "danger");
    }
  };

  // Funkcija za brisanje kategorije preko Axios
  const deleteCategory = async (id_kategorija) => {
    try {
      const response = await api.post(`/Admin/ObrisiKategoriju/${id_kategorija}`);
      fetchCategories(); // osvežava listu kategorija u prozoru
      obavestenja("Uspešno obrisana kategorija!", "success");
    } catch (error) {
      obavestenja("Greška pri brisanju kategorije!", "danger");
    }
  };

  // Funkcija za brisanje korisnika preko Axios
  const deleteUser = async () => {
    try {
      const response = await api.delete(`/Admin/ObrisiKorisnika/${unosKorisnickogImena}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera

      if (response.data == true) {
        obavestenja("Korisnik je uspešno obrisan.", "success");
      } else {
        obavestenja("Korisnik nije pronađen. Navedite pravilno korisničko ime.", "danger");
      }
      fetchUsers(); // Ažuriranje liste korisnika nakon brisanja
    } catch (error) {
      obavestenja("Greška prilikom brisanja korisnika, proverite da li ste uneli korisničko ime!", "danger");
    }
  };


  // Funkcija za prikaz svih korisnika preko Axios
  const fetchUsers = async () => {
    try {
      const response = await api.get('/Korisnik/PrikaziKorisnike');
      setUsers(response.data); // Postavljanje podataka o korisnicima u state
    } catch (error) {
      //handleError();
    }
  };

  useEffect(() => {
    if (isAdmin()) {
      // Pozivamo funkciju za dohvatanje korisnika pri prvom renderovanju komponente
      fetchUsers();
      // Dohvatamo informacije o adminu
      fetchAdminInfo();
      fetchCategories();
    }
    if (isAdminInfoLoaded) {
      setSelectedSection('admin-info');
    }
  }, [isAdminInfoLoaded]);

  if (isAdmin()) {
    return (
      <div className="admin-page">
        <TokenChecker />
        <Header />
        <Informacije />
        <div className="admin-content">
          <aside className="admin-sidebar">
            {/* Sidebar sa navigacijom */}
            <ul>
              <li onClick={() => handleSectionChange('user-management')}>Upravljanje korisnicima</li>
              <li onClick={() => handleSectionChange('category-management')}>Upravljanje kategorijama</li>
            </ul>
          </aside>

          <main className="admin-main">

            {selectedSection === 'user-management' && (
              <div>
                {/* Sadržaj za upravljanje korisnicima */}
                <h2>Upravljanje korisnicima</h2>
                <h5>Brisanje korisnika:</h5>
                {/* Dodajte sadržaj za upravljanje korisnicima */}
                <div className="input-container">
                  <input
                    type="text"
                    value={unosKorisnickogImena}
                    onChange={(e) => setUnosKorisnickogImena(e.target.value)}
                    placeholder="Korisničko ime"
                  />

                  <button className="delete-user-button" onClick={() => deleteUser()}>
                    Obriši
                  </button>
                </div>
                {/* Padajuća lista za filtriranje */}
                <div className="filter-dropdown">
                  <label htmlFor="tip-filter">Filtriraj po tipu: </label>
                  <select id="tip-filter" value={selectedTip} onChange={(e) => setSelectedTip(e.target.value)}>
                    <option value="">Svi</option>
                    <option value="Klijent">Klijent</option>
                    <option value="Salon">Salon</option>
                  </select>
                </div>
                {/* Prikaz podataka o korisnicima */}
                <div className="user-list">
                  <div className="user-container">
                    {users
                      .filter((user) => selectedTip === '' || user.tip === selectedTip)
                      .filter((user) => user.tip !== 'Admin')
                      .map((user) => (
                        <div key={user.id} className="user-card">
                          <div className="profile-picture">
                            {user.slika ? (
                              <img
                                src={user.slika ? user.slika : icon}
                                alt="Profilna slika"
                                onClick={() => handleShowImage(user.slika)}
                              />

                            ) : (
                              <img src={icon} alt="Ikona" onClick={() => handleShowImage(user.slika)} />
                            )}
                          </div>
                          <p><strong>Korisničko ime:</strong> {user.korisnickoIme}</p>
                          <p><strong>Tip korisnika:</strong> {user.tip}</p>
                          <p><strong>Email:</strong> {user.email}</p>
                          {selectedImage === user.slika && isModalOpen && (
                            <div className="modal">
                              <div className="modal-overlay" onClick={handleCloseModal} />
                              <div className="modal-content">
                                {user.slika ? (
                                  <img src={user.slika} alt="Profilna slika" className="image2" />
                                ) : (
                                  <img src={icon} alt="Ikona" className="image2" />
                                )}
                                <button className="close-button" onClick={handleCloseModal}>
                                  Zatvori
                                </button>
                              </div>
                            </div>
                          )}
                          {modalOpen && (
                            <div className="modal">
                              <div className="modal-content">
                                <span className="close" onClick={() => setModalOpen(false)}>
                                  &times;
                                </span>
                                <h2>Podaci korisnika:</h2>
                                {selectedUser && (
                                  <div>
                                    {selectedUser.tip === "Salon" && (
                                      <div>
                                        <p><strong>Naziv salona: </strong>{selectedUser.naziv}</p>
                                        <p><strong>Adresa salona: </strong>{selectedUser.adresa}</p>
                                        <p><strong>Grad: </strong>{selectedUser.grad}</p>
                                        <p><strong>Kontakt telefon: </strong>{selectedUser.brojTelefona}</p>
                                      </div>
                                    )}
                                    {selectedUser.tip === "Klijent" && (
                                      <div>
                                        <p><strong>Ime klijenta: </strong>{selectedUser.ime}</p>
                                        <p><strong>Prezime klijenta: </strong>{selectedUser.prezime}</p>
                                        <p><strong>Adresa: </strong>{selectedUser.adresa}</p>
                                        <p><strong>Grad: </strong>{selectedUser.grad}</p>
                                        <p><strong>Kontakt telefon: </strong>{selectedUser.brojTelefona}</p>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          <button className="dodatneInformacije-button" onClick={() => handleOpenModal(user)}>
                            Dodatne informacije
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {selectedSection === 'category-management' && (
              <div>
                {/* Sadržaj za upravljanje kategorijama */}
                <h2>Upravljanje kategorijama</h2>
                <h5>Dodaj kategoriju:</h5>
                {/* Dodajte sadržaj za upravljanje kategorijama */}
                <div className="input-container">
                  <input
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Naziv kategorije"
                  />
                  <button
                    onClick={() => {
                      addCategory(categoryName);
                      setCategoryName(""); // Očisti polje za unos
                    }}
                  >
                    Dodaj
                  </button>
                </div>
                <h5>Obriši kategoriju:</h5>
                <div className="input-container">
                  <input
                    type="text"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    placeholder="ID kategorije"
                  />
                  <button
                    onClick={() => {
                      deleteCategory(categoryId);
                      setCategoryId(""); // Očisti polje za unos
                    }}
                  >
                    Obriši
                  </button>
                </div>
                <h5>Sve kategorije:</h5>
                <div className="scrollable-window">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Pretraži kategorije po nazivu"
                  />
                  <ul className="category-list">
                    {categories
                      .filter((category) => category.naziv.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((category) => (
                        <li key={category.id}>
                          <span>ID: {category.id}</span>
                          <span>Naziv: {category.naziv}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  } else {
    const role = vratiRole();
    if (role === 'Klijent') return <Navigate to={{ pathname: '/klijent' }} />;
    if (role === 'Salon') return <Navigate to={{ pathname: '/salon' }} />;
    return <Navigate to={{ pathname: '/prijava' }} />;
  }
};

export default AdminPage;