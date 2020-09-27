import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { FiMail } from 'react-icons/fi';

import Badge from '@material-ui/core/Badge';

import api from '../../services/api';

import './styles.css';

export default function Sidebar() {

  const [visible, setVisible] = useState(false);
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

  var style = {};

  function unread(read) {
    if (!read) {
      return {
        content: '',
        display: 'inline-block',
        width: '6px',
        height: '6px',
        background: '#0B7371',
        borderRadius: '50%'
      }
    } else {
      return {
        content: 'none'
      }
    }
  }

  async function markAsRead(notificationId) {
    console.log(notificationId);
    await api.put(`notifications/${notificationId}`);
  }

  if (!visible) {
    style.display = 'none';
  }

  function dateTest(date) {
    let now = moment(new Date());
    let end = moment(date);
    let duration = moment.duration(now.diff(end));
    let extenso = '';

    if (Math.trunc(duration.asDays()) > 0) {
      extenso = 'dias';
      duration = Math.trunc(duration.asDays());
    } else if (Math.trunc(duration.asHours()) > 0 && Math.trunc(duration.asHours()) < 24) {
      extenso = 'horas';
      duration = Math.trunc(duration.asHours());
    } else if (Math.trunc(duration.asMinutes()) > 0 && Math.trunc(duration.asMinutes() < 60)) {
      extenso = 'minutos';
      duration = Math.trunc(duration.asMinutes());
    } else {
      extenso = 'segundos';
      duration = Math.trunc(duration.asSeconds());
    }

    return `há ${duration} ${extenso}`;
  }

  return (
    <>
      <div className="notification-content">
        <Badge color="secondary" variant="dot" invisible={!hasUnread}>
          <button
            style={{ background: 'none', outline: 'none', border: 0}}
            onClick={() => { setVisible(!visible); }}
          >
            <FiMail size={22}/>
          </button>
        </Badge>
    
        <div style={style} className="notification-list">
          {notifications.map(notification => (
              <>
                <div className="notification">
                  <p>{notification.content}</p>
                  <time>{ dateTest(notification.createdAt) }</time>
                  <button
                    onClick={() => markAsRead(notification._id) }
                    type="button"
                  >
                    Marcar como lida
                  </button>
                  <div style={unread(notification.read)}></div>
                </div>
              </>
            ))
          }
        </div>
      </div>
    </>
  );
}