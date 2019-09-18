/**
 * @file register
 * @author atom-yang
 */
import React from 'react';
import store from 'store2';
import AElf from 'aelf-sdk';
import {
  InputItem, List, Modal, Toast
} from 'antd-mobile';
import { bindActionCreators, compose } from 'redux';
import memoizeOne from 'memoize-one';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { register } from '../../actions/base';
import { request } from '../../../../common/request';
import {
  API_PATH,
  STORE_KEY,
  REG_COLLECTION
} from '../../../../common/constants';
import RotateButton from '../../components/RotateButton';
import ShowRotateBtn from '../../components/ShowRotateBtn';
import ModalContent from '../../components/ModalContent';
import { localHttp } from '../../common/constants';
import './index.less';

const inputBox = [
  {
    btnName: 'nickName',
    type: 'text',
    error: 'nameError',
    onChange: 'nameInput',
    value: 'name',
    errorClick: 'nickName'
  },
  {
    btnName: 'password',
    type: 'password',
    error: 'passwordError',
    onChange: 'passwordInput',
    value: 'password',
    errorClick: 'password',
  },
  {
    btnName: 'confirmPassword',
    type: 'password',
    error: 'confirmPasswordError',
    onChange: 'confirmPasswordInput',
    value: 'confirmPassword',
    errorClick: 'confirmPassword',
  },
];


class Register extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
    wallet: PropTypes.shape({
      address: PropTypes.string,
      mnemonic: PropTypes.string
    }),
    register: PropTypes.func,
    t: PropTypes.func.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func
    }).isRequired,
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func,
      language: PropTypes.string
    })
  };

  static defaultProps = {
    register: () => {},
    count: 0,
    wallet: {
      address: '',
      mnemonic: ''
    },
    i18n: {
      changeLanguage: () => {},
      language: 'zh'
    }
  };

  state = {
    isLoading: false,
    showModal: false,
    errors: {
      nameError: false,
      nameMsg: '',
      passwordError: false,
      passwordMsg: '',
      confirmPasswordError: false,
      confirmPasswordMsg: ''
    },
    values: {
      name: '',
      password: '',
      confirmPassword: ''
    }
  };

  // eslint-disable-next-line react/sort-comp
  getModalContent = trans => trans.split('\n').map(v => <div key={v}>{v}</div>);

  // eslint-disable-next-line react/sort-comp
  modalContent = memoizeOne(this.getModalContent);

  onConfirm = () => {
    this.setState({
      showModal: false,
      isLoading: false
    });
    if (!store.get(STORE_KEY.ADDRESS)) {
      return;
    }
    const { history } = this.props;
    history.push('/play');
  };

  register = () => {
    const { errors, values, isLoading } = this.state;
    let info = null;
    if (errors.nameError) {
      info = errors.nameMsg;
    } else if (errors.passwordError) {
      info = errors.passwordMsg;
    } else if (errors.confirmPassword) {
      info = errors.confirmPasswordMsg;
    } else {
      info = 'someting went wrong';
    }

    if (
      errors.nameError
      || errors.passwordError
      || errors.confirmPasswordError
      || Object.values(values).filter(v => v.length === 0).length > 0
      || isLoading
    ) {
      Toast.info(info);
      return;
    }

    this.setState({
      isLoading: true,
      showModal: true,
    });

    const { t, register: saver } = this.props;
    const wallet = AElf.wallet.createNewWallet();
    store.session.set(STORE_KEY.WALLET_INFO, wallet);
    const { address } = wallet;

    try {
      request(API_PATH.REGISTER, {
        name: values.name,
        address: wallet.address
      }).then(res => {
        if (+res.code === 0) {
          const { count } = res.data;
          saver({
            wallet,
            name: values.name,
            count
          });
          const keyStore = AElf.wallet.keyStore.getKeystore(
            wallet,
            values.password,
            {
              cipher: 'aes-256-cbc'
            }
          );
          store(STORE_KEY.KEY_STORE, keyStore);
          store(STORE_KEY.ADDRESS, address);
        } else {
          throw new Error(res.msg);
        }
      });
    } catch (e) {
      Toast.info(e);
    }

    // contract initialization
    const { sha256 } = AElf.utils;
    const aelf = new AElf(new AElf.providers.HttpProvider(localHttp));
    aelf.chain
      .getChainStatus()
      .then(res => aelf.chain.contractAt(res.GenesisContractAddress, wallet))
      .then(zeroC => zeroC.GetContractAddressByName.call(sha256('AElf.ContractNames.BingoGameContract')))
      .then(bingoAddress => aelf.chain.contractAt(bingoAddress, wallet))
      .then(bingoGameContract => {
        bingoGameContract.Register();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isLoading: false
        });
        Modal.alert(t('inValidTitle'), t('inValidRegister'));
      });
  };

  nameInput = value => {
    const { t } = this.props;
    const { errors, values } = this.state;
    if (!REG_COLLECTION.NAME_VALID.test(value)) {
      this.setState({
        errors: {
          ...errors,
          nameError: true,
          nameMsg: t('nickNameNotValid')
        },
        values: {
          ...values,
          name: value
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          nameError: false
        },
        values: {
          ...values,
          name: value
        }
      });
    }
  };

  passwordInput = value => {
    const { t } = this.props;
    const { errors, values } = this.state;
    if (!REG_COLLECTION.PASSWORD_VALID.test(value)) {
      this.setState({
        errors: {
          ...errors,
          passwordError: true,
          passwordMsg: t('passwordNotValid')
        },
        values: {
          ...values,
          password: value
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          passwordError: false
        },
        values: {
          ...values,
          password: value
        }
      });
    }
  };

  confirmPasswordInput = value => {
    const { t } = this.props;
    const { errors, values } = this.state;
    if (
      value !== values.password
      || !REG_COLLECTION.PASSWORD_VALID.test(value)
    ) {
      this.setState({
        errors: {
          ...errors,
          confirmPasswordError: true,
          confirmPasswordMsg: t('confirmPasswordNotValid')
        },
        values: {
          ...values,
          confirmPassword: value
        }
      });
    } else {
      this.setState({
        errors: {
          ...errors,
          confirmPasswordError: false
        },
        values: {
          ...values,
          confirmPassword: value
        }
      });
    }
  };

  onErrorClick = type => {
    const { errors } = this.state;
    let info = null;
    let err = null;

    switch (type) {
      case 'nickName':
        err = errors.nameError;
        info = errors.nameMsg;
        break;
      case 'password':
        err = errors.passwordError;
        info = errors.passwordMsg;
        break;
      case 'confirmPassword':
        err = errors.confirmPasswordError;
        info = errors.confirmPasswordMsg;
        break;
      default:
        break;
    }
    if (err) {
      Toast.info(info);
    }
  };

  switchLanguage = () => {
    const { i18n } = this.props;
    let nextLanguage = 'en';
    if (i18n.language === 'en') {
      nextLanguage = 'zh';
    }
    i18n.changeLanguage(nextLanguage);
  };

  // scan = () => {
  //   const { history } = this.props;
  //   history.push('/QRscan');
  // };

  inputShow = data => {
    const { t } = this.props;
    const { errors, values } = this.state;
    return (
      <div className="inputLine" key={data.btnName}>
        <ShowRotateBtn name={t(data.btnName)} />
        <List className="registerInputList">
          <InputItem
            type={data.type}
            className="inputItem"
            error={errors[data.error]}
            onChange={this[data.onChange]}
            value={values[data.value]}
            onErrorClick={() => this.onErrorClick(data.errorClick)}
          />
        </List>
      </div>
    );
  }

  render() {
    const { t, count, wallet } = this.props;
    const { showModal } = this.state;
    return (
      <div className="bingo-register">
        {/* qrcode scan function,Not need it for now
        <div className="scanRegister">
          {t('scanRegister1')}
          <button type="button" onClick={this.scan}>
            {t('scanRegister2')}
          </button>
          {t('scanRegister3')}
        </div> */}
        <div className="register-input">
          {inputBox.map(this.inputShow)}
        </div>
        <RotateButton name={t('register')} click={this.register} />
        <Modal
          visible={showModal}
          onClose={this.onConfirm}
          transparent
          maskClosable
          className="bingo-register-modal"
        >
          <ModalContent confirm={this.onConfirm} title>
            <>
              <div>{t('registerSuccessInfoFir')}</div>
              <div className="modal-info-1">{t('registerSuccessInfoSec')}</div>
              <div className="modal-info-2">{count}</div>
              <div>{t('registerSuccessInfoThird')}</div>
              <div className="modal-info-4">
                ——
                {t('address')}
                ——
              </div>
              <div className="addressShow">{wallet.address}</div>
            </>
          </ModalContent>
        </Modal>

        <div
          role="button"
          tabIndex={0}
          className="language-change"
          onClick={this.switchLanguage}
          onKeyDown={() => {}}
        >
          中文/ENGLISH
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.base
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    register
  },
  dispatch
);

const wrapper = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withRouter,
  withTranslation()
);

export default wrapper(Register);
