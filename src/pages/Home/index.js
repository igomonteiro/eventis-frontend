import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiSearch } from 'react-icons/fi';

import './styles.css';

export default function Home() {
  return <>
    <div className="wrapper">
      <div className="sidebar-menu">
        <div className="user-container">
          <div className="avatar"></div>
          <span>Olá, usuário.</span>
          <Link to="/register">
              <FiPower size={16} />
          </Link>
        </div>

        <hr></hr>
            
        <ul>
          <li><a href="/">Página inicial</a></li>
          <li><a href="/">Perfil</a></li>
          <li><a href="/">Cadastrar evento</a></li>
          <li><a href="/">Meus eventos</a></li>
          <li><a href="/">Meus eventos criados</a></li>
        </ul>
      </div>

      <div className="content">
        <div className="search-box">
          <input type="text" placeholder="Insira um ID" className="search-input"/>
          <FiSearch size={20} className="search-icon"/>
        </div>

        <div className="event">
          <ul>
            <li>
              <strong>Título do Evento</strong>
              <strong>Descrição: </strong>
              <p>Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Sed vel magna eget leo luctus aliquet</p>
              <strong>Data: </strong>
              <p>20/07/2020</p>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </>;
}