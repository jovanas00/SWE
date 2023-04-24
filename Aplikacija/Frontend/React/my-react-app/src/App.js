import { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Pocetna/Header';
import Slider from './components/Pocetna/Slider';
import { BrowserRouter } from 'react-router-dom';
import Pocetna from './components/Pocetna/Pocetna';

function App() {
  return (
    <Fragment>
      <Pocetna/>
    </Fragment>
    // <BrowserRouter>
    //   <Fragment>
    //     <Header/>
    //     <Slider/>
    //   </Fragment>
    // </BrowserRouter>
    
  );
}

export default App;
