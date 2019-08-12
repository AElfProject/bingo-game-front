/**
 * @file auth root
 * @author atom-yang
 */
import React from 'react';
import PropTypes from 'prop-types';
import store from 'store2';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { hasRegistered } from '../../common/utils';
import { STORE_KEY } from '../../../../common/constants';

const AuthRouter = props => {
  const isLoginInSession = store.session.get(STORE_KEY.IS_LOGIN, true);
  const { component: Component, isLogin, ...rest } = props;
  const hasAccount = hasRegistered();
  // eslint-disable-next-line no-unused-vars
  const isLoginWithSession = isLogin || isLoginInSession;
  // todo for test,remember to delete
  // eslint-disable-next-line no-const-assign
  const { path } = rest;
  const renderProps = innerProps => {
    if (!hasAccount && path !== '/register') {
      return <Redirect to="/register" />;
    }
    if (hasAccount && !isLogin && path !== '/login') {
      return <Redirect to="/login" />;
    }
    // if (hasAccount && isLoginWithSession && path !== '/login') {
    //   return <Redirect to="/login" />;
    // }
    return <Component {...innerProps} {...rest} />;
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
