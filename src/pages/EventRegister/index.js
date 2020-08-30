import React from 'react';
import { Link } from 'react-router-dom';
import { FiPower, FiSearch } from 'react-icons/fi';

import './styles.css';

import { Form, Input } from '@rocketseat/unform';

export default function Home() {
  return <>
    <div className="wrapper-event-register">
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

      <div className="content-event-register">
        <Form>
          <h1>Cadastre seu evento</h1>

          <Input name="title" placeholder="Titulo do Evento"/>
          <Input name="location" placeholder="Endereço"/>    
          <div className="date">
            <label for="date"> Data do evento </label>
            <Input name="date" type="datetime-local" placeholder="dd/mm/aaaa --:--"/>
            <label for="date_limit"> Data limite </label>
            <Input name="date_limit" type="date" placeholder="dd/mm/aaaa"/>
              
          </div> 
          <Input name="max_user" type="number" placeholder="Maximo de Participantes"/>
          <Input multiline name="description" id="description" placeholder="Descrição" />
          <Input name="private_event" type="checkbox" placeholder="Privado"/>
          <label for="private_event"> Privado </label>
              
          <button type="submit">CRIAR</button>
        </Form>
      </div>
    </div>
  </>;
}