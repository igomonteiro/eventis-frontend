import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { FiSearch, FiLock, FiUnlock, FiUsers } from 'react-icons/fi';
import api from '../../services/api';

import Sidebar from '../Sidebar';
import './styles.css';

export default function Home() {

  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    api.get('/events')
      .then(response => {
        setEvents(response.data);
      });
  }, []);

  function isPrivate(isPrivate) {
    if (isPrivate) {
      return <FiLock size={19} color="#47B2B0"></FiLock>;
    } else {
      return <FiUnlock size={19} color="#47B2B0"></FiUnlock>
    }
  }

  return (
    <>
    <Sidebar></Sidebar>

    <div className="content-home">
      <div className="search-box">
        <input type="text" placeholder="Insira um ID" className="search-input"/>
        <FiSearch size={20} className="search-icon"/>
      </div>

      <div className="event">

          {events.map(event => (
            <>
              <div key={event.id} className="card-event">
                <div className="card-title">
                  <div className="title">
                    <h3>{ event.title }</h3>
                  </div>

                  <div className="lock-icon">
                    { isPrivate(event.private_event) }
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
    </>
  )
}