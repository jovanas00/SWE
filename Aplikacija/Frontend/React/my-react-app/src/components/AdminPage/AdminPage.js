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
      alert("Uspešno dodata kategorija!");
    } catch (error) {
      handleError();
      alert("Greška pri dodavanju kategorije!");
    }
  };

  // Funkcija za brisanje kategorije preko Axios
  const deleteCategory = async (id_kategorija) => {
    try {
      const response = await api.post(`/Admin/ObrisiKategoriju/${id_kategorija}`);     
      fetchCategories(); // osvežava listu kategorija u prozoru
      alert("Uspešno obrisana kategorija!");
    } catch (error) {
      handleError();
      alert("Greška pri brisanju kategorije!");
    }
  };

  // Funkcija za brisanje korisnika preko Axios
  const deleteUser = async () => {
    try {
      const response = await api.delete(`/Admin/ObrisiKorisnika/${unosKorisnickogImena}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
  
      if (response.data == true) {
        alert('Korisnik je uspešno obrisan.');
      } else {
        alert('Korisnik nije pronađen. Navedite pravilno korisničko ime.');
      }
      fetchUsers(); // Ažuriranje liste korisnika nakon brisanja
    } catch (error) {
      alert('Greška prilikom brisanja korisnika');
      handleError();
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
        <div className="admin-content">
          <aside className="admin-sidebar">
            {/* Sidebar sa navigacijom */}
            <ul>
              <li onClick={() => handleSectionChange('admin-info')}>Profil admina</li>
              <li onClick={() => handleSectionChange('user-management')}>Upravljanje korisnicima</li>
              <li onClick={() => handleSectionChange('category-management')}>Upravljanje kategorijama</li>
            </ul>
          </aside>

          <main className="admin-main">
            {/* Prikaz odabrane sekcije */}
            {selectedSection === 'admin-info' && (
              <div className="admin-info">
                <Card className="container-a">
                  <div className="admin-info">
                    <h2>Profil admina</h2>
                    <div className="admin-info-details">
                      <h5 className="admin-info-label"></h5>
                      <img
                        src={adminInfo.korisnik?.slika ? adminInfo.korisnik.slika : icon}
                        alt="User"
                        className="image1"
                      />
                    </div>
                    <div className="admin-info-details">
                      <h5 className="admin-info-label">Korisničko ime:</h5>
                      <p>{adminInfo.korisnik?.korisnickoIme}</p>
                    </div>
                    <div className="admin-info-details">
                      <h5 className="admin-info-label">Ime:</h5>
                      <p>{adminInfo.ime}</p>
                    </div>
                    <div className="admin-info-details">
                      <h5 className="admin-info-label">Prezime:</h5>
                      <p>{adminInfo.prezime}</p>
                    </div>

                  </div>
                  <div className="password-change">
                    <button onClick={() => setShowModal(true)} className="button-primary">
                      Promeni lozinku
                    </button>
                  </div>
                  <ChangePasswordModal
                    korisnicko_ime={adminInfo.korisnik?.korisnickoIme}
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                  <button onClick={() => setShowInfoModal(true)} className="button-primary">
                    Izmeni informacije
                  </button>
                  {showInfoModal && (
                    <AdminInfoModal adminInfo={adminInfo} onClose={handleCancelAdminInfoChange} />
                  )}
                  <UploadFile onUploadFinished={handleUploadFinished} />
                </Card>
              </div>
            )}

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
                              <img src={user.slika ? user.slika : icon} alt="Profilna slika" />
                            ) : (
                              <img src={icon} alt="Ikona" />
                            )}
                          </div>
                          <p><strong>Korisničko ime:</strong> {user.korisnickoIme}</p>
                          <p><strong>Tip korisnika:</strong> {user.tip}</p>
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
                          <button className="povecaj-button" onClick={() => handleShowImage(user.slika)}>
                            Povećaj sliku
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