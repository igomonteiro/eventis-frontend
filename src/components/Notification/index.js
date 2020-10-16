import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import Scrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Badge from '@material-ui/core/Badge';
import { Email } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api';

import './styles.css';

export default function Sidebar() {

  const useStyles = makeStyles({
    customBadge: {
      backgroundColor: 'white',
    },
  });

  const classes = useStyles();

  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => notifications.filter(notification => notification.read === false).length,
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');
      setNotifications(response.data);
    }

    async function setUpcomingNotifications() {
      await api.get('notifications/upcoming');
    }

    setUpcomingNotifications();
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
        display: 'none',
      }
    }
  }

  async function markAsRead(notificationId) {
    await api.put(`notifications/${notificationId}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === notificationId ? { ...notification, read: true } : notification
      )
    )
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
        <Badge classes={{ badge: classes.customBadge }} badgeContent={hasUnread}>
          <button
            style={{ background: 'none', outline: 'none', border: 0}}
            onClick={() => { setVisible(!visible); }}
          >
            <Email style={{ color: '#0B7371' }}/>
          </button>
        </Badge>
    
        <div style={style} className="notification-list">
          <Scrollbar style={{ maxHeight: '300px', padding: '5px 15px'}}>
          {notifications.map(notification => (
              <>
                <div key={notification._id} className="notification">
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
          </Scrollbar>
        </div>
      </div>
    </>
  );
}