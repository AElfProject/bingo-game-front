import React from 'react';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import store from 'store2';
import QRCode from 'qrcode.react';
import { STORE_KEY } from '../../../../common/constants';
import InterfaceForQRAndMne from '../../components/InterfaceForQRAndMne';

class QRcodeExport extends React.Component {
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
      keyStore: {}
    };
  }

  componentDidMount() {
    const keyStore = store.get(STORE_KEY.KEY_STORE);
    this.setState({ keyStore });
  }

  onDone = () => {
    const { history } = this.props;
    history.push('/play');
  }

  render() {
    const { t } = this.props;
    const { keyStore } = this.state;
    return (
      <>
        <InterfaceForQRAndMne
          key="qrcode"
          title={t('backupQRcode')}
          subtitle={t('qrcodePrompt')}
          onDone={this.onDone}
          center
        >

          <QRCode value={JSON.stringify(keyStore)} size={250} />

        </InterfaceForQRAndMne>
      </>
    );
  }
}

export default withRouter(withTranslation()(QRcodeExport));
