import React from 'react';
import { Alert } from 'react-bootstrap';
import './AppNotification.scss';

function AppNotification(props) {
  if (props.error === undefined) {
    return null;
  }
  return (
    <div>
      <Alert variant='danger'>{props.error.message}</Alert>
    </div>
  );
}

export default AppNotification;
