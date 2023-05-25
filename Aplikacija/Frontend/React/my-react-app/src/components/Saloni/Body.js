// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Body.css';

// const Body = () => {
//   const [saloni, setSaloni] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:3000/salon')
//       .then(res => {
//         setSaloni(res.data);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }, []);

//   return (
//     <div className="saloni-container">
//       <h1>Saloni</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Naziv</th>
//             <th>Adresa</th>
//             <th>Grad</th>
//             <th>Broj telefona</th>
//           </tr>
//         </thead>
//         <tbody>
//           {saloni.map(salon => (
//             <tr key={salon._id}>
//               <td>{salon.name}</td>
//               <td>{salon.address}</td>
//               <td>{salon.city}</td>
//               <td>{salon.phone}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Body;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SalonCard from './SalonCard';
import { vratiRole } from '../Auth/VratiRole';
import "./Body.css"

const Body = () => {
  const [saloni, setSaloni] = useState([]);
  const [selektovaniGrad, setSelektovaniGrad] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5169/Salon/VratiSveSalone")
      .then((response) => {
        setSaloni(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredSaloni = selektovaniGrad
    ? saloni.filter(
      (salon) =>
        salon.grad === selektovaniGrad &&
        salon.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : saloni.filter((salon) =>
      salon.naziv.toLowerCase().includes(searchTerm.toLowerCase())
    );
  const gradovi = [...new Set(saloni.map((salon) => salon.grad))];

  const role = vratiRole();
  const klijent = role === "Klijent" ? "Klijent" : null;
  const admin = role === "Admin" ? "Admin" : null;

  return (
    <div className="container">
      <div className="filter-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pretrazite salone..."
          className="input_salon"
        />
        <select
          className="filter-select"
          value={selektovaniGrad}
          onChange={(e) => setSelektovaniGrad(e.target.value)}
        >
          <option value="">Svi gradovi</option>
          {gradovi.map((grad) => (
            <option key={grad} value={grad}>
              {grad}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        {filteredSaloni.map((salon) => (
          <div className="col-lg-4 col-md-6 col-12 mb-3">
            {!klijent && !admin && (
              <Link to={`/saloni/${salon.id}`} key={salon.id}>
                <SalonCard salon={salon} slika={salon.slika} />
              </Link>
            )}
            {klijent && (
              <Link to={`/klijent/${salon.id}`} key={salon.id}>
                <SalonCard salon={salon} slika={salon.slika} />
              </Link>
            )}
            {admin && (
              <Link to={`/admin/saloni/${salon.id}`} key={salon.id}>
                <SalonCard salon={salon} slika={salon.slika} />
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
