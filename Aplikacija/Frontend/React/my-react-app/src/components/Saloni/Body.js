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

const Body = () => {
  const [saloni, setSaloni] = useState([]); //saloni se inicijalizuje se na prazan niz
  //za filter
  const [selektovaniGrad, setSelektovaniGrad] = useState("");

  useEffect(() => { //pravimo http get zahtev na navedenu adresu 
    axios.get('http://localhost:5079/Salon/VratiSveSalone') //axios je bibilioteka koja se koristi da se odradi taj zahtev
      .then(response => { //kad se dobije odgovor setujemo novu vrednost saloni promenljive
        setSaloni(response.data);
      })
      .catch(error => { //u slucaju da se javi greska kod http zahteva
        console.log(error); //prikaz greske 
      });
  }, []); //useEffect zahteva 2 argumenta, prvi argument je ovaj http zahtev,
  //drugi argument je [] i time naglasavamo da ce axios zahtev da se izvrsi samo jednom

  //filtriraju se po gradu
  const filtriraniSaloni = selektovaniGrad ? saloni.filter(salon => salon.grad === selektovaniGrad) : saloni;
  const gradovi = [...new Set(saloni.map(salon => salon.grad))];//uzimamo sve gradove koje postoje, ali necemo da se ponavljaju pa koristimo set

  return (
    <div className="container">
      {/* za filter */}
      <select value={selektovaniGrad} onChange={e => setSelektovaniGrad(e.target.value)}>
        <option value="">Svi gradovi</option> {/*pravimo selektor i vrednosti su gradovi*/}
        {gradovi.map(grad => (
          <option key={grad} value={grad}>
            {grad}
          </option>
        ))}
      </select>
      <div className="row">
        {/*saloni je niz pa mozemo da primenimo map funkciju, fja se primanjuje nad svakim elementom niza*/}
        {/*tj za svaki salon se pravi Salon kartica*/}
        {/*col-md-4 mb-3 samo se koristi bootstrap klasa za definisanje prostora izmedju karitca i kolko kartica ima u jednom redu*/}
        {filtriraniSaloni.map(salon => (
          <div className="col-md-4 mb-3">  {/*treba jos da se cacka ovaj prikaz nije flex*/}
            {/* {console.error(salon.id)} */}
            {/*Link sluzi da svaka Salon kartica moze da se otvori na novu stranu gde ce se detaljno citati o salonima*/}
            <Link to={`/saloni/${salon.id}`} key={salon.id} >
              <SalonCard salon={salon} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

};

export default Body;