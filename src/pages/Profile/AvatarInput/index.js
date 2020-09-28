import React, {useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useField } from '@rocketseat/unform';

import api from '../../../services/api';

import './styles.css';

export default function AvatarInput() {

  const profile = useSelector(state => state.user.profile);

  const { defaultValue, registerField } = useField('avatar');
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();

  let style = {
    color: '#269997',
    backgroundColor: '#FFF',
    fontSize: '120px',
    marginTop: '10px',
    width: '300px',
    height: '300px'
  };

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  function profileAvatar() {
    if (preview) { 
      return <Avatar style={ style } src={ preview }></Avatar>;
    } else {
      return <Avatar style={ style }>{profile.name.charAt(0)}</Avatar>;
    }
  }

  return (
    <>
      <div className="form-profile">
        <label htmlFor="avatar">
          {profileAvatar()}
          <input
            type="file"
            id="avatar"
            accept="image/*"
            data-file={file}
            onChange={handleChange}
            ref={ref}
          />
        </label>
      </div>
    </>
  );
}