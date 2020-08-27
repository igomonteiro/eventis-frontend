import React from 'react';

import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import '../../assets/styles/commonStyles.css';
import horizontalLogo from '../../assets/images/only-logo.svg';

import { signUpRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  name: Yup.string()
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string()
    .required('A senha é obrigatória')
    .min(6, 'Senha precisa ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Este campo precisa ser igual a senha')
    .required('Você precisa confirmar a sua senha'),
});

export default function SignUp() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email, password, confirmPassword }) {
    dispatch(signUpRequest(name, email, password, confirmPassword));
  }

  return ( 
    <>
      <div className="wrapper">
        <div className="content">
          <img src={horizontalLogo} alt="Eventis" />

          <Form schema={schema} onSubmit={handleSubmit}>
            <h1>Crie sua conta</h1>

            <Input name="name" placeholder="Seu nome"/>
            <Input name="email" type="email" placeholder="Seu email"/>
            <Input name="password" type="password" placeholder="Sua senha"/>
            <Input name="confirmPassword" type="password" placeholder="Confirme sua senha" />

            <button type="submit">CRIAR CONTA</button>
            <Link to="/">
              <FiArrowLeft size={16} color="#47B2B0"/>
              Já sou cadastrado
            </Link>
          </Form>
        </div>
      </div>
    </>
  );
}