import React, { useState, useEffect } from 'react';
import './Zahtev.css'
import api from '../Auth/Interceptor';
import { obavestenja } from '../UI/Obavestenja';

const Zahtev = ({ id }) => {
    const [imeLjubimca, setImeLjubimca] = useState('');
    const [zivotinja, setZivotinja] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [uslugaList, setUslugaList] = useState([]);
    const [selectedUslugaId, setSelectedUslugaId] = useState('');

    useEffect(() => {
        fetchUslugaList(id);
    }, [id]);

    // Fetch usluga list from server
    const fetchUslugaList = async (id) => {
        try {
            const response = await api.get(`/Usluga/VratiUslugeSalona/${id}`);
            const filteredUslugaList = response.data.filter(item => item.dostupnost === true);
            setUslugaList(filteredUslugaList);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imeLjubimca || !zivotinja || !selectedUslugaId || !selectedDate || !selectedTime) {
            obavestenja('Popunite sva polja!','danger');
            return;
        }

        try {
            const response = await api.post(
                `/Klijent/PosaljiZahtev/${imeLjubimca}/${zivotinja}/${id}/${selectedUslugaId}/${selectedDate}/${selectedTime}`,
                null
            );

            // Handle the response
            alert(response.data);

            // Reset form inputs
            setImeLjubimca('');
            setSelectedUslugaId('');
            setZivotinja('');
            setSelectedDate('');
            setSelectedTime('');
        } catch (error) {
            console.error('Error submitting the form:', error);
            if (error.response) {
                console.log('Error response:', error.response.data);
                // obavestenja(error.response.data,'danger');
            }
        }
    };


    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label>
                Ime ljubimca:
                <input
                    type="text"
                    value={imeLjubimca}
                    onChange={(e) => setImeLjubimca(e.target.value)}
                />
            </label>

            <label>
                Zivotinja:
                <select
                    value={zivotinja}
                    onChange={(e) => setZivotinja(e.target.value)}
                >
                    <option value="">-- Odaberite zivotinju --</option>
                    <option value="Pas">Pas</option>
                    <option value="Macka">Macka</option>
                    <option value="Kornjaca">Kornjaca</option>
                    <option value="Hrcak">Hrcak</option>
                    <option value="Kapibara">Kapibara</option>
                </select>
            </label>


            <label>
                Usluga:
                <select
                    value={selectedUslugaId}
                    onChange={(e) => setSelectedUslugaId(e.target.value)}
                >
                    <option value="">-- Odaberite uslugu --</option>
                    {uslugaList.map((usluga) => (
                        <option value={usluga.naziv} key={usluga.id}>
                            {usluga.naziv}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Datum:
                <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                >
                    <option value="">-- Odaberite datum --</option>
                    {/* Generate date options */}
                    {generateDateOptions().map((date) => (
                        <option value={date} key={date}>
                            {date}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                Vreme:
                <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                >
                    <option value="">-- Odaberite vreme --</option>
                    {/* Generate time options */}
                    {generateTimeOptions().map((time) => (
                        <option value={time} key={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </label>

            <button type="submit">Pošalji zahtev</button>
        </form>
    );
};

// Function to generate date options
const generateDateOptions = () => {
    const startDate = new Date('2023-05-12');
    const endDate = new Date('2023-05-19');
    const options = [];

    while (startDate <= endDate) {
        const date = startDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        options.push(date);
        startDate.setDate(startDate.getDate() + 1);
    }

    return options;
};

// Function to generate time options
const generateTimeOptions = () => {
    const startTime = new Date('1970-01-01T09:00:00');
    const endTime = new Date('1970-01-01T15:00:00');
    const options = [];

    while (startTime <= endTime) {
        const time = startTime.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
        });
        options.push(time);
        startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return options;
};

export default Zahtev;