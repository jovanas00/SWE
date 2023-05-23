import React, { useState, useEffect } from 'react';
import { isSalon } from '../Auth/AuthSalon';
import { Navigate } from 'react-router-dom';
import { vratiRole } from '../Auth/VratiRole';
import Header from '../Pocetna/Header';
import './SalonUpravljanje.css';
import Proizvodi from '../Saloni/Proizvodi';
import Usluge from '../Saloni/Usluge';
import Odgovori from '../Saloni/Odgovori';
import Recenzije from '../Saloni/Recenzije';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { vratiKorisnickoIme } from "../Auth/VratIKorisnickoIme";
import Zahtevi from './Zahtevi';
import Narudzbine from './Narudzbine';
import TokenChecker from '../Auth/TokenChecker';
import api from '../Auth/Interceptor';

const SalonUpravljanje = () => {
    const korisnicko_ime = vratiKorisnickoIme();
    const [salon, setSalon] = useState(null);
    const [salonId, setSalonId] = useState(null);

    const [selectedSection, setSelectedSection] = useState(null);

    const handleSectionChange = (section) => {
        setSelectedSection(section);
    };

    useEffect(() => {
        fetchSalon();
    }, []);
    const navigate = useNavigate();

    const fetchSalon = async () => {
        try {
            const response = await api.get(`/Salon/VratiSalonPrekoKI/${korisnicko_ime}`);
            const data = response.data.salonId;
            setSalonId(data);
        } catch (error) {
            Cookies.remove('token');
            navigate('/prijava');
    
            console.error('Error fetching user info:', error);
        }
    };

    if (isSalon()) {

        return (
            <div>
                <Header />
                <TokenChecker/>
                <div className='salon-page'>
                    <aside className='salon-sidebar'>
                        <ul>
                            <li onClick={() => handleSectionChange('products-management')}>Proizvodi</li>
                            <li onClick={() => handleSectionChange('services-management')}>Usluge</li>
                            <li onClick={() => handleSectionChange('questions-management')}>Pitanja</li>
                            <li onClick={() => handleSectionChange('reviews-management')}>Recenzije</li>
                            <li onClick={() => handleSectionChange('requests-management')}>Zahtevi</li>
                            <li onClick={() => handleSectionChange('orders-management')}>Narudzbine</li>
                        </ul>
                    </aside>

                    <main className='salon-main'>
                        {selectedSection === 'products-management' && <Proizvodi id={salonId}/>}

                        {selectedSection === 'services-management' && <Usluge id={salonId}/>}

                        {selectedSection === 'questions-management' && <Odgovori id={salonId}/>}

                        {selectedSection === 'reviews-management' && <Recenzije id={salonId}/>}

                        {selectedSection === 'requests-management' && <Zahtevi />}

                        {selectedSection === 'orders-management'&& <Narudzbine /> }
                    </main>
                </div>

            </div>
        );
    }
    else {
        const role = vratiRole();
        if (role === "Admin")
            return <Navigate to={{ pathname: '/admin' }} />
        if (role === "Klijent")
            return <Navigate to={{ pathname: '/klijent' }} />
        return <Navigate to={{ pathname: '/prijava' }} />
    }
};

export default SalonUpravljanje;