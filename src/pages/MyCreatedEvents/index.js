import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { FiUsers } from 'react-icons/fi';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle } from '@material-ui/core';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import './styles.css';

export default function MyCreatedEvents() {

  const history = useHistory();

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setEventId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
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

                  <div className="max-users-edited">
                    <FiUsers size={19} color="#47B2B0"></FiUsers>
                    <span>{ event.subscribers }/{ event.max_users }</span>
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
                  <button onClick={() => handleClickOpen(event.id)} type="button">EXCLUIR</button>
                </div>               
              </div>         
            </>
          ))}

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Deseja excluir este evento?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se você aceitar, o evento será excluído permanentemente.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Não
            </Button>
            <Button
              onClick={() => {
                handleDeleteEvent(eventId);
                handleClose();
              }}
              color="primary"
              autoFocus
            >
              Sim
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    </>
  );
}