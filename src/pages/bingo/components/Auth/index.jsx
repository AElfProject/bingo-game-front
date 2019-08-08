/**
 * @file auth root
 * @author atom-yang
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { hasRegistered } from '../../common/utils';

const AuthRouter = props => {
  const { component: Component, isLogin, ...rest } = props;
  const hasAccount = hasRegistered();
  const renderProps = innerProps => {
    if (!hasAccount) {
      return <Redirect to="/register" />;
    }
    if (!isLogin && rest.path === '/login') {
      return <Redirect to="/login" />;
    }
    return <Component {...innerProps} />;
  };
  return (
    <Route
      {...rest}
      render={renderProps}
    />
  );
};

AuthRouter.propTypes = {
  component: PropTypes.elementType.isRequired,
  isLogin: PropTypes.bool
};

AuthRouter.defaultProps = {
  isLogin: false
};

export default withRouter(AuthRouter);
