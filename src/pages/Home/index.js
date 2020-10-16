import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FiSearch, FiUsers } from 'react-icons/fi';
import { LockOpenOutlined, LockOutlined } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import { toast } from 'react-toastify';

import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from '@material-ui/core';
import api from '../../services/api';

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

  const userId = useSelector((state) => state.user.profile.id);
  const [eventId, setEventId] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get('/events').then((response) => {
      setEvents(response.data);
    });
  }, [subscriptionEventId]);

  async function handleFilterById() {
    try {
      const response = await api.get(`events/${eventId}`);
      if (response.data.creator_id) {
        setEvents([response.data]);
      } else {
        setEvents(response.data);
      }
    } catch (err) {
      toast.error(
        'Desculpe, ocorreu um erro ao tentar filtrar um evento. Tente novamente!',
      );
    }
  }

  async function handleSubscription() {
    try {
      await api.post('subscription', {
        user_id: userId,
        event_id: subscriptionEventId,
        password,
      });

      setEvents(events.filter((event) => event.id !== subscriptionEventId));
      toast(
        'Você se inscreveu no evento, vá no menu: "Minhas inscrições" para mais detalhes',
      );
    } catch (err) {
      toast.error(
        'Desculpe, ocorreu um erro ao tentar se inscrever no evento. Tente novamente!',
      );
    }
  }

  function isPrivateEvent(isPrivate) {
    if (isPrivate) {
      return <LockOutlined style={{ color: '#47B2B0' }} />;
    }
    return <LockOpenOutlined style={{ color: '#47B2B0' }} />;
  }

  function showPrivateOrNormalDialog(isPrivateDialog) {
    if (isPrivateDialog) {
      return (
        <DialogContent>
          <DialogContentText>
            Por ser um evento privado, você precisa informar a senha que lhe foi
            dada pelo criador do evento.
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            label="Senha"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            inputProps={{ maxLength: 24 }}
            helperText="*Campo obrigatório"
          />
        </DialogContent>
      );
    }
    return (
      <DialogContent>
        <DialogContentText>
          Deseja mesmo se inscrever neste evento?
        </DialogContentText>
      </DialogContent>
    );
  }

  const style = {
    color: '#FFF',
    backgroundColor: '#269997',
    marginLeft: '20px',
    marginBottom: '20px',
  };

  function profileAvatar(creator) {
    return (
      <Avatar
        style={style}
        src={creator && creator.avatar ? creator.avatar.url : ''}
      >
        {creator.name.charAt(0)}
      </Avatar>
    );
  }

  return (
    <>
      <Sidebar />

      <div className="content-home">
        <div className="search-box">
          <input
            type="text"
            placeholder="Insira um ID"
            className="search-input"
            onChange={(e) => setEventId(e.target.value)}
          />
          <button type="button" onClick={handleFilterById}>
            <FiSearch size={20} className="search-icon" />
          </button>
        </div>

        <div className="event">
          {events.map((event) => (
            <>
              <div key={event.id} className="card-event">
                <div className="card-title">
                  <div className="title">
                    <h3>{event.title}</h3>
                  </div>

                  <div className="lock-icon">
                    {isPrivateEvent(event.private_event)}
                  </div>
                </div>

                <div className="card-creator">
                  {profileAvatar(event.creator)}
                  <p>{event.creator.name}</p>
                </div>

                <div className="card-text">
                  <p style={{ fontSize: '16px' }}>{event.description}</p>
                  <br />

                  <p style={{ fontSize: '14px' }}>Local: {event.location}</p>
                  <br />
                  <div className="flex-text">
                    <p style={{ fontSize: '14px' }}>
                      Data: {moment(event.date).format('DD/MM/YYYY [às] H:mm')}
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      Expira em: {moment(event.date_limit).format('DD/MM/YYYY')}
                    </p>
                  </div>
                </div>

                <div className="card-bottom">
                  <div className="max-users">
                    <FiUsers size={19} color="#47B2B0" />
                    <span>
                      {event.subscribers}/{event.max_users}
                    </span>
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
                    type="submit"
                  >
                    PARTICIPAR
                  </button>

                  <span className="event-id">#{event.id}</span>
                </div>
              </div>
            </>
          ))}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">
              Inscrever-se no evento
            </DialogTitle>

            {showPrivateOrNormalDialog(privateDialog)}

            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Fechar
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
  );
}
