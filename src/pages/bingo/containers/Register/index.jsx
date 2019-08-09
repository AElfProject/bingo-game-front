/**
 * @file register
 * @author atom-yang
 */
import React from 'react';
import store from 'store2';
import AElf from 'aelf-sdk';
import {
  NavBar,
  Button,
  InputItem,
  List,
  Modal,
  Icon
} from 'antd-mobile';
import { bindActionCreators, compose } from 'redux';
import memoizeOne from 'memoize-one';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { register } from '../../actions/base';
import { request } from '../../../../common/request';
import { API_PATH, STORE_KEY, REG_COLLECTION } from '../../../../common/constants';

import './index.less';

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
    }).isRequired
  };

  static defaultProps = {
    register: () => {},
    count: 0,
    wallet: {
      address: '',
      mnemonic: ''
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
    // todo: 跳转
    const { history } = this.props;
    this.setState({
      showModal: false,
      isLoading: false
    });
    history.push('/play');
  };

  // eslint-disable-next-line react/destructuring-assignment
  footer = [{ text: this.props.t('confirm'), onPress: this.onConfirm }];

  register = () => {
    const { t, register: saver } = this.props;
    const { values } = this.state;
    this.setState({
      isLoading: true
    });
    const wallet = AElf.wallet.createNewWallet();
    const { address } = wallet;
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
        this.setState({
          showModal: true
        });
        const keyStore = AElf.wallet.keyStore.getKeystore(wallet, values.password, {
          cipher: 'aes-256-cbc'
        });
        store(STORE_KEY.KEY_STORE, keyStore);
        store(STORE_KEY.ADDRESS, address);
      } else {
        throw new Error(res.msg);
      }
    }).catch(e => {
      console.log(e);
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
    if (value !== values.password || !REG_COLLECTION.PASSWORD_VALID.test(value)) {
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

  render() {
    const { t, wallet, count } = this.props;
    const {
      values,
      errors,
      showModal,
      isLoading
    } = this.state;
    return (
      <div className="bingo-register">
        <NavBar>{t('register')}</NavBar>
        <div className="bingo-register-title">Bingo Game</div>
        <div className="bingo-register-input">
          <List className="bingo-register-input-area">
            <InputItem
              placeholder={t('nickName')}
              error={errors.nameError}
              onChange={this.nameInput}
              value={values.name}
              clear
            />
            <div className="bingo-register-error-msg">
              {errors.nameError && errors.nameMsg}
            </div>
            <InputItem
              type="password"
              error={errors.passwordError}
              onChange={this.passwordInput}
              value={values.password}
              placeholder={t('password')}
              clear
            />
            <div className="bingo-register-error-msg">
              {errors.passwordError && errors.passwordMsg}
            </div>
            <InputItem
              type="password"
              error={errors.confirmPasswordError}
              onChange={this.confirmPasswordInput}
              value={values.confirmPassword}
              placeholder={t('confirmPassword')}
              clear
            />
            <div className="bingo-register-error-msg">
              {errors.confirmPasswordError && errors.confirmPasswordMsg}
            </div>
          </List>
          <Button
            loading={isLoading}
            disabled={
              errors.nameError
              || errors.passwordError
              || errors.confirmPasswordError
              || Object.values(values).filter(v => v.length === 0).length > 0
              || isLoading
            }
            onClick={this.register}
          >
            {t('register')}
          </Button>
          <Modal
            visible={showModal}
            onClose={this.onConfirm}
            transparent
            maskClosable
            footer={this.footer}
          >
            <Icon type="check-circle-o" size="lg" />
            <div>{t('registerSuccessTitle')}</div>
            <div className="bingo-register-modal-body">
              {this.modalContent(t('registerSuccessInfo', {
                count,
                address: wallet.address || ''
              }))}
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.base
});

const mapDispatchToProps = dispatch => bindActionCreators({
  register
}, dispatch);

const wrapper = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter,
  withTranslation()
);

export default wrapper(Register);
