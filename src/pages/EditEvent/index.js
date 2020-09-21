import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import api from '../../services/api';

import Sidebar from '../Sidebar';
import './styles.css';

export default function EditEvent({ match }) {

  const history = useHistory();

  var style = {};

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [dateLimit, setDateLimit] = useState('');
  const [maxUsers, setMaxUsers] = useState('');
  const [description, setDescription] = useState('');
  const [privateEvent, setPrivateEvent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  if (!showPassword) {
    style.display = 'none';
  }

  useEffect(() => {
    api.get(`myEvents/${match.params.id}`)
      .then(response => {
        setTitle(response.data.title);
        setLocation(response.data.location);
        setDate(response.data.date);
        setDateLimit(response.data.date_limit);
        setMaxUsers(response.data.max_users);
        setDescription(response.data.description);
        setPrivateEvent(response.data.private_event);
        setShowPassword(response.data.private_event);
        setPassword(response.data.password);
      })
      .catch(() => {
        history.push('/event/myEvents');
        toast.error('Falha ao editar, este evento não é seu!');
      });
  }, [match.params.id, history]);

  async function handleEditEvent(e) {
    e.preventDefault();

    try {
      await api.put(`myEvents/${match.params.id}`, {
        title,
        description,
        location,
        max_users: maxUsers,
        private_event: privateEvent,
        password,
        date,
        date_limit: dateLimit,
      });

      toast.success('Evento editado com sucesso!');
      history.push('/event/myEvents');
    } catch(error) {
      toast.error('Falha ao editar, verifique os dados do evento');
    }
  }

  return (
    <>
    <Sidebar></Sidebar>

    <div className="content-event-register">
      <div className="form-event">
        <form onSubmit={handleEditEvent}>
          <h1>Edite seu evento</h1>

          <input
            name="title"
            placeholder="Título do evento"
            value={title}
            onChange={ e => setTitle(e.target.value) }
            required
          />

          <input
            name="location"
            placeholder="Endereço"
            value={location}
            onChange={ e => setLocation(e.target.value) }
            required
          />    

          <label htmlFor="date"> Data do evento </label>
          <input
            name="date"
            type="datetime-local"
            placeholder="dd/mm/aaaa --:--"
            value={moment(date).format("YYYY-MM-DD[T]HH:MM")}
            onChange={ e => setDate(e.target.value) }
            required
          />

          <label htmlFor="dateLimit"> Data limite </label>
          <input
            name="dateLimit"
            type="date"
            placeholder="dd/mm/aaaa"
            value={moment(dateLimit).format("YYYY-MM-DD")}
            onChange={ e => setDateLimit(e.target.value) }
            required
          />

          <input
            name="maxUser"
            type="number"
            min="0"
            placeholder="Máximo de participantes"
            value={maxUsers}
            onChange={ e => setMaxUsers(e.target.value) }
            required
          />

          <textarea
            rows="5"
            cols="33"
            name="description"
            placeholder="Insira uma descrição"
            value={description}
            maxLength="225"
            onChange={ e => setDescription(e.target.value) }
          />

          <input
            name="password"
            type="password"
            style={style}
            placeholder="Senha para o evento"
            value={password}
            onChange={ e => { if(showPassword) { setPassword(e.target.value) } else { setPassword('') } } }
            required={showPassword}
          />

          <div className="checkbox-private">
            <input
              className="checkbox-input"
              name="privateEvent"
              type="checkbox"
              checked={privateEvent}
              placeholder="Privado"
              onChange={ () => { setPassword(""); setPrivateEvent(!privateEvent); setShowPassword(!privateEvent) }  }
            />
            <label htmlFor="privateEvent">Privado</label>
          </div>
          <button type="submit">CONFIRMAR EDIÇÃO</button>
        </form>
      </div>
    </div>
    </>
  );
}