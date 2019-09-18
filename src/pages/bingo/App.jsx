/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Switch
} from 'react-router-dom';
import AuthRoute from './components/Auth';
import Register from './containers/Register/index';
import BingoGame from './containers/play';
import Mnemonic from './containers/Mnemonic';
import Login from './containers/Login';
import QRcodeExport from './containers/QRcodeExport';
import './common/i18n';
import './index.less';
import Background from './components/Background';

const App = props => {
  const { isLogin } = props;
  return (
    <HashRouter>
      <Background>
        <Switch>
          <AuthRoute exact path="/register" component={Register} />
          <AuthRoute exact isLogin={isLogin} path="/login" component={Login} />
          <AuthRoute exact isLogin={isLogin} path="/play" component={BingoGame} />
          <AuthRoute exact isLogin={isLogin} path="/mnemonic" component={Mnemonic} />
          <AuthRoute exact isLogin={isLogin} path="/QRcode" component={QRcodeExport} />
          <AuthRoute exact isLogin={isLogin} path="/" component={Register} />
        </Switch>
      </Background>
    </HashRouter>
  );
};

App.propTypes = {
  isLogin: PropTypes.bool.isRequired
};

const mapStateToProps = state => state.base;

const wrapper = compose(
  React.memo,
  connect(mapStateToProps)
);


export default wrapper(App);
