import React, { useState, useEffect } from 'react';
import Header from '../Pocetna/Header';
import axios from 'axios';
import './AdminPage.css';
import { isAdmin } from '../Auth/AuthAdmin';
import { vratiRole } from '../Auth/VratiRole';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [korisnickoIme, setKorisnickoIme] = useState('');
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTip, setSelectedTip] = useState('');
  const [unosKorisnickogImena, setUnosKorisnickogImena] = useState('');
  const [editIme, setEditIme] = useState(false);
  const [editPrezime, setEditPrezime] = useState(false);
  const [editMode, setEditMode] = useState(false);




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
    alert('Greška sa autorizacijom, ulogujte se!');
  };

  // Funkcija za dohvatanje informacija o adminu
  const fetchAdminInfo = async () => {
    try {
      const response = await axios.get('http://localhost:5169/Admin/SviAdmini', config);

      //const korIme = "admin2";
      const korIme = vratiKorisnickoIme();

      console.log(korIme); // pristupanje ulozi korisnika
      const adminInfo = response.data;

      // Pronalaženje odgovarajućeg admina na osnovu korisničkog imena iz tokena

      const admin = adminInfo.find(admin => admin.korisnik.korisnickoIme === korIme);

      if (admin) {
        setKorisnickoIme(admin.korisnik.korisnickoIme);
        setIme(admin.ime);
        setPrezime(admin.prezime);
      }
    } catch (error) {
      //handleError();
    }
  };


  //deo za polja za izmenu profila admina
  /*const handleEdit = (field) => {
    const newValue = prompt(`Unesite novu vrednost za ${field}:`);
    if (newValue !== null && newValue !== '') {
      // Ovde možete ažurirati stanje (state) ili poslati ažuriranje na server
      switch (field) {
        case 'korisnicko_ime':
          setKorisnickoIme(newValue);
          break;
        case 'ime':
          setIme(newValue);
          break;
        case 'prezime':
          setPrezime(newValue);
          break;
        default:
          break;
      }
    }
  };*/
  const handleEdit = (field) => {
    switch (field) {
      case 'ime':
        setEditIme(true);
        setEditMode(true);
        break;
      case 'prezime':
        setEditPrezime(true);
        setEditMode(true);
        break;
      default:
        break;
    }
  };
  /*const handleSave = () => {
    // Ovde možete implementirati logiku za slanje promena na server
    setEditKorisnickoIme(false);
    setEditIme(false);
    setEditPrezime(false);
  };*/

  const handleSave = () => {
    // Pozovite funkciju updateAdmin sa ažuriranim podacima
    updateAdmin(korisnickoIme, ime, prezime);

    // Vratite režim izmena na početnu vrednost
    setEditMode(false);
  };

  const handleCancel = () => {
    //osvežava stranicu..
    window.location.reload()

    // Vratite režim izmena na početnu vrednost
    setEditMode(false);


  };


  //Funkcija za prikaz svih kategorija preko Axios
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5169/Admin/SveKategorije', config);
      setCategories(response.data); // Postavljanje podataka o kategorijama u state
    } catch (error) {
      handleError();
    }
  };



  // Funkcija za dodavanje kategorije preko Axios
  const addCategory = async (naziv) => {
    try {
      const response = await axios.post(`http://localhost:5169/Admin/DodajKategoriju/${naziv}`, null, config);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
      fetchCategories(); // osvežava lsitu kategorija u prozoru
    } catch (error) {
      handleError();
    }
  };

  // Funkcija za brisanje kategorije preko Axios
  const deleteCategory = async (id_kategorija) => {
    try {
      const response = await axios.post(`http://localhost:5169/Admin/ObrisiKategoriju/${id_kategorija}`, null, config);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
      fetchCategories(); // osvežava lsitu kategorija u prozoru
    } catch (error) {
      handleError();
    }
  };

  // Funkcija za brisanje korisnika preko Axios
  const deleteUser = async () => {
    try {
      const response = await axios.delete(`http://localhost:5169/Admin/ObrisiKorisnika/${unosKorisnickogImena}`, config);
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

  // Funkcija za izmenu admina preko Axios
  const updateAdmin = async (korisnicko_ime, ime, prezime) => {
    try {
      const response = await axios.put(`http://localhost:5169/Admin/IzmeniAdmina/${korisnicko_ime}/${ime}/${prezime}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
      alert("Uspešno promenjeni podaci admina");
      window.location.reload();
    } catch (error) {
      //handleError();
    }
  };

  // Funkcija za upload preko Axios
  const uploadFile = async (korisnicko_ime, file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post(`http://localhost:5169/Korisnik/Upload/${korisnicko_ime}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
    } catch (error) {
      console.error(error);
    }
  };

  // Funkcija za prikaz svih korisnika preko Axios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5169/Korisnik/PrikaziKorisnike', config);
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
  }, []);

  if (isAdmin()) {
    return (
      <div className="admin-page">
        <Header />
        <div className="admin-content">
          <aside className="admin-sidebar">
            {/* Sidebar sa navigacijom */}
            <ul>
              <li onClick={() => handleSectionChange('admin-info')}>Informacije o adminu</li>
              <li onClick={() => handleSectionChange('user-management')}>Upravljanje korisnicima</li>
              <li onClick={() => handleSectionChange('category-management')}>Upravljanje kategorijama</li>
            </ul>
          </aside>

          <main className="admin-main">
            {/* Prikaz odabrane sekcije */}
            {selectedSection === 'admin-info' && (
              <div className="admin-info">
                {/* Sadržaj za informacije o adminu */}
                <h2>Informacije o adminu</h2>
                <h6>Ovde možete promeniti ime i prezime admina:</h6>
                <div className="admin-info-details">
                  <h5 className="admin-info-label">Korisničko ime:</h5>
                  <p>{korisnickoIme}</p>
                </div>

                <div className="admin-info-details">
                  <h5 className="admin-info-label">Ime:</h5>
                  {editIme ? (
                    <div className="admin-info-edit">
                      <input
                        type="text"
                        value={ime}
                        onChange={(e) => setIme(e.target.value)}
                      />
                      <button onClick={() => handleSave('ime')}>Sačuvaj</button>
                      <button onClick={() => handleCancel('ime')}>Odustani</button>
                    </div>
                  ) : (
                    <p>
                      {ime} <button onClick={() => handleEdit('ime')}>Izmeni</button>
                    </p>
                  )}
                </div>

                <div className="admin-info-details">
                  <h5 className="admin-info-label">Prezime:</h5>
                  {editPrezime ? (
                    <div className="admin-info-edit">
                      <input
                        type="text"
                        value={prezime}
                        onChange={(e) => setPrezime(e.target.value)}
                      />
                      <button onClick={() => handleSave('prezime')}>Sačuvaj</button>
                      <button onClick={() => handleCancel('prezime')}>Odustani</button>
                    </div>
                  ) : (
                    <p>
                      {prezime} <button onClick={() => handleEdit('prezime')}>Izmeni</button>
                    </p>
                  )}
                </div>
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
                    <option value="Admin">Admin</option>
                    <option value="Klijent">Klijent</option>
                    <option value="Salon">Salon</option>
                  </select>
                </div>
                {/* Prikaz podataka o korisnicima */}
                <div className="user-list">
                  <ul>
                    {users
                      .filter((user) => selectedTip === '' || user.tip === selectedTip)
                      .map((user) => (
                        <li key={user.id}>
                          <p>Korisničko ime: {user.korisnickoIme}</p>
                          <p>Tip korisnika: {user.tip}</p>
                          <p>Slika: {user.slika}</p>
                        </li>
                      ))}
                  </ul>
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
                  <button onClick={() => addCategory(categoryName)}> Dodaj </button>
                </div>
                <h5>Obriši kategoriju:</h5>
                <div className="input-container">
                  <input
                    type="text"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    placeholder="ID kategorije"
                  />
                  <button onClick={() => deleteCategory(categoryId)}> Obriši </button>
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