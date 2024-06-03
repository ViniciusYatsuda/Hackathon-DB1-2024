import React from 'react'
import ReactDOM from 'react-dom/client'
import About from './lojaGeral.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Item from './pgItem.jsx';
import PaginaInicial from './pgLogo.jsx'
import Search from './pgSearch.jsx';
import Fav from './pgFav.jsx';


export default function Apps() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="" element={<PaginaInicial />}/>
          <Route path="/lojaGeral" element={<About />}/>
          <Route path="/fav" element={<Fav />}/>
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
