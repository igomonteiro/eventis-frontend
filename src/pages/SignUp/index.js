import React, {useState} from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';

import '../../assets/styles/commonStyles.css';
import horizontalLogo from '../../assets/images/only-logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

// const schema = Yup.object().shape({
//   name: Yup.string()
//     .required('O nome é obrigatório'),
//   email: Yup.string()
//     .email('Insira um e-mail válido')
//     .required('O e-mail é obrigatório'),
//   password: Yup.string()
//     .required('A senha é obrigatória')
//     .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
//   confirmPassword: Yup.string()
//     .oneOf([Yup.ref('password')], 'Este campo precisa ser igual a senha')
//     .required('Você precisa confirmar a sua senha'),
// });

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