import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import { signOut } from '../../store/modules/auth/actions';

export default function Teste() {

  function handleSignOut() {
    dispatch(signOut());
  }

  const dispatch = useDispatch();
  const creatorName = useSelector(state => state.user.profile.name);

  return (
    <>
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
        <li><Link to="/event/mySubscriptions">Minhas inscrições</Link></li>
        <li><Link to="/event/myEvents">Meus eventos criados</Link></li>
      </ul>
    </div>
    </>
  );
}