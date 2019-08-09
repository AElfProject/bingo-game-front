import React from 'react';
import { Flex, WhiteSpace, NoticeBar } from 'antd-mobile';
import Navigation from '../../components/Navigation';
import './index.less';

const mnemonic = 'orange learn result add snack curtain double state expose bless also clarify';

class Mnemonic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <>
        <Navigation title="备份助记词" type="mnemonic" />
        <WhiteSpace size="lg" />
        <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
          助记词用于恢复身份或重置密码，请仔细抄写下助记词并妥善保管！
        </NoticeBar>
        <WhiteSpace size="lg" />
        <Flex
          justify="center"
        >
          <div className="auxiliaries">
            {mnemonic.split(' ').map(data => (
              <div key={data}>{data}</div>
            ))}
          </div>
        </Flex>
      </>
    );
  }
}

export default Mnemonic;
