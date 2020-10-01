import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'react-toastify';
import { FiUsers } from 'react-icons/fi';
import { List } from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';
import UsersList from '@material-ui/core/List';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText,
  DialogTitle, ListItem, Divider, ListItemText, ListItemAvatar, Avatar }
  from '@material-ui/core';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import './styles.css';

export default function MyCreatedEvents() {

  const useStyles = makeStyles({
    root: {
      width: '100%',
      maxWidth: '50ch',
      marginTop: '-20px'
    },
    inline: {
      display: 'inline',
    },
  });

  const style = {
    color: '#FFF',
    backgroundColor: '#269997',
    marginTop: '10px',
  };

  const history = useHistory();
  const classes = useStyles();

  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('');
  const [open, setOpen] = useState(false);
  const [openList, setOpenList] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  const handleClickOpen = (id) => {
    setEventId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function profileAvatar(subscriber) {
    if (subscriber.avatar) {
      return <Avatar style={ style } src={subscriber.avatar.url}></Avatar>;
    } else {
      return <Avatar style={ style }>{subscriber.name.charAt(0)}</Avatar>;
    }
  }

  async function handleClickOpenList(eventId) {
    try {
      setOpenList(true);
      const response = await api.get(`myEvents/subscribers/${eventId}`);
      setSubscribers(response.data);
    } catch (err) {
      toast.error('Falha listar inscritos no evento, tente novamente');
    }
  };

  const handleCloseList = () => {
    setOpenList(false);
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
      toast('Evento excluído com sucesso!');
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
                  <button
                      style={{ background: 'none', outline: 'none', border: 0}}
                      onClick={() => handleClickOpenList(event.id)}
                    >
                    <List style={{ marginLeft: '20px', color: '#47B2B0' }}/>
                  </button>
                  <h3>{ event.title }</h3>

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
                    Data: { moment(event.date).format("DD/MM/YYYY [às] H:mm") }
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    Expira em: {moment(event.date_limit).format("DD/MM/YYYY")}
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
          open={openList}
          onClose={handleCloseList}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Lista de participantes"}</DialogTitle>
          <DialogContent>
          <UsersList className={classes.root}>
            {subscribers.map(subscriber => {
              if (!subscriber.canceledDate) {
                return (
                  <>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        {profileAvatar(subscriber.user)}
                      </ListItemAvatar>
                      <ListItemText
                        primary={subscriber.user.name}
                        secondary={
                          <React.Fragment>
                            {"Inscreveu-se no evento em " + moment(subscriber.subscriptionDate).format("DD/MM/YYYY [às] H:mm")}
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </>
                )
              }
            })}
          </UsersList>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseList} color="primary" autoFocus>
              Fechar
            </Button>
          </DialogActions>
        </Dialog>

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