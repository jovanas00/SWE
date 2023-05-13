import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { vratiKorisnickoIme } from '../Auth/VratIKorisnickoIme';
import { isKlijent } from '../Auth/AuthKlijent';
import { vratiRole } from '../Auth/VratiRole';

const Korpa = ({ setKorpaId }) => {
    const [korpaId, setKorpaIdState] = useState(null);
    const korisnicko_ime = vratiKorisnickoIme();
    const uloga = vratiRole()
    const klijent = uloga === "Klijent" ? "Klijent" : null;

    useEffect(() => {
        const fetchKorpaId = async () => {
            try {
                const token = Cookies.get('token'); // Retrieve the token from the cookie
                
                if (klijent) {
                    const response = await axios.get(
                        `http://localhost:5169/Klijent/VratiKorpuID/${korisnicko_ime}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`, // Include the token in the request headers
                            },
                        }
                    );

                    const korpaId = response.data;
                    setKorpaIdState(korpaId);
                    setKorpaId(korpaId); // Pass the korpaId to the parent component
                }
            } catch (error) {
                console.error('Error retrieving Korpa ID:', error);
            }
        };

        fetchKorpaId();
    }, [korisnicko_ime, setKorpaId]);

    return <div>
    </div>;
};

export default Korpa;
