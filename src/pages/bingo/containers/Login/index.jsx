/**
 * @file log in
 * @author atom-yang
 */
import React from 'react';
import { withRouter } from 'react-router-dom';
import store from 'store2';
import AElf from 'aelf-sdk';
import {
  Button
} from 'antd-mobile';
import PropTypes from 'prop-types';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { login } from '../../actions/base';
import { STORE_KEY } from '../../../../common/constants';

class Login extends React.PureComponent {
  static propTypes = {
    wallet: PropTypes.shape({
      address: PropTypes.string,
      mnemonic: PropTypes.string
    }),
    login: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    wallet: {
      address: '',
      mnemonic: ''
    }
  };

  getWalletFromKeyStore = password => {
    const { history, login: logToPlay } = this.props;
    const keyStore = store.get(STORE_KEY.KEY_STORE);
    const { mnemonic } = AElf.wallet.keyStore.unlockKeystore(keyStore, password);
    const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);
    logToPlay(wallet);
    store.session.set(STORE_KEY.IS_LOGIN, true);
    console.log(wallet);
    history.push('/play');
  };

  handleLogin = () => {
    // todo: get password from input
    this.getWalletFromKeyStore('123123123');
  };

  render() {
    console.log(this.props);
    return (
      <div className="bingo-login">
        <Button onClick={this.handleLogin}>登录</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.base
});

const mapDispatchToProps = dispatch => bindActionCreators({
  login
}, dispatch);

const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withTranslation()
);

export default wrapper(Login);
