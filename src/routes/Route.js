import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

import { store } from '../store';

export default function RouteWrapper({
  isPrivate,
  component: Component,
  ...rest
}) {
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to={'/'} />;
  }

  if (signed && !isPrivate) {
    return <Redirect to={'/home'} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
}