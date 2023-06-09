import React, { useState, useEffect } from "react";
import icon from "../../images/user.webp";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { Card } from "react-bootstrap";
import UploadFile from "../KlijentPage/Upload";
import api from "../Auth/Interceptor";
import ChangePasswordModal from "../KlijentPage/PasswordChangeModal";
import AdminInfoModal from "./AdminInfoModal";
import './Informacije.css';

const Informacije = () => {
  const [adminInfo, setAdminInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isAdminInfoLoaded, setIsAdminInfoLoaded] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    fetchAdminInfo();
    if (isAdminInfoLoaded) {
        setSelectedSection('admin-info');
    }
  }, [isAdminInfoLoaded]);

  const handleUploadFinished = (response) => {
    const { dbPath } = response;
    console.log(dbPath)
    setAdminInfo((prevAdminInfo) => ({
      ...prevAdminInfo,
      slika: `http://localhost:5169/${dbPath}`,
    })
    );
  };


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

  const handleCancelAdminInfoChange = () => {
    setShowInfoModal(false);
  };


  return (
    <main className="admin-main">
        {selectedSection === 'admin-info' && (
            <div className="admin-info1">
            <Card className="container-a">
            <div className="admin-info1">
                <div className="admin-info-details">
                  <h5 className="admin-info-label"></h5>
                  <img
                      src={adminInfo.korisnik?.slika ? adminInfo.korisnik.slika : icon}
                      alt="User"
                      className="image1"
                  />
                </div>
                <div className="admin-info-details">
                  <p><strong>Korisničko ime: </strong>{adminInfo.korisnik?.korisnickoIme}</p>
                  
                </div>
                <div className="admin-info-details">
                  <p><strong>Ime: </strong>{adminInfo.ime}</p>
                </div>
                <div className="admin-info-details1">
                  <p><strong>Prezime: </strong>{adminInfo.prezime}</p>
                </div>

            </div>
            <div className="password-change1">
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

    </main>
  );
};

export default Informacije;