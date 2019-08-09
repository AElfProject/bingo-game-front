/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import PropTypes from 'prop-types';
import AElf from 'aelf-sdk';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import AuthRoute from './components/Auth';
import Register from './containers/Register/index';
import BingoGame from './containers/play';
import Mnemonic from './containers/Mnemonic';
import Login from './containers/Login/index';
import './common/i18n';
import './index.less';

const mnemonic = 'orange learn result add snack curtain double state expose bless also clarify';

const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);

const demo = () => {
  console.log('替换为各容器组件');
  return (
    <div>test</div>
  );
};

const App = props => {
  const { isLogin } = props;
  console.log(isLogin);
  return (
    <HashRouter>
      <Switch>
        <AuthRoute exact path="/register" component={Register} />
        <AuthRoute exact isLogin={isLogin} path="/login" component={Login} />
        <AuthRoute exact isLogin={isLogin} path="/play" wallet={wallet} component={BingoGame} />
        <AuthRoute exact isLogin={isLogin} path="/mnemonic" component={Mnemonic} />
        <Route component={demo} />
      </Switch>
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
