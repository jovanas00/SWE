import React, { useState, useEffect} from "react";
import axios from "axios";
import Table  from "react-bootstrap/Table";
import Card from "../UI/Card";

const Usluge = ({id}) => {
    const [usluge, setUsluge] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5169/Usluga/VratiUslugeSalona/${id}`)
            .then((response) => {
                setUsluge(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        // <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px"}}>
        //     {usluge.map((usluga) => (
        //         <Card >
        //             <div>
        //                 <h3>Naziv: {usluga.naziv}</h3>
        //                 <p>Cena: {usluga.cena}</p>
        //                 <p>Opis: {usluga.opis}</p>
        //                 <p>Kapacitet: {usluga.kapacitet}</p>
        //                 <p>Dostupnost: {usluga.dostupnost? "DOSTUPNO" : "NIJE DOSTUPNO"}</p>
        //             </div>
        //         </Card> 
        //     ))}
        // </div>
        <div>
            {/* <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px"}}>
                <p style={{fontSize: "40px"}}><strong><u>Cenovnik</u></strong></p>
            </div> */}
            <div style={{marginRight: "20px"}}>
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Naziv</th>
                            <th>Cena(RSD)</th>
                            <th>Opis usluge</th>
                            <th>Kapacitet</th>
                            <th>Dostupnost</th>
                        </tr>
                    </thead>
                        <tbody>
                            {usluge.map((usluga) => (
                                <tr>
                                    <td>{usluga.naziv}</td>
                                    <td>{usluga.cena}</td>
                                    <td>{usluga.opis}</td>
                                    <td>{usluga.kapacitet}</td>
                                    <td>{usluga.dostupnost? "DOSTUPNO" : "NIJE DOSTUPNO"}</td>
                                </tr>
                            ))}
                        </tbody>
                </Table>
            </div>
        </div>
            
    );
};

export default Usluge;

