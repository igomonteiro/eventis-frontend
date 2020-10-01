import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {

  try {

    const { name, avatar_id, ...rest } = payload.data;

    const profile = Object.assign(
      { name, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', profile);
    
    toast('Perfil atualizado com sucesso');

    yield put(updateProfileSuccess(response.data));
  } catch(error) {
    toast.error('Erro ao atualizar perfil, confira os dados');
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
]); 