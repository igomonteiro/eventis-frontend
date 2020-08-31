import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import '../../assets/styles/commonStyles.css';
import horizontalLogo from '../../assets/images/only-logo.svg';

import { signInRequest } from '../../store/modules/auth/actions';

// const schema = Yup.object().shape({
//   email: Yup.string().email('Insira um e-mail válido').required('O e-mail é obrigatório'),
//   password: Yup.string().required('A senha é obrigatória'),
// });

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInRequest(email, password));
  }

  return ( 
    <>
      <div className="wrapper">
        <div className="content">
          <img src={horizontalLogo} alt="Eventis" />
          
          <form onSubmit={handleSubmit}>
            <h1>Entre com sua conta</h1>
            
            <input
              name="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange= {e => setEmail(e.target.value)}
            />
            <input
              name="password" 
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange= {e => setPassword(e.target.value)}
            />

            <button type="submit">{ loading ? 'CARREGANDO...' : 'ACESSAR'}</button>
            <Link to="/register">
              <FiLogIn size={16} color="#47B2B0"/>
              Não sou cadastrado
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}