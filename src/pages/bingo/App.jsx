/**
 * @file App.jsx
 * @author atom-yang
 */
import React from 'react';
import PropTypes from 'prop-types';
import AElf from 'aelf-sdk';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import AuthRoute from './components/Auth';
import Register from './containers/Register/index';
import BingoGame from './containers/play';
import Mnemonic from './containers/Mnemonic';
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
  const { t } = useTranslation();

  // const { i18n } = useTranslation();
  // const changeZh = async () => {
  //   await i18n.changeLanguage('zh');
  // };
  // const changeEn = async () => {
  //   await i18n.changeLanguage('en');
  // };
  return (
    <>
      <div className="index-container">
        {/* <Button onClick={changeZh}>切换中文</Button>
        <Button onClick={changeEn}>switch to english</Button> */}
        {t('name')}
      </div>
      <HashRouter>
        <Switch>
          <Route exact path="/register" component={Register} />
          <AuthRoute exact isLogin={isLogin} path="/login" component={demo} />
          <AuthRoute exact isLogin={isLogin} wallet={wallet} path="/play" component={BingoGame} />
          <AuthRoute exact isLogin={isLogin} path="/mnemonic" component={Mnemonic} />
          <Route component={demo} />
        </Switch>
      </HashRouter>
    </>
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
