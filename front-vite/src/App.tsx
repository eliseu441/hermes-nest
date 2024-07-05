import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
//import viteLogo from '/vite.svg'
import 'react-widgets/scss/styles.scss';
import './sass/style.scss';
import "bootstrap-icons/font/bootstrap-icons.css";
import Aos from 'aos';
import 'aos/dist/aos.css';
import HomePage from './pages/HomePage/HomePage.tsx'
import Paintings from './pages/Paintings/Paintings.tsx'
//import SculpPage from './pages/SculpPage/SculpPage.jsx';
//import BuildingsPage from './pages/BuildingsPage/BuildingsPage.jsx'

function App() {

  useEffect(() => {
    Aos.init({ once: true });
  }, []);

  return (

    <HashRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/paintings" element={<Paintings />} />
      </Routes>
    </HashRouter>
  )
}

export default App
