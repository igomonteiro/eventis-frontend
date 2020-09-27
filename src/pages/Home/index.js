import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FiSearch, FiLock, FiUnlock, FiUsers } from 'react-icons/fi';
import { toast } from 'react-toastify';

import api from '../../services/api';

import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
  DialogContentText } from '@material-ui/core';

import Sidebar from '../../components/Sidebar';
import './styles.css';

export default function Home() {

  // DIALOG FORM
  const [open, setOpen] = useState(false);
  const [privateDialog, setPrivateDialog] = useState(false);
  const [subscriptionEventId, setSubscriptionEventId] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpenPasswordForm = () => {
    setOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPassword('');
    setOpen(false);
  };

  const userId = useSelector(state => state.user.profile.id);
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    api.get('/events')
      .then(response => {
        setEvents(response.data);
      });
  }, [subscriptionEventId]);

  async function handleSubscription() {
    
    try {
      await api.post('subscription', {
        user_id: userId,
        event_id: subscriptionEventId,
        password: password, 
      });

      setEvents(events.filter(event => event.id !== subscriptionEventId));
      toast.success("Você se inscreveu no evento, vá no menu: \"Minhas inscrições\" para mais detalhes");
    } catch (err) {
      toast.error("Desculpe, ocorreu um erro ao tentar se inscrever no evento. Tente novamente!");
    }
  }

  function isPrivate(isPrivate) {
    if (isPrivate) {
      return <FiLock size={19} color="#47B2B0"></FiLock>;
    } else {
      return <FiUnlock size={19} color="#47B2B0"></FiUnlock>
    }
  }

  function showPrivateOrNormalDialog(privateDialog) {
    if (privateDialog) {
      return (
        <DialogContent>
          <DialogContentText>
            Por ser um evento privado, você precisa informar a senha que lhe foi dada pelo criador do evento.
          </DialogContentText>
  
          <TextField
            autoFocus
            margin="dense"
            label="Senha"
            value={password}
            type="password"
            onChange={ e => setPassword(e.target.value) }
            fullWidth
            required
            helperText="*Campo obrigatório"
          />
        </DialogContent>
      )
    } else {
      return (
        <DialogContent>
          <DialogContentText>
            Deseja mesmo se inscrever neste evento?
          </DialogContentText>
        </DialogContent>
      )
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
                    <span>{ event.subscribers }/{ event.max_users }</span>
                  </div>
                <button
                  onClick={() => {
                    setSubscriptionEventId(event.id);
                    if (event.private_event) {
                      handleClickOpenPasswordForm();
                      setPrivateDialog(true);
                    } else {
                      handleClickOpen();
                    }
                  }}
                  type="submit">PARTICIPAR</button>
                </div>
              </div>         
            </>
          ))}

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Inscrever-se no evento</DialogTitle>
          
          { showPrivateOrNormalDialog(privateDialog) }
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleSubscription();
                handleClose();
              }}
              color="primary"
            >
              Participar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
    </>
  )
}