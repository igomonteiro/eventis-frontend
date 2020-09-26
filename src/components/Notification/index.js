import React, { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { FiMail } from 'react-icons/fi';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Badge from '@material-ui/core/Badge';

import api from '../../services/api';

import './styles.css';

export default function Sidebar() {

  const creatorId = useSelector(state => state.user.profile.id);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      setNotifications(response.data);
    }
    loadNotifications();
  }, []);

  return (
    <>
      <div className="notification-content">
        <Badge color="secondary" variant="dot" invisible={hasUnread}>
          <FiMail size={22} />
        </Badge>

        <PerfectScrollbar >
          <div className="notification-list">
            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>

            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>
            
            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>

            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>

            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>

            <div className="notification">
              <p> Um cara se inscreveu no teu evento</p>
              <time>há 2 dias</time>
              <button type="button">Marcar como lida</button>
            </div>
          </div>
        </PerfectScrollbar>
      </div>
    </>
  );
}