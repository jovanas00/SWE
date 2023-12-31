import React, { useState, useEffect } from "react";
import icon from "../../images/user.webp";
import Cookies from "js-cookie";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import ChangePasswordModal from "./PasswordChangeModal";
import UserInfoModal from "./UserInfoModal";
import UploadFile from "./Upload";
import api from "../Auth/Interceptor";

const Informacije = () => {
  const [userInfo, setUserInfo] = useState(null);
  const korisnicko_ime = vratiKorisnickoIme();
  const [showModal, setShowModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUploadFinished = (response) => {
    const { dbPath } = response;
    console.log(dbPath)
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      slika: `http://localhost:5169/${dbPath}`,
    })
    );
  };

  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const response = await api.get(`/Klijent/VratiKlijenta/${korisnicko_ime}`);
      const data = response.data;
      setUserInfo(data);
      console.log(response.data);
    } catch (error) {
      Cookies.remove('token');
      navigate('/prijava');
      console.error('Error fetching user info:', error);
    }
  };

  const handleCancelUserInfoChange = () => {
    setShowInfoModal(false);
  };

  return (
    <Card className="container-i">
      <div className="user-details">
        {userInfo && (
          <div>
            <img
              src={userInfo.slika ? userInfo.slika : icon}
              alt="User"
              className="image3"
            />
            <p><strong>Ime:</strong> {userInfo.ime}</p>
            <p><strong>Prezime:</strong> {userInfo.prezime}</p>
            <p><strong>Adresa:</strong> {userInfo.adresa}</p>
            <p><strong>Grad:</strong> {userInfo.grad}</p>
            <p><strong>Broj telefona:</strong> {userInfo.brojTelefona}</p>
          </div>
        )}
      </div>
      <div className="password-change">
        <button onClick={() => setShowModal(true)} className="button-primary">
          Promeni lozinku
        </button>
      </div>
      <ChangePasswordModal
        korisnicko_ime={korisnicko_ime}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button onClick={() => setShowInfoModal(true)} className="button-primary">
        Izmeni informacije
      </button>
      {showInfoModal && (
        <UserInfoModal userInfo={userInfo} onClose={handleCancelUserInfoChange} />
      )}
      <UploadFile onUploadFinished={handleUploadFinished} />
    </Card>
  );
};

export default Informacije;
