import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { updateProfileRequest } from '../../store/modules/user/actions';

import Sidebar from '../../components/Sidebar';
import AvatarInput from './AvatarInput';
import './styles.css';

export default function Profile() {

  const dispatch = useDispatch();
  const profile =  useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <>
      <Sidebar></Sidebar>
      <div className="content-profile">      
        <Form initialData={profile} onSubmit={handleSubmit}>
          <AvatarInput name="avatar_id"/>
          <Input
            name="name"
            placeholder="Seu nome"
          />

          <Input
            name="oldPassword"
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme sua nova senha"
          />

          <button type="submit">ATUALIZAR PERFIL</button>
        </Form>
      </div>
    </>
  );
}