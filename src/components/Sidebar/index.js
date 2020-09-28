import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Notification from '../Notification';

import { signOut } from '../../store/modules/auth/actions';

export default function Sidebar() {

  function handleSignOut() {
    dispatch(signOut());
  }

  let style = {
    color: '#269997',
    backgroundColor: '#FFF',
    marginTop: '10px',
  };

  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function profileAvatar() {
    if (profile.avatar) {
      return <Avatar style={ style } src={profile.avatar.url}></Avatar>;
    } else {
      return <Avatar style={ style }>{profile.name.charAt(0)}</Avatar>;
    }
  }

  return (
    <>
      <div className="sidebar-menu">
      <div className="user-container">
        <div className="avatar-container">
          { profileAvatar() }
          <span>Olá, { profile.name.split(' ')[0] }!</span>
        </div>
        <Notification/>
      </div>

      <hr></hr>
          
      <ul>
        <li><Link to="/home">Página inicial</Link></li>
        <li><Link to="/profile">Perfil</Link></li>
        <li><Link to="/event/register">Cadastrar evento</Link></li>
        <li><Link to="/event/mySubscriptions">Minhas inscrições</Link></li>
        <li><Link to="/event/myEvents">Meus eventos criados</Link></li>
        <li><Link to="/" onClick={ handleSignOut }>Sair</Link></li>
      </ul>
    </div>
    </>
  );
}