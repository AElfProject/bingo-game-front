import React from 'react';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import store from 'store2';
import InterfaceForQRAndMne from '../../components/InterfaceForQRAndMne';
import { STORE_KEY } from '../../../../common/constants';
import './index.less';

class Mnemonic extends React.Component {
  static defaultProps = {
    t: () => {},
    history: {},
    wallet: {
      mnemonic: ''
    }
  }

  static propTypes = {
    t: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
    wallet: PropTypes.shape({
      mnemonic: PropTypes.string
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
    };
    this.mnemonic = store.session.get(STORE_KEY.WALLET_INFO).mnemonic;
  }

  onDone = () => {
    const { history } = this.props;
    history.push('/play');
  }

  render() {
    const { t } = this.props;
    return (
      <InterfaceForQRAndMne
        key="mnemonic"
        title={t('backupMnemonic')}
        subtitle={t('mnemonicPrompt')}
        onDone={this.onDone}
      >
        <>
          {this.mnemonic.split(' ').map(data => (
            <div key={data} className="word">{data}</div>
          ))}
        </>
      </InterfaceForQRAndMne>
    );
  }
}


const wrapper = compose(
  withTranslation(),
  withRouter
);

export default wrapper(Mnemonic);
