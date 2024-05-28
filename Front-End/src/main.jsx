import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pgInicial.jsx'
import About from './lojaGeral.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css'
import Teste from './teste.jsx';

export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<App />}/>
          <Route path="/paginaInicial" element={<About />}/>
          <Route path="/teste" element={<Teste />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Apps />
  </React.StrictMode>,
)
