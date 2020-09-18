import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';

import api from '../../services/api';

import Sidebar from '../Sidebar';
import './styles.css';

export default function MyCreatedEvents() {

  const history = useHistory();
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    api.get('myEvents')
      .then(response => {
        setEvents(response.data);
      });
  }, []);

  function goToEditEvent(id) {
    history.push(`myEvents/${id}`);
  }

  async function handleDeleteEvent(id) {
    try {
      await api.delete(`myEvents/${id}`);

      setEvents(events.filter(event => event.id !== id));

      toast.success('Evento excluído com sucesso!');
    } catch(err) {
      toast.error('Falha ao deletar evento, tente novamente');
    }
  }

  return (
    <>
    <Sidebar></Sidebar>
    <div className="content-home">
      <div className="event-myevents">

          {events.map(event => (
            <>
              <div key={ event.id } className="card-event-myevents">
                <div className="card-title-myevents">
                  <div className="title-myevents">
                    <h3>{ event.title }</h3>
                  </div>
                </div>

                <div className="card-text-myevents">
                <p style={{ fontSize: "16px" }}>
                  { event.description }
                </p>
                <br/>

                <p style={{ fontSize: "14px" }}>
                  Local: { event.location }
                </p>
                <br/>
                <br/>

                <div className="flex-text-myevents">
                  <p style={{ fontSize: "14px" }}>
                    Data: { moment(event.date).format("DD/MM/YYYY [às] h:mm") }
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Expira em: { moment(event.dateLimit).format("DD/MM/YYYY")}
                  </p>
                </div>
                </div>

                <div className="card-bottom-myevents">
                  <button onClick={() => goToEditEvent(event.id)}type="button">EDITAR</button>
                  <button onClick={() => handleDeleteEvent(event.id)} type="button">EXCLUIR</button>
                </div>               
              </div>         
            </>
          ))}
      </div>
    </div>
    </>
  );
}