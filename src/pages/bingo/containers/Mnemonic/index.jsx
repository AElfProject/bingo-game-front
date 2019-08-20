import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import store from 'store2';
// import AElf from 'aelf-sdk';
import { STORE_KEY } from '../../../../common/constants';
import RotateButton from '../../components/RotateButton';
import './index.less';

class Mnemonic extends React.Component {
  static defaultProps = {
    t: () => {},
    history: {}
  }

  static propTypes = {
    t: PropTypes.func,
    history: PropTypes.shape({
      push: PropTypes.func,
    }),
  }

  constructor(props) {
    super(props);
    this.state = {
      mnemonic: ''
    };
  }

  componentDidMount() {
    const { mnemonic } = store.session.get(STORE_KEY.WALLET_INFO);
    this.setState({ mnemonic });
  }

  onDone = () => {
    const { history } = this.props;
    history.push('/play');
  }

  render() {
    const { t } = this.props;
    const { mnemonic } = this.state;
    return (
      <>
        <div
          className="mnemonic"
        >
          <div className="titleBar">
            <span className="backupMnemonic">{`-${t('backupMnemonic')}-`}</span>
            <span className="mnemonicPrompt">{t('mnemonicPrompt')}</span>
          </div>

          <div className="wordShow">
            <div className="record-tl" />
            <div className="record-tr" />
            <div className="record-bl" />
            <div className="record-br" />

            {mnemonic.split(' ').map(data => (
              <div key={data} className="word">{data}</div>
            ))}

          </div>

          <RotateButton name={t('done')} click={this.onDone} />
        </div>
      </>
    );
  }
}

export default withRouter(withTranslation()(Mnemonic));
