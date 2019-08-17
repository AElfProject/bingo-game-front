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
    history: {}
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
  }

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      // true is zh, false is en
    };
  }

  handleVisibleChange = visible => {
    console.log('visible', visible);
    this.setState({
      visible,
    });
  };

  switchLanguage = async () => {
    // const { language } = this.state;
    // const { i18n } = this.props;
    // await i18n.changeLanguage(language ? 'en' : 'zh');
    // this.setState({
    //   language: !language
    // });
    const { i18n } = this.props;
    const { language: rightLanguage } = i18n;
    let nextLanguage = 'en';
    if (rightLanguage === 'en') {
      nextLanguage = 'zh';
    }
    i18n.changeLanguage(nextLanguage);
  }

  pageJump = () => {
    const { type, history } = this.props;
    let path = null;
    if (type === 'play') {
      path = '/mnemonic';
    } else if (type === 'mnemonic') {
      path = '/play';
    }
    history.push(path);
  }

  onSelect = opt => {
    switch (opt.props.value) {
      case 'language':
        this.switchLanguage();
        break;
      case 'auxiliaries':
        this.pageJump();
        break;
      default:
        break;
    }
    this.setState({
      visible: false
    });
  };

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { visible } = this.state;
    const { title, type } = this.props;
    let item = null;
    if (type === 'play') {
      item = '备份助记词';
    } else if (type === 'mnemonic') {
      item = '游戏';
    }
    return (
      <NavBar
        style={{ width: '100%', backgroundColor: 'transparent', color: 'white' }}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={this.goBack}
        rightContent={(
          <Popover
            visible={visible}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [0, 0],
            }}
            // onVisibleChange={this.handleVisibleChange}
            onSelect={this.onSelect}
            mask="true"
            overlay={[
              (<Item key="0" value="auxiliaries">{item}</Item>),
              (<Item key="1" value="language"><span style={{ marginRight: 5 }}>中/EN</span></Item>)
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
