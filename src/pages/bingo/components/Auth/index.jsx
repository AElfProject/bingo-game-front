/**
 * @file auth root
 * @author atom-yang
 */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import store from 'store2';
import { useDispatch } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { BASE_INFO } from '../../actions/base';
import { hasRegistered } from '../../common/utils';
import { STORE_KEY } from '../../../../common/constants';

const AuthRouter = props => {
  const { component: Component, isLogin, ...rest } = props;
  const hasAccount = hasRegistered();
  const walletInfo = store.session.get(STORE_KEY.WALLET_INFO);
  const isLoginWithSession = isLogin || Object.keys(walletInfo || {}).length > 0;
  const { path } = rest;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLogin && Object.keys(walletInfo || {}).length > 0) {
      // log in based on session storage
      dispatch({
        type: BASE_INFO.LOG_IN_BINGO,
        payload: walletInfo
      });
    }
  }, []);
  const renderProps = innerProps => {
    if (!hasAccount && path !== '/register') {
      return <Redirect to="/register" />;
    }
    if (hasAccount && !isLoginWithSession && path !== '/login') {
      return <Redirect to="/login" />;
    }
    if (hasAccount && isLoginWithSession && (path === '/register' || path === '/login' || path === '/')) {
      return <Redirect to="/play" />;
    }
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
