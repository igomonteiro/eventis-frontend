import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSelector } from 'react-redux';

import api from '../../services/api';

import Sidebar from '../../components/Sidebar';
import './styles.css';

export default function EventRegister() {

  const creatorId = useSelector(state => state.user.profile.id);
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

  async function handleCreateEvent(e) {
    e.preventDefault();

    try {
      await api.post('events', {
        creator_id: creatorId,
        title,
        description,
        location,
        max_users: maxUsers,
        private_event: privateEvent,
        password,
        date,
        date_limit: dateLimit,
      });

      toast('Evento cadastrado com sucesso!');
      history.push('/event/myEvents');
    } catch(error) {
      toast.error('Falha ao cadastrar, verifique os dados do evento');
    }
  }

  return <>
    <Sidebar></Sidebar>

    <div className="content-event-register">
      <div className="form-event">
        <form onSubmit={handleCreateEvent}>
          <h1>Cadastre seu evento</h1>

          <input
            name="title"
            placeholder="Título do evento"
            value={title}
            onChange={ e => setTitle(e.target.value) }
            minLength="4"
            maxLength="25"
            required
          />

          <input
            name="location"
            placeholder="Endereço"
            value={location}
            onChange={ e => setLocation(e.target.value) }
            minLength="10"
            maxLength="55"
            required
          />    

          <label for="date"> Data do evento </label>
          <input
            name="date"
            type="datetime-local"
            placeholder="dd/mm/aaaa --:--"
            value={date}
            onChange={ e => setDate(e.target.value) }
            required
          />

          <label for="dateLimit"> Data limite </label>
          <input
            name="dateLimit"
            type="date"
            placeholder="dd/mm/aaaa"
            value={dateLimit}
            onChange={ e => setDateLimit(e.target.value) }
            required
          />

          <input
            name="maxUser"
            type="number"
            min="1"
            placeholder="Máximo de participantes"
            value={maxUsers}
            onKeyDown={ (evt) => (evt.key === 'e' || evt.key === '.') && evt.preventDefault() }
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
            minLength="6"
            maxLength="24"
          />

          <div className="checkbox-private">
            <input
              className="checkbox-input"
              name="privateEvent"
              type="checkbox"
              placeholder="Privado"
              onChange={ () => { setPrivateEvent(!privateEvent); setShowPassword(!privateEvent) }  }
            />
            <label for="privateEvent">Privado</label>
          </div>
          <button type="submit">CRIAR</button>
        </form>
      </div>
    </div>
  </>;
}