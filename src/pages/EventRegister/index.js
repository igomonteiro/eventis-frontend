import React, { useState } from 'react';
import api from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';

import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { signOut } from '../../store/modules/auth/actions';

import './styles.css';

export default function Home() {

  const dispatch = useDispatch();

  const creatorId = useSelector(state => state.user.profile.id);
  const creatorName = useSelector(state => state.user.profile.name);
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

  function handleSignOut() {
    dispatch(signOut());
  }

  async function handleCreateEvent(e) {
    e.preventDefault();

    try {
      const response = await api.post('events', {
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

      console.log(response.data);

      toast.success('Evento cadastrado com sucesso!');
      history.push('/home');
    } catch(error) {
      toast.error('Falha ao cadastrar, verifique os dados do evento');
    }
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

    <div className="content-event-register">
      <div className="form-event">
        <form onSubmit={handleCreateEvent}>
          <h1>Cadastre seu evento</h1>

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
              defaultChecked={privateEvent}
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