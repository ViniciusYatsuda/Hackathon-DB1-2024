//Pagina Inicial onde temos o logo do projeto para ser clicado e ir para a loja.

import NetXoes from "../img/NetXoes.png"
import './css/App.css'
import './css/reset.css'
import { Link } from "react-router-dom"

function PaginaInicial() {
  return (
    <>
      <div className="slide-up">
        <a  target="_blank">
          <Link to='/lojaGeral'>
            <img src={NetXoes} className="logo react" alt="React logo" />
          </Link>
        </a>
      </div>      
    </>
  )
}

export default PaginaInicial
