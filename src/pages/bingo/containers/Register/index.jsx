/**
 * @file register
 * @author atom-yang
 */
import React from 'react';
import store from 'store2';
import AElf from 'aelf-sdk';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';
import { setWalletInfo } from '../../actions/base';
import { STORE_KEY } from '../../../../common/constants';

function createNewWallet(password = '', saver) {
  const wallet = AElf.wallet.createNewWallet();
  const { address } = wallet;
  const keyStore = AElf.wallet.keyStore.getKeystore(wallet, password, {
    cipher: 'aes-256-cbc'
  });
  store(STORE_KEY.KEY_STORE, keyStore);
  store(STORE_KEY.ADDRESS, address);
  saver({
    wallet,
    address
  });
}

const Register = props => {
  const { setWalletInfo: saver } = props;
  console.log(props);
  // const { t, i18n } = useTranslation();
  const addNewAccount = () => {
    createNewWallet('password', saver);
  };
  return (
    <div>
      需要填充
      <Button onClick={addNewAccount}>创建账号</Button>
    </div>
  );
};

Register.propTypes = {
  setWalletInfo: PropTypes.func
};

Register.defaultProps = {
  setWalletInfo: () => {}
};

const mapDispatchToProps = dispatch => bindActionCreators({
  setWalletInfo
}, dispatch);

export default connect(null, mapDispatchToProps)(Register);
