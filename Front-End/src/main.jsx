import React from 'react'
import ReactDOM from 'react-dom/client'
import About from './lojaGeral.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teste from './teste.jsx';
import Item from './pgItem.jsx';
import PaginaInicial from './pgLogo.jsx'
import Search from './pgSearch.jsx';


export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<PaginaInicial />}/>
          <Route path="/lojaGeral" element={<About />}/>
          <Route path="/teste" element={<Teste />}/>
          <Route path="/busca" element={<Search />}/>
          <Route path="/produto/:id" element={<Item />}>
   
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
