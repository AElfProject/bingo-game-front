import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import RotateButton from '../../components/RotateButton';
import './index.less';

const mnemonic = 'orange learn result add snack curtain double state expose bless also clarify';

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
    };
  }

  onDone = () => {
    const { history } = this.props;
    history.push('/play');
  }

  render() {
    const { t } = this.props;
    return (
      <>
        {/* <Navigation title="备份助记词" type="mnemonic" /> */}
        {/* <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          助记词用于恢复身份或重置密码，请仔细抄写下助记词并妥善保管！
        </NoticeBar> */}
        <div
          className="mnemonic"
        >
          <div className="titleBar">
            <span className="backupMnemonic">{`-${t('backupMnemonic')}-`}</span>
            <span className="mnemonicPrompt">{t('mnemonicPrompt')}</span>
            {/* <span>{t('backupMnemonic')}</span>
            <span>{t('mnemonicPrompt')}</span> */}
          </div>

          <div className="wordShow">
            <div className="record-tl" />
            <div className="record-tr" />
            <div className="record-bl" />
            <div className="record-br" />

            {mnemonic.split(' ').map(data => (
              <div key={data} className="word">{data}</div>
            ))}

            {/* <div className="auxiliaries">
              {mnemonic.split(' ').map(data => (
                <div key={data} className="word">{data}</div>
              ))}
            </div> */}

          </div>

          <RotateButton name={t('done')} click={this.onDone} />
        </div>
      </>
    );
  }
}

export default withRouter(withTranslation()(Mnemonic));
