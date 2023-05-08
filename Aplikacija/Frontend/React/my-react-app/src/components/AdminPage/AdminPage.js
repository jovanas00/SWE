import React, { useState, Component } from 'react';
import Header from '../Pocetna/Header';
import axios from 'axios';
import { isAdmin } from '../Auth/AuthAdmin';
import { Navigate } from 'react-router-dom';

const AdminPage = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [korisnicko_ime, setUsername] = useState('');
  const [ime, setFirstName] = useState('');
  const [prezime, setLastName] = useState('');
  const [file, setFile] = useState(null);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  // Funkcija za dodavanje kategorije preko Axios
  const addCategory = async (naziv) => {
    try {
      const response = await axios.post(`http://localhost:5169/Admin/DodajKategoriju/${naziv}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
    } catch (error) {
      console.error(error);
    }
  };

  // Funkcija za brisanje kategorije preko Axios
  const deleteCategory = async (id_kategorija) => {
    try {
      const response = await axios.post(`http://localhost:5169/Admin/ObrisiKategoriju/${id_kategorija}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
    } catch (error) {
      console.error(error);
    }
  };

  // Funkcija za brisanje korisnika preko Axios
  const deleteUser = async (korisnicko_ime) => {
    try {
      const response = await axios.delete(`http://localhost:5169/Admin/ObrisiKorisnika/${korisnicko_ime}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
    } catch (error) {
      console.error(error);
    }
  };

  // Funkcija za izmenu admina preko Axios
  const updateAdmin = async (korisnicko_ime, ime, prezime) => {
    try {
      const response = await axios.put(`http://localhost:5169/Admin/IzmeniAdmina/${korisnicko_ime}/${ime}/${prezime}`);
      console.log(response.data); // Ovde možete manipulisati odgovorom sa servera
    } catch (error) {
      console.error(error);
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
              <div>
                {/* Sadržaj za informacije o adminu */}
                <h2>Informacije o adminu</h2>
                {/* Dodajte sadržaj koji prikazuje informacije o adminu */}
                <p>Korisničko ime: {korisnicko_ime}</p>
                <p>Ime: {ime}</p>
                <p>Prezime: {prezime}</p>
                <button onClick={() => updateAdmin(korisnicko_ime, ime, prezime)}>Izmeni admina</button>
              </div>
            )}
            {selectedSection === 'user-management' && (
              <div>
                {/* Sadržaj za upravljanje korisnicima */}
                <h2>Upravljanje korisnicima</h2>
                {/* Dodajte sadržaj za upravljanje korisnicima */}
                <input type="text" value={korisnicko_ime} onChange={(e) => setUsername(e.target.value)} placeholder="Korisničko ime" />
                <button onClick={() => deleteUser(korisnicko_ime)}>Obriši korisnika</button>
              </div>
            )}
            {selectedSection === 'category-management' && (
              <div>
                {/* Sadržaj za upravljanje kategorijama */}
                <h2>Upravljanje kategorijama</h2>
                {/* Dodajte sadržaj za upravljanje kategorijama */}
                <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="Naziv kategorije" />
                <button onClick={() => addCategory(categoryName)}>Dodaj kategoriju</button>
                <input type="text" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} placeholder="ID kategorije" />
                <button onClick={() => deleteCategory(categoryId)}>Obriši kategoriju</button>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }
  else {
    return <Navigate to={{ pathname: '/prijava' }} />
  }
}

export default AdminPage;
