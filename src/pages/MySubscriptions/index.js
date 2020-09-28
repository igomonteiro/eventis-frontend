import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { toast } from 'react-toastify';

import {Button, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle} from '@material-ui/core';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import './styles.css';

export default function MySubscriptions() {

  const [subscriptions, setSubscriptions] = useState([]);
  const [subId, setSubId] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setSubId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    api.get('subscription')
      .then(response => {
        setSubscriptions(response.data);
      });
  }, []);

  async function handleCancelSubscription(subId) {
    try {
      await api.put('subscription', {
        id: subId
      });

      setSubscriptions(
        subscriptions.map(sub => sub.id === subId ? { ...sub, canceled_at: new Date() } : sub )
      )

      toast.success('Você cancelou sua participação com sucesso.')
    } catch(err) {
      toast.error('Falha ao cancelar participação em evento, tente novamente');
    }
  }

  function showCancelButton(id, status, eventDate) {

    let now = moment(new Date());
    let momentEventDate = moment(eventDate);

    if (status != null) {
      return <button type="button" disabled>INSCRIÇÃO CANCELADA</button>;
    } else if (now.isAfter(momentEventDate)) {
      return <button type="button" disabled>EVENTO JÁ ACONTECEU</button>;
    } else if (now.isSame(momentEventDate, 'day')) {
      return <button type="button" disabled>EVENTO ACONTECE HOJE</button>;
    } else {
      return <button onClick={() => handleClickOpen(id)} type="button">CANCELAR INSCRIÇÃO</button>;
    }
  }

  return (
    <>
    <Sidebar></Sidebar>
    <div className="content-home">
      <div className="event-created">

          {subscriptions.map(subs => (
            <>
              <div key={ subs.id } className="card-event-created">
                <div className="card-title-created">
                  <div className="title-created">
                    <h3>{ subs.evento.title }</h3>
                  </div>
                </div>

                <div className="card-text-created">
                <p style={{ fontSize: "16px" }}>
                  { subs.evento.description }
                </p>
                <br/>

                <p style={{ fontSize: "14px" }}>
                  Local: { subs.evento.location }
                </p>
                <br/>
                <br/>

                <div className="flex-text-created">
                  <p style={{ fontSize: "14px" }}>
                    Data: { moment(subs.evento.date).format("DD/MM/YYYY [às] h:mm") }
                  </p>
                </div>
                </div>

                <div className="card-bottom-created">
                  { showCancelButton(subs.id, subs.canceled_at, subs.evento.date) }
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
          <DialogTitle id="alert-dialog-title">{"Deseja cancelar inscrição neste evento?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Se você aceitar, você poderá se inscrever novamente no mesmo evento pela página inicial.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Não
            </Button>
            <Button
              onClick={() => {
                handleCancelSubscription(subId);
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