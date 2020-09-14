import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import '../../assets/styles/commonStyles.css';
import horizontalLogo from '../../assets/images/only-logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

export default function SignUp() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUpRequest(name, email, password, confirmPassword));
  }

  return ( 
    <>
      <div className="wrapper">
        <div className="content">
          <img src={horizontalLogo} alt="Eventis" />

          <form onSubmit={handleSubmit}>
            <h1>Crie sua conta</h1>

            <input
              name="name"
              placeholder="Seu nome"
              value={name}
              onChange={ e => setName(e.target.value) }
            />

            <input
              name="email"
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={ e => setEmail(e.target.value) }
            />

            <input
              name="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={ e => setPassword(e.target.value) }
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={ e => setConfirmPassword(e.target.value) }
            />

            <button type="submit">CRIAR CONTA</button>
            <Link to="/">
              <FiArrowLeft size={16} color="#47B2B0"/>
              Já sou cadastrado
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}