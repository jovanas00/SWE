import React, { useState } from "react";
import './SalonInfo.css';
import Proizvodi from "./Proizvodi";
import Usluge from "./Usluge";
import Odgovori from "./Odgovori";
import Recenzije from "./Recenzije";
import { vratiRole } from "../Auth/VratiRole";
import Zahtev from "./Zahtev";
import Korpa from "./Korpa"

const SalonInfo = ({ id }) => {
    const [selektovanaVr, setSelektovanaVr] = useState("Proizvodi");

    const handleVrClick = (vrednost) => {
        setSelektovanaVr(vrednost);
    };
    const role = vratiRole();
    const klijent = role === "Klijent" ? "Klijent" : null
    return (
        <div className="salon-items">
            <div className="span-header">
                <span
                    onClick={() => handleVrClick("Proizvodi")}
                    className={selektovanaVr === "Proizvodi" ? "selected" : ""}
                >Proizvodi</span>{" "}
                <span
                    onClick={() => handleVrClick("Usluge")}
                    className={selektovanaVr === "Usluge" ? "selected" : ""}
                >Usluge</span>{" "}
                <span
                    onClick={() => handleVrClick("Odgovori")}
                    className={selektovanaVr === "Odgovori" ? "selected" : ""}
                >Pitanja</span>{" "}
                <span
                    onClick={() => handleVrClick("Recenzije")}
                    className={selektovanaVr === "Recenzije" ? "selected" : ""}
                >Recenzije</span>
                {klijent && <span
                    onClick={() => handleVrClick("Zahtev")}
                    className={selektovanaVr === "Zahtev" ? "selected" : ""}
                >Zahtev</span>}
                {klijent && <span
                    onClick={() => handleVrClick("Korpa")}
                    className={selektovanaVr === "Korpa" ? "selected" : ""}
                >Korpa</span>}
            </div>

            <div className="items">
                {selektovanaVr === "Proizvodi" && <Proizvodi id={id} />}

                {selektovanaVr === "Usluge" && <Usluge id={id} />}

                {selektovanaVr === "Odgovori" && <Odgovori id={id} />}

                {selektovanaVr === "Recenzije" && <Recenzije id={id} />}

                {selektovanaVr === "Zahtev" && <Zahtev id={id}/>}

                {selektovanaVr === "Korpa" && <Korpa id={id}/>}
            </div>

        </div>
    );
};

export default SalonInfo;