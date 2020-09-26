import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Notification from '../Notification';

import userAvatar from '../../assets/images/user.png';

import { signOut } from '../../store/modules/auth/actions';

export default function Sidebar() {

  function handleSignOut() {
    dispatch(signOut());
  }

  const dispatch = useDispatch();
  const creatorName = useSelector(state => state.user.profile.name);

  return (
    <>
      <div className="sidebar-menu">
      <div className="user-container">
        <div className="avatar-container">
          <img src={userAvatar} width="50" height="50" alt=""/>
          <span>Olá, { creatorName.split(' ')[0] }!</span>
        </div>
        <Notification/>
      </div>

      <hr></hr>
          
      <ul>
        <li><Link to="/home">Página inicial</Link></li>
        <li><Link to="/home">Perfil</Link></li>
        <li><Link to="/event/register">Cadastrar evento</Link></li>
        <li><Link to="/event/mySubscriptions">Minhas inscrições</Link></li>
        <li><Link to="/event/myEvents">Meus eventos criados</Link></li>
        <li><Link onClick={ handleSignOut }>Sair</Link></li>
      </ul>
    </div>
    </>
  );
}