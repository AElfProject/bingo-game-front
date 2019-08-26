import React from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const { Item } = Popover;

class Navigation extends React.Component {
  static defaultProps = {
    i18n: {
      changeLanguage: () => {},
      language: 'zh'
    },
    title: '',
    type: 'play',
    history: {},
    t: () => {}
  }

  static propTypes = {
    i18n: PropTypes.shape({
      changeLanguage: PropTypes.func,
      language: PropTypes.string
    }),
    title: PropTypes.string,
    type: PropTypes.string,
    history: PropTypes.shape({
      goBack: PropTypes.func,
      push: PropTypes.func,
    }),
    t: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.goBack = this.goBack.bind(this);
  }

  handleVisibleChange = visible => {
    this.setState({
      visible,
    });
  };

  onSelect = opt => {
    const { history } = this.props;
    switch (opt.props.value) {
      case 'language':
        this.switchLanguage();
        break;
      case 'auxiliaries':
        this.pageJump();
        break;
      case 'QRcode':
        history.push('QRcode');
        break;
      default:
        break;
    }
    this.setState({
      visible: false
    });
  };

  pageJump() {
    const { type, history } = this.props;
    let path = null;
    if (type === 'play') {
      path = '/mnemonic';
    } else if (type === 'mnemonic') {
      path = '/play';
    }
    history.push(path);
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  switchLanguage() {
    const { i18n } = this.props;
    const { language: rightLanguage } = i18n;
    let nextLanguage = 'en';
    if (rightLanguage === 'en') {
      nextLanguage = 'zh';
    }
    i18n.changeLanguage(nextLanguage);
  }

  render() {
    const { visible } = this.state;
    const { title, type, t } = this.props;
    let item = null;
    if (type === 'play') {
      item = t('backupMnemonic');
    } else if (type === 'mnemonic') {
      item = t('game');
    }
    return (
      <NavBar
        style={{ width: '100%', backgroundColor: 'transparent', color: 'white' }}
        mode="light"
        // icon={<Icon type="left" />}
        // onLeftClick={this.goBack}
        rightContent={(
          <Popover
            visible={visible}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [0, 0],
            }}
            onSelect={this.onSelect}
            mask="true"
            overlay={[
              (<Item key="0" value="auxiliaries">{item}</Item>),
              (<Item key="1" value="QRcode"><span style={{ marginRight: 5 }}>{t('exportQRcode')}</span></Item>),
              (<Item key="2" value="language"><span style={{ marginRight: 5 }}>中/EN</span></Item>)
            ]}
          >
            <Icon key="1" type="ellipsis" />
          </Popover>
        )}
      >
        {title}
      </NavBar>
    );
  }
}

export default withRouter(withTranslation()(Navigation));
