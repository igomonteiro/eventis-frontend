import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FiPower, FiSearch, FiLock, FiUsers } from 'react-icons/fi';

import { signOut } from '../../store/modules/auth/actions';

import './styles.css';

export default function Home() {

  const dispatch = useDispatch();
  const creatorName = useSelector(state => state.user.profile.name);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    api.get('/events')
      .then(response => {
        setEvents(response.data);
      });
  }, [events]);

  function handleSignOut() {
    dispatch(signOut());
  }

  return <>
    <div className="sidebar-menu">
      <div className="user-container">
        <div className="avatar"></div>
        <span>Olá, { creatorName.split(' ')[0] }!</span>
        <FiPower onClick={ handleSignOut } size={16} />
      </div>

      <hr></hr>
          
      <ul>
        <li><Link to="/home">Página inicial</Link></li>
        <li><Link to="/home">Perfil</Link></li>
        <li><Link to="/event/register">Cadastrar evento</Link></li>
        <li><a href="/">Meus eventos</a></li>
        <li><a href="/">Meus eventos criados</a></li>
      </ul>
    </div>

    <div className="content-home">
      <div className="search-box">
        <input type="text" placeholder="Insira um ID" className="search-input"/>
        <FiSearch size={20} className="search-icon"/>
      </div>

      <div className="event">

          {events.map(event => (
            <>
              <div className="card-event">
                
                <div className="card-title">
                  <div className="title">
                    <h3>{ event.title }</h3>
                  </div>

                  <div className="lock-icon">
                    <FiLock size={19} color="#47B2B0"></FiLock>
                  </div>
                </div>

                <div className="card-text">
                <p style={{ fontSize: "16px" }}>
                  { event.description }
                </p>
                <br/>

                <p style={{ fontSize: "14px" }}>
                  Local: { event.location }
                </p>
                <br/>
                <br/>

                <div className="flex-text">
                  <p style={{ fontSize: "14px" }}>
                    Data: { moment(event.date).format("DD/MM/YYYY [às] h:mm") }
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Expira em: { moment(event.dateLimit).format("DD/MM/YYYY")}
                  </p>
                </div>
                </div>

                <div className="card-bottom">
                  <div className="max-users">
                    <FiUsers size={19} color="#47B2B0"></FiUsers>
                    <span>7/{ event.max_users }</span>
                  </div>
                <button type="submit">PARTICIPAR</button>
                </div>
              </div>         
            </>
          ))}
      </div>
    </div>
  </>;
}